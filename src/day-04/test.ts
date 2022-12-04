import { countInefficientAssignments } from './main'
import { expectedOutput, fixture } from './fixture'

describe('Day 4', () => {
  it('should count section assignments fully contained by the elf partner', () => {
    expect(countInefficientAssignments(fixture)).toBe(expectedOutput)
  })
})
