import { readFile } from '../utils'
import { sumDirectoriesWithMaxSize100000 } from './solution'

readFile('src/day-07/input.txt').then((input) => {
  console.log(`Result: ${sumDirectoriesWithMaxSize100000(input)}`)
})
