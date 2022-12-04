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
      .some(otherAssignment => {
        const from = Math.min(assignment.from, otherAssignment.from)
        if (from === assignment.from) {
          return assignment.to >= otherAssignment.from
        }
        return otherAssignment.to >= assignment.from
      }))
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
