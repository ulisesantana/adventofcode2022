import { Instruction, Stack } from './solution'

export class Parser {
  static toStacks (rawStacks: string): Stack[] {
    return Parser
      .split(rawStacks, /\n/)
      .reduce<Array<string[]>>((stacks, line) => {
        for (const [index, [_, crane]] of Parser.split(line, /(\D{3}\s)/g).entries()) {
          if (isNaN(+crane)) {
            const stack = stacks[+index]
            stacks[+index] = stack ? stack.concat(crane) : [crane]
          }
        }
        return stacks
      }, [])
      .map(crates => new Stack(crates))
  }

  private static split (text: string, search: RegExp) {
    return text.split(search).filter(Boolean)
  }

  static toInstructions (rawInstuctions: string): Instruction[] {
    return Parser.split(rawInstuctions, /\n/)
      .map((line) => ({
        amount: Number(line.match(/move \d*/)![0].substring(5)),
        from: Number(line.match(/from \d*/)![0].substring(5)),
        to: Number(line.match(/to \d*/)![0].substring(3))
      }))
  }
}
