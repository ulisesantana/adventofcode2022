import { readFile } from '../utils'
import { getMaxCalories, parseInput, sumTop3Calories } from './solution'

readFile('src/day-01/input.txt').then((input) => {
  const elves = parseInput(input)
  const maxCalories = getMaxCalories(elves)
  console.log(`The max amount of calories is ${maxCalories}`)
  console.log(`The sum top 3 max amount of calories is ${sumTop3Calories(elves)}`)
})
