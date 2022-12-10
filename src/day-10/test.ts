import { sumSignalStrengths } from './solution'
import { expectedOutput, fixture } from './fixture'
import { readFile } from '../utils'

describe('Day 10', () => {
  it('should sum the signal strengths based on cycles', async () => {
    expect(sumSignalStrengths(fixture)).toBe(expectedOutput)
    expect(sumSignalStrengths(await readFile('src/day-10/input.txt'))).toBe(12880)
  })
})
