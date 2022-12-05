import { getCratesOnStackTop, Stack } from './solution'
import { expectedOutput, fixture } from './fixture'
import { Parser } from './Parser'

describe('Day 5', () => {
  it('should rearrange crates on stacks and return the crates on top of stacks', () => {
    expect(getCratesOnStackTop(fixture)).toBe(expectedOutput)
  })
  describe('Parser should', () => {
    it('parse input to stacks', () => {
      const raw = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
`
      expect(Parser.toStacks(raw)).toStrictEqual([
        new Stack(['N', 'Z']),
        new Stack(['D', 'C', 'M']),
        new Stack(['P'])
      ])
    })

    it('parse input to instructions', () => {
      const raw = `
move 1 from 2 to 1
move 13 from 1 to 3
`
      expect(Parser.toInstructions(raw)).toStrictEqual([
        {
          amount: 1,
          from: 2,
          to: 1
        },
        {
          amount: 13,
          from: 1,
          to: 3
        }
      ])
    })
  })
})
