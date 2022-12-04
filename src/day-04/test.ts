import { expectedOutput, fixture } from './fixture'
import { countInefficientAssignments } from './solution'

describe('Day 4', () => {
  it('should count section assignments fully contained by the elf partner', () => {
    expect(countInefficientAssignments(fixture)).toBe(expectedOutput)
  })
})
