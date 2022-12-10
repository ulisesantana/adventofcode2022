import { readFile } from '../utils'
import { sumSignalStrengths } from './solution'

readFile('src/day-10/input.txt').then((input) => {
  console.log(`Result: ${sumSignalStrengths(input)}`)
})
