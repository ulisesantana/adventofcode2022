export class Assignment {
  constructor (readonly from: number, readonly to: number) {
  }

  isOverlapped (assignment: Assignment) {
    const from = Math.min(this.from, assignment.from)
    if (from === this.from) {
      return this.to >= assignment.from
    }
    return assignment.to >= this.from
  }
}
