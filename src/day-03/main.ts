import { readFile } from '../utils'
import { calcPriority } from './solution'

readFile('src/day-03/input.txt').then((input) => {
  console.log(`Result: ${calcPriority(input)}`)
})
