import { readFile } from '../utils'
import { countVisibleTrees } from './solution'

readFile('src/day-08/input.txt').then((input) => {
  console.log(`Result: ${countVisibleTrees(input)}`)
})
