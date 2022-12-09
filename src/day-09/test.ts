import { countTailPositions, countTailPositionsOnLargeRope } from './solution'
import { expectedOutputPart1, expectedOutputPart2, fixturePart1, fixturePart2 } from './fixture'
import { readFile } from '../utils'

describe('Day 9', () => {
  it('should count how many positions the tail of the rope has visited', async () => {
    expect(countTailPositions(fixturePart1)).toBe(expectedOutputPart1)
    expect(countTailPositions(await readFile('src/day-09/input.txt'))).toBe(5878)
  })
  it('should count how many positions the tail of the LARGE rope has visited', async () => {
    expect(countTailPositionsOnLargeRope(fixturePart2)).toBe(expectedOutputPart2)
  })
})
