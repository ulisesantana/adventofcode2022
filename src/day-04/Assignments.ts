class Assignment {
  constructor (readonly from: number, readonly to: number) {}

  isOverlapped (assignment: Assignment) {
    const from = Math.min(this.from, assignment.from)
    if (from === this.from) {
      return this.to >= assignment.from
    }
    return assignment.to >= this.from
  }
}

export class Assignments {
  static buildFromRaw (assignments: string[]): Assignments {
    return new Assignments(assignments.map(team => team.split(',').map(Assignments.parseAssignment)))
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

  private static parseAssignment (rawAssignment: string): Assignment {
    const sectionRange = rawAssignment.split('-')
    const [from, to] = [Number(sectionRange[0]), Number(sectionRange[1])]
    return new Assignment(from, to)
  }
}
