import { expectedOutput, fixture } from './fixture'
import { countOverlappedAssignments } from './solution'

describe('Day 4', () => {
  it('should count overlapped section assignments between elf pairs', () => {
    expect(countOverlappedAssignments(fixture)).toBe(expectedOutput)
  })
})
