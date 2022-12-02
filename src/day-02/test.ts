import { getTotalScore } from './main'
import { expectedOutput, fixture } from './fixture'

describe('Day 2', () => {
  it('should get total score based on playbook', () => {
    expect(getTotalScore(fixture)).toBe(expectedOutput)
  })
})
