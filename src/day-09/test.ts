import { countTailPositions } from './solution'
import { expectedOutput, fixture } from './fixture'
import { readFile } from '../utils'

describe('Day 9', () => {
  it('should count how many positions the tail of the rope has visited', async () => {
    expect(countTailPositions(fixture)).toBe(expectedOutput)
    expect(countTailPositions(await readFile('src/day-09/input.txt'))).toBe(5878)
  })
})
