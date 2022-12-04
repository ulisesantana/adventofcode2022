import { readFile } from '../utils'
import { countOverlappedAssignments } from './solution'

if (require.main === module) {
  readFile('src/day-04/input.txt').then((input) => {
    console.log(`Result: ${countOverlappedAssignments(input)}`)
  })
}
