import { readFile } from '../utils'
import { countTailPositions } from './solution'

readFile('src/day-09/input.txt').then((input) => {
  console.log(`Result: ${countTailPositions(input)}`)
})
