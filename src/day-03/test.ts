import { calcPriority } from './main'
import { expectedOutput, fixture } from './fixture'

describe('Day 3', () => {
  it('should calc priority based on rucksacks', () => {
    expect(calcPriority(fixture)).toBe(expectedOutput)
  })
})
