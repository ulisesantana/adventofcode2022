import { getMaxCalories, sumTop3Calories, parseInput } from './main'
import { fixture, elvesEnergyFixture } from './fixture'

describe('Day 1', () => {
  it('should parse input to an array of number[]', () => {
    expect(parseInput(fixture)).toStrictEqual(elvesEnergyFixture)
  })
  it('should get max energy', () => {
    expect(getMaxCalories(elvesEnergyFixture)).toBe(24000)
  })
  it('should get top 3 energy', () => {
    expect(sumTop3Calories(elvesEnergyFixture)).toBe(45000)
    expect(sumTop3Calories([
      [10, 100, 1000],
      [2000, 1000],
      [9000],
      [8000]
    ])).toBe(20000)
  })
})
