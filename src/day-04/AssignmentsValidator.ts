type Assignment = {
  from: number,
  to: number
}

export class AssignmentsValidator {
  static filterInefficientTeams (elfTeams: string[]) {
    return elfTeams.filter(AssignmentsValidator.isInefficientTeam)
  }

  private static isInefficientTeam (team: string) {
    const teamAssignments = team.split(',').map(AssignmentsValidator.parseAssignment)
    return teamAssignments.some((assignment, indexA) => teamAssignments
      .filter((_, indexB) => indexB !== indexA)
      .some(
        otherAssignment => AssignmentsValidator.isInefficientPair(assignment, otherAssignment)
      ))
  }

  private static isInefficientPair (assignment: Assignment, otherAssignment: Assignment) {
    return assignment.from <= otherAssignment.from &&
      assignment.to >= otherAssignment.to
  }

  private static parseAssignment (rawAssignment: string): Assignment {
    const sectionRange = rawAssignment.split('-')
    const [from, to] = [Number(sectionRange[0]), Number(sectionRange[1])]
    return {
      from,
      to
    }
  }
}
