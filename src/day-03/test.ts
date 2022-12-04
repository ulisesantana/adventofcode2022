import { expectedOutput, fixture } from './fixture'
import { calcPriority } from './solution'

describe('Day 3', () => {
  it('should calc priority based on rucksacks', () => {
    expect(calcPriority(fixture)).toBe(expectedOutput)
  })
})
