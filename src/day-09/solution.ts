import { split } from '../utils'
import { EOL } from 'os'

type Steps = number
enum Direction {
  Up = 'U',
  Right = 'R',
  Down = 'D',
  Left = 'L',
  None = 'N/A'
}
type Instruction = [Direction, Steps]

class Position {
  constructor (public x: number, public y: number, public direction: Direction = Direction.None) {}

  clone () {
    return new Position(this.x, this.y, this.direction)
  }

  toString () {
    return `${this.x}:${this.y}`
  }

  equals ({ x, y }: Position) {
    return this.x === x && this.y === y
  }

  moveUp () {
    this.x += 1
    this.direction = Direction.Up
  }

  moveRight () {
    this.y += 1
    this.direction = Direction.Right
  }

  moveDown () {
    this.x -= 1
    this.direction = Direction.Down
  }

  moveLeft () {
    this.y -= 1
    this.direction = Direction.Left
  }

  moveTo (x: number, y: number, direction: Direction) {
    this.x = x
    this.y = y
    this.direction = direction
  }
}

class RopeSimulator {
  private readonly knots: Position[]
  private readonly tailVisitedPositions = new Set<string>([new Position(0, 0).toString()])

  constructor (amountOfKnots: number) {
    this.knots = Array.from({ length: amountOfKnots }).map(() => new Position(0, 0))
  }

  processInstruction ([direction, steps]: Instruction): void {
    if (steps === 0) return
    let [previousHead] = this.knots
    for (const [index, knot] of this.knots.entries()) {
      const currentKnot = knot.clone()
      if (index === 0) {
        this.moveHead(direction, knot)
        previousHead = knot.clone()
      } else {
        this.moveTail(previousHead, index)
        previousHead = currentKnot.clone()
      }
    }
    this.processInstruction([direction, steps - 1])
  }

  getTailVisitedPositions () {
    return this.tailVisitedPositions
  }

  private moveHead (direction: Direction, knot: Position) {
    switch (direction) {
      case Direction.Up: return knot.moveUp()
      case Direction.Right: return knot.moveRight()
      case Direction.Down: return knot.moveDown()
      case Direction.Left: return knot.moveLeft()
    }
  }

  private moveTail (previousHead: Position, knotIndex: number) {
    const head = this.knots.at(knotIndex - 1)!
    const tail = this.knots.at(knotIndex)!
    const tailBeforeChanges = tail.clone()
    const { x, y } = head
    const xDelta = this.calcStepsAway(x, tail.x)
    const yDelta = this.calcStepsAway(y, tail.y)
    if (xDelta > 1 || yDelta > 1) {
      switch (previousHead.direction) {
        case Direction.Up: {
          tail.moveTo(x - 1, y, previousHead.direction)
          break
        }
        case Direction.Right: {
          tail.moveTo(x, y - 1, previousHead.direction)
          break
        }
        case Direction.Down: {
          tail.moveTo(x + 1, y, previousHead.direction)
          break
        }
        case Direction.Left: {
          tail.moveTo(x, y + 1, previousHead.direction)
          break
        }
      }
    }
    if (knotIndex === (this.knots.length - 1)) {
      this.updateVisitedPositions(tailBeforeChanges, tail)
    }
  }

  private updateVisitedPositions (originalTail: Position, tail: Position) {
    if (!originalTail.equals(tail)) {
      this.tailVisitedPositions.add(tail.toString())
    }
  }

  private calcStepsAway (a: number, b: number) {
    return a > b ? a - b : b - a
  }
}

function * generateInstructions (input: string): Generator<Instruction> {
  for (const line of split(EOL, input)) {
    const [direction, steps] = split(/\s/g, line)
    yield [direction as Direction, Number(steps)]
  }
}

export function countTailPositions (input: string) {
  const rs = new RopeSimulator(2)
  for (const instruction of generateInstructions(input)) {
    rs.processInstruction(instruction)
  }
  return rs.getTailVisitedPositions().size
}

// result is too low: 2030
export function countTailPositionsOnLargeRope (input: string) {
  const rs = new RopeSimulator(10)
  for (const instruction of generateInstructions(input)) {
    rs.processInstruction(instruction)
  }
  return rs.getTailVisitedPositions().size
}
