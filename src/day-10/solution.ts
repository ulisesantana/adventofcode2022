import { split, sum } from '../utils'
import { EOL } from 'os'

class Task {
  constructor (readonly value: number, private cycles) {}
  static fromCommand (command: string): Task {
    const [action, rawValue] = split(/\s/, command)
    const value = Number(rawValue)
    return new Task(
      isNaN(value) ? 0 : value,
      action === 'noop' ? 1 : 2
    )
  }

  finishCycle () {
    this.cycles -= 1
  }

  isReady () {
    return this.cycles < 1
  }
}

class VideoSystemReplacement {
  private X = 1
  private readonly signalStrengths = [] as number[]
  run (commands: string[]) {
    this.executeCycle(commands.map(Task.fromCommand))
    return this
  }

  getSignalStrengthForCycles (...cycles: number[]) {
    return this.signalStrengths.filter((_, index) => cycles.includes(index + 1))
  }

  private executeCycle ([task, ...tasks]: Task[]) {
    if (tasks.length === 0) return
    if (task.isReady()) {
      this.X += task.value
      task = tasks.at(0)!
      tasks = tasks.slice(1)
    }
    const currentCycle = this.signalStrengths.length + 1
    this.signalStrengths.push(this.X * currentCycle)
    task.finishCycle()
    return this.executeCycle([task, ...tasks])
  }
}
export function sumSignalStrengths (input: string) {
  const vsr = new VideoSystemReplacement()
  return sum(
    ...vsr.run(split(EOL, input))
      .getSignalStrengthForCycles(20, 60, 100, 140, 180, 220)
  )
}
