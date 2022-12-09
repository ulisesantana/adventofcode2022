import { split } from '../utils'
import { EOL } from 'os'

type Steps = number
enum Direction {
  Up = 'U',
  Right = 'R',
  Down = 'D',
  Left = 'L',
}
type Instruction = [Direction, Steps]

class Position {
  constructor (public x: number, public y: number) {}

  toString () {
    return `${this.x}:${this.y}`
  }

  moveUp () {
    this.x += 1
  }

  moveRight () {
    this.y += 1
  }

  moveDown () {
    this.x -= 1
  }

  moveLeft () {
    this.y -= 1
  }

  moveTo (x: number, y: number) {
    this.x = x
    this.y = y
  }
}

class RopeSimulator {
  private readonly headPosition = new Position(0, 0)
  private readonly tailPosition = new Position(0, 0)
  private readonly tailVisitedPositions = new Set<string>([new Position(0, 0).toString()])

  processInstruction ([direction, steps]: Instruction): void {
    if (steps === 0) return
    this.moveHead(direction)
    this.moveTail(direction)
    this.processInstruction([direction, steps - 1])
  }

  getTailVisitedPositions () {
    return this.tailVisitedPositions.size
  }

  private moveHead (direction: Direction) {
    switch (direction) {
      case Direction.Up: return this.headPosition.moveUp()
      case Direction.Right: return this.headPosition.moveRight()
      case Direction.Down: return this.headPosition.moveDown()
      case Direction.Left: return this.headPosition.moveLeft()
    }
  }

  private moveTail (direction: Direction) {
    const { x, y } = this.headPosition
    const xDelta = this.calcStepsAway(x, this.tailPosition.x)
    const yDelta = this.calcStepsAway(y, this.tailPosition.y)
    if (xDelta > 1 || yDelta > 1) {
      switch (direction) {
        case Direction.Up: {
          this.tailPosition.moveTo(x - 1, y)
          break
        }
        case Direction.Right: {
          this.tailPosition.moveTo(x, y - 1)
          break
        }
        case Direction.Down: {
          this.tailPosition.moveTo(x + 1, y)
          break
        }
        case Direction.Left: {
          this.tailPosition.moveTo(x, y + 1)
          break
        }
      }
      this.tailVisitedPositions.add(this.tailPosition.toString())
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
  const rs = new RopeSimulator()
  for (const instruction of generateInstructions(input)) {
    rs.processInstruction(instruction)
  }
  return rs.getTailVisitedPositions()
}
