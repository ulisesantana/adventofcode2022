import { getMaxCalories, sumTop3Calories, parseInput } from './main'
import { fixture, elvesCaloriesFixture } from './fixture'

describe('Day 1', () => {
  it('should parse input to a elf calories list', () => {
    expect(parseInput(fixture)).toStrictEqual(elvesCaloriesFixture)
  })
  it('should get max energy', () => {
    expect(getMaxCalories(elvesCaloriesFixture)).toBe(24000)
  })
  it('should sum top 3 elf calories', () => {
    expect(sumTop3Calories(elvesCaloriesFixture)).toBe(45000)
    expect(sumTop3Calories([
      [10, 100, 1000],
      [2000, 1000],
      [9000],
      [8000]
    ])).toBe(20000)
  })
})
