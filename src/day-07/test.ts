import { sumDirectoriesWithMaxSize100000 } from './solution'
import { expectedOutput, fixture } from './fixture'
import { readFile } from '../utils'

describe('Day 7', () => {
  it('should sum all of the directories with a total size of at most 100.000', async () => {
    expect(sumDirectoriesWithMaxSize100000(fixture)).toBe(expectedOutput)
    expect(sumDirectoriesWithMaxSize100000(await readFile('src/day-07/input.txt'))).toBe(1886043)
  })
})
