import { readFile } from '../utils'
import { getCratesOnStackTop } from './solution'
readFile('src/day-05/input.txt').then((input) => {
  console.log(`Result: ${getCratesOnStackTop(input)}`)
})
