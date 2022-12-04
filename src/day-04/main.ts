import { readFile } from '../utils'
import { countInefficientAssignments } from './solution'

if (require.main === module) {
  readFile('src/day-04/input.txt').then((input) => {
    console.log(`Result: ${countInefficientAssignments(input)}`)
  })
}
