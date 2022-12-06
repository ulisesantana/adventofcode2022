import { findMessageMarkerPosition, findPacketMarkerPosition } from './solution'
import { expectedMessageMarkerPosition, expectedPacketMarkerPosition, fixture } from './fixture'

describe('Day 6', () => {
  it('should find marker position for packets', () => {
    expect(findPacketMarkerPosition(fixture)).toBe(expectedPacketMarkerPosition)
  })
  it('should find marker position for messages', () => {
    expect(findMessageMarkerPosition(fixture)).toBe(expectedMessageMarkerPosition)
  })
})
