import { readFile, sum } from '../utils'

type ElfTotalCalories = number
type ElfCalories = number[]

function calcElfTotalCalories (elf: ElfCalories): ElfTotalCalories {
  return sum(...elf)
}

export function getMaxCalories (elves: Array<ElfCalories>): ElfTotalCalories {
  return Math.max(...elves.map(calcElfTotalCalories))
}

export function sumTop3Calories (elves: number[][]): number {
  const top3Calories = elves
    .map(calcElfTotalCalories)
    .sort((a, b) => b - a)
    .slice(0, 3)
  return sum(...top3Calories)
}

export function parseInput (input: string): number[][] {
  return input
    .split(/\n\n/)
    .map((block) => block
      .split(/\n/)
      .filter(Boolean)
      .map(i => Number(i))
    )
}

if (require.main === module) {
  readFile('src/day-01/input.txt').then((input) => {
    const elves = parseInput(input)
    const maxCalories = getMaxCalories(elves)
    console.log(`The max amount of calories is ${maxCalories}`)
    console.log(`The sum top 3 max amount of calories is ${sumTop3Calories(elves)}`)
  })
}
