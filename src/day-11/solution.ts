// Creación de Monos
// Ejecutar una ronda
// Ejecutar 20 rondas y multiplicar los 2 más altos

import { split } from '../utils'
import { EOL } from 'os'

type Item = number
type MonkeyId = number

interface MonkeyParams {
  monkeyId: number
  items: Item[]
  operation: Function
  testValue: number
  testTrue: MonkeyId
  testFalse: MonkeyId
}
export class Monkey {
  readonly id: MonkeyId
  readonly items: Item[]
  readonly operation: Function
  readonly testValue: number
  readonly testTrue: MonkeyId
  readonly testFalse: MonkeyId
  #amountOfInspectedItems = 0
  constructor (params: MonkeyParams) {
    this.id = params.monkeyId
    this.items = params.items
    this.operation = params.operation
    this.testValue = params.testValue
    this.testTrue = params.testTrue
    this.testFalse = params.testFalse
  }

  get amountOfInspectedItems () {
    return this.#amountOfInspectedItems
  }

  hasItems () {
    return this.items.length > 0
  }

  * inspectItems (): Generator<[Item, MonkeyId]> {
    for (const item of this.items) {
      this.#amountOfInspectedItems += 1
      const worryLevel = Math.floor(this.operation(item) / 3)
      yield worryLevel % this.testValue
        ? [worryLevel, this.testFalse]
        : [worryLevel, this.testTrue]
    }
    this.items.length = 0
  }

  static from (monkeyId: number, input: string): Monkey {
    return new Monkey({
      monkeyId,
      items: Monkey.createItemsFromInput(input),
      operation: Monkey.createOperationFromInput(input),
      testFalse: Monkey.getMonkeyNumericAttribute('If false', input),
      testTrue: Monkey.getMonkeyNumericAttribute('If true', input),
      testValue: Monkey.getMonkeyNumericAttribute('Test', input)
    })
  }

  private static createItemsFromInput (input: string): Item[] {
    const rawItems = Monkey.getMonkeyAttribute('Starting items', input)
    return split(',', rawItems.replaceAll(/\s/g, '')).map(Number)
  }

  private static getMonkeyAttribute (attribute: string, input: string): string {
    return split(EOL, input).reduce((result, line) => line.includes(attribute)
      ? split(':', line).at(1)!
      : result,
    '')
  }

  private static getMonkeyNumericAttribute (attribute: string, input: string): number {
    const attr = Monkey.getMonkeyAttribute(attribute, input)
    const value = attr.match(/\d+/)!
    return Number(value.at(0)!)
  }

  private static createOperationFromInput (input: string): Function {
    const rawOperation = Monkey.getMonkeyAttribute('Operation', input)
    // eslint-disable-next-line no-new-func
    return new Function('old', `return ${split('=', rawOperation).at(1)}`)
  }
}

export class MonkeyBusiness {
  readonly monkeys = [] as Monkey[]
  constructor (input: string) {
    const rawMonkeys = split(/Monkey \d:/g, input).filter(x => x !== EOL)
    for (const [index, rawMonkey] of rawMonkeys.entries()) {
      this.monkeys.push(Monkey.from(index, rawMonkey))
    }
  }

  run (amountOfRounds: number) {
    for (let i = 0; i < amountOfRounds; i++) {
      this.round()
    }
  }

  private round () {
    for (const monkey of this.monkeys) {
      if (monkey.hasItems()) {
        for (const [item, toMonkeyId] of monkey.inspectItems()) {
          this.monkeys.at(toMonkeyId)!.items.push(item)
        }
      }
    }
  }
}

export function getMonkeyBusiness (input: string) {
  const mb = new MonkeyBusiness(input)
  mb.run(20)
  const [m1, m2] = Array.from(mb.monkeys).sort((a, b) => b.amountOfInspectedItems - a.amountOfInspectedItems)
  return m1.amountOfInspectedItems * m2.amountOfInspectedItems
}
