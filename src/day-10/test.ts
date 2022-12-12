import { print, sumSignalStrengths } from './solution'
import { expectedOutputPart1, expectedOutputPart2, fixture } from './fixture'
import { readFile } from '../utils'

describe('Day 10', () => {
  it('should sum the signal strengths based on cycles', async () => {
    expect(sumSignalStrengths(fixture)).toBe(expectedOutputPart1)
    expect(sumSignalStrengths(await readFile('src/day-10/input.txt'))).toBe(12880)
  })
  it('should render something', () => {
    expect(print(fixture)).toBe(expectedOutputPart2)
  })
})
