import { Assignment } from './Assignment'

export class Assignments {
  static buildFromRaw (assignments: string[]): Assignments {
    return new Assignments(assignments.map(team => team.split(',').map(Assignments.parseAssignment)))
  }

  private static parseAssignment (rawAssignment: string): Assignment {
    const sectionRange = rawAssignment.split('-')
    const [from, to] = [Number(sectionRange[0]), Number(sectionRange[1])]
    return new Assignment(from, to)
  }

  private constructor (private readonly values: Array<Assignment[]>) {}

  getOverlappedAssignments (): Array<Assignment[]> {
    return this.values.filter((assignments: Assignment[]) =>
      assignments.some((assignment, indexA) =>
        assignments
          .filter((_, indexB) => indexB !== indexA)
          .some(assignment.isOverlapped.bind(assignment))
      ))
  }
}
