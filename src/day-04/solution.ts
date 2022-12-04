import { EOL } from 'os'
import { Assignments } from './Assignments'

export function countOverlappedAssignments (input: string) {
  const elfTeams = input.split(EOL).filter(Boolean)
  return Assignments.buildFromRaw(elfTeams).getOverlappedAssignments().length
}
