import { expectedOutput, fixture } from './fixture'
import { countInefficientAssignments } from './solution'

describe('Day 4', () => {
  it('should count overlapped section assignments between elf pairs', () => {
    expect(countInefficientAssignments(fixture)).toBe(expectedOutput)
  })
})
