import { readFile } from '../utils'
import { doStuff } from './solution'

readFile('src/day-11/input.txt').then((input) => {
  console.log(`Result: ${doStuff(input)}`)
})
