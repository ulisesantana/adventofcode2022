import { readFile } from '../utils'
import { getMonkeyBusiness } from './solution'

readFile('src/day-11/input.txt').then((input) => {
  console.log(`Result: ${getMonkeyBusiness(input)}`)
})
