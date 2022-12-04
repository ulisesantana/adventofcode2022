import { expectedOutput, fixture } from './fixture'
import { getTotalScore } from './solution'

describe('Day 2', () => {
  it('should get total score based on playbook', () => {
    expect(getTotalScore(fixture)).toBe(expectedOutput)
  })
})
