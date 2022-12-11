// Creación de Monos
// Ejecutar una ronda
// Ejecutar 20 rondas y multiplicar los 2 más altos

import { split } from '../utils'

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

  inspectItem (): [Item, MonkeyId] {
    const item = this.items.shift()
    this.#amountOfInspectedItems += 1
    const worryLevel = this.operation(item) / 3
    return worryLevel % this.testValue
      ? [worryLevel, this.testTrue]
      : [worryLevel, this.testTrue]
  }

  // Starting items: 54, 65, 75, 74
  // Operation: new = old + 6
  // Test: divisible by 19
  // If true: throw to monkey 2
  // If false: throw to monkey 0
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static from (monkeyId: number, input: string): Monkey {
    input
    // split(/:/, input.match(/Starting items:( \d+,?)+/)!.toString()).slice(1).map(x => Number(x.replace(/[,/s]/, '')))
    return new Monkey({
      items: [54, 65, 75, 74],
      monkeyId,
      operation (old) {
        return old + 6
      },
      testFalse: 0,
      testTrue: 2,
      testValue: 19
    })
  }
}

class MonkeyBusiness {
}

export function doStuff (input: string) {
  return Monkey.from(0, input)
}
