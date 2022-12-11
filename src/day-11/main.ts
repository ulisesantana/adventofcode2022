import { readFile } from '../utils'
import { getMonkeyBusiness, getMonkeyBusinessWithoutRelief } from './solution'

readFile('src/day-11/input.txt').then((input) => {
  console.log(`Result: ${getMonkeyBusiness(input)}`)
  console.log(`Result 2: ${getMonkeyBusinessWithoutRelief(input)}`)
})
