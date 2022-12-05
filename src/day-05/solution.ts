import { Parser } from './Parser'

type Crate = string
export type Instruction = {
  amount: number,
  from: number,
  to: number
}

export class Stack {
  // Is a LIFO but using the beginning of the array as the top of the stack.
  constructor (private crates: Crate[]) {}

  getTopCrate () {
    return this.crates.at(0)
  }

  move (amount: number): Crate[] {
    const crates = this.crates.slice(0, amount)
    this.crates = this.crates.slice(amount)
    return crates
  }

  add (...crates: Crate[]): void {
    this.crates = [...crates, ...this.crates]
  }
}

class GiantCargoCrane {
  constructor (private readonly stacks: Stack[]) {}

  move ({ amount, from, to }: Instruction) {
    const crates = this.stacks[from - 1].move(amount)
    this.stacks[to - 1].add(...crates)
  }

  getTopCranes () {
    return this.stacks
      .map(stack => stack.getTopCrate())
      .join('')
  }
}

export function getCratesOnStackTop (input: string): string {
  const [initialState, instructions] = input.split(/\n\n/)
  const cargo = new GiantCargoCrane(Parser.toStacks(initialState))
  for (const instruction of Parser.toInstructions(instructions)) {
    cargo.move(instruction)
  }
  return cargo.getTopCranes()
}
