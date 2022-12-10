import { split } from '../utils'

export class Task {
  constructor (readonly value: number, private cycles) {
  }

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
