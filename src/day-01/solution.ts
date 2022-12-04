import { sum } from '../utils'

type ElfTotalCalories = number
type ElfCalories = number[]

function calcElfTotalCalories (elf: ElfCalories): ElfTotalCalories {
  return sum(...elf)
}

export function getMaxCalories (elves: Array<ElfCalories>): ElfTotalCalories {
  return Math.max(...elves.map(calcElfTotalCalories))
}

export function sumTop3Calories (elves: Array<ElfCalories>): number {
  const top3Calories = elves
    .map(calcElfTotalCalories)
    .sort((a, b) => b - a)
    .slice(0, 3)
  return sum(...top3Calories)
}

export function parseInput (input: string): Array<ElfCalories> {
  return input
    .split(/\n\n/)
    .map((block) => block
      .split(/\n/)
      .filter(Boolean)
      .map(i => Number(i))
    )
}
