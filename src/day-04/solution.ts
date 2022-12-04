import { EOL } from 'os'
import { AssignmentsValidator } from './AssignmentsValidator'
export function countInefficientAssignments (input: string) {
  const elfTeams = input.split(EOL).filter(Boolean)
  return AssignmentsValidator.filterInefficientTeams(elfTeams).length
}
