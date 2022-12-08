import { getDirectorySizeForDelete, sumDirectoriesWithMaxSize100000 } from './solution'
import { expectedOutputPart1, expectedOutputPart2, fixture } from './fixture'
import { readFile } from '../utils'

describe('Day 7', () => {
  it('should sum all of the directories with a total size of at most 100.000', async () => {
    expect(sumDirectoriesWithMaxSize100000(fixture)).toBe(expectedOutputPart1)
    expect(sumDirectoriesWithMaxSize100000(await readFile('src/day-07/input.txt'))).toBe(1886043)
  })
  it('should find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?', async () => {
    expect(getDirectorySizeForDelete(fixture)).toBe(expectedOutputPart2)
    expect(getDirectorySizeForDelete(await readFile('src/day-07/input.txt'))).toBe(3842121)
  })
})
