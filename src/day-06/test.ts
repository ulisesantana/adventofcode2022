import { findMarkerPosition } from './solution'
import { expectedOutput, fixture } from './fixture'

describe('Day 6', () => {
  it('should find marker position', () => {
    expect(findMarkerPosition(fixture)).toBe(expectedOutput)
  })
})
