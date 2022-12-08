import { readFile } from '../utils'
import { getDirectorySizeForDelete, sumDirectoriesWithMaxSize100000 } from './solution'

readFile('src/day-07/input.txt').then((input) => {
  console.log(`Result: ${sumDirectoriesWithMaxSize100000(input)}`)
  console.log(`Result 2: ${getDirectorySizeForDelete(input)}`)
})
