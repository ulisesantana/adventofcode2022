import { readFile } from '../utils'
import { calcHighestScenicScore, countVisibleTrees } from './solution'

readFile('src/day-08/input.txt').then((input) => {
  console.log(`Result: ${countVisibleTrees(input)}`)
  console.log(`Result 2: ${calcHighestScenicScore(input)}`)
})
