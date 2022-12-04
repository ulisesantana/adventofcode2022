import { readFile } from '../utils'
import { EOL } from 'os'
import { AssignmentsValidator } from './AssignmentsValidator'

export function countInefficientAssignments (input: string) {
  const elfTeams = input.split(EOL).filter(Boolean)
  return AssignmentsValidator.filterInefficientTeams(elfTeams).length
}

if (require.main === module) {
  readFile('src/day-04/input.txt').then((input) => {
    console.log(`Result: ${countInefficientAssignments(input)}`)
  })
}
