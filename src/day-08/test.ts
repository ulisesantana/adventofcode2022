import { calcHighestScenicScore, countVisibleTrees } from './solution'
import { expectedOutputPart1, expectedOutputPart2, fixture } from './fixture'
import { readFile } from '../utils'

describe('Day 8', () => {
  it('should calc how many trees are visible from the outside', async () => {
    expect(countVisibleTrees(fixture)).toBe(expectedOutputPart1)
    expect(countVisibleTrees(await readFile('src/day-08/input.txt'))).toBe(1711)
  })
  it('should calc the highest scenic score', async () => {
    expect(calcHighestScenicScore(fixture)).toBe(expectedOutputPart2)
  })
})
