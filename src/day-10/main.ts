import { readFile } from '../utils'
import { print, sumSignalStrengths } from './solution'

readFile('src/day-10/input.txt').then((input) => {
  console.log(`Result: ${sumSignalStrengths(input)}`)
  console.log('Result 2:')
  console.log(print(input))
})
