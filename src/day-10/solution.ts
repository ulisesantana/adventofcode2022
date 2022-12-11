import { split, sum } from '../utils'
import { EOL } from 'os'
import { Task } from './Task'

class VideoSystemReplacement {
  private X = 1
  private readonly signalStrengths = [] as number[]
  private readonly screenWidth = 40
  private screen = [] as string[]
  private screenLines = 0
  run (commands: string[]) {
    this.executeCycle(commands.map(Task.fromCommand))
    return this
  }

  getSignalStrengthForCycles (...cycles: number[]) {
    return this.signalStrengths.filter((_, index) => cycles.includes(index + 1))
  }

  getScreenShot () {
    return [
      this.screen.slice(0, 40),
      this.screen.slice(40, 80),
      this.screen.slice(80, 120),
      this.screen.slice(120, 160),
      this.screen.slice(160, 200),
      this.screen.slice(200, 240)
    ].map(line => line.join('')).join(EOL)
  }

  private executeCycle ([task, ...tasks]: Task[]) {
    if (tasks.length === 0) return
    if (task.isReady()) {
      this.X += task.value
      task = tasks.at(0)!
      tasks = tasks.slice(1)
    }
    const currentCycle = this.signalStrengths.length + 1
    this.addSignalStrength(currentCycle)
    this.drawPixel(currentCycle)
    task.finishCycle()
    return this.executeCycle([task, ...tasks])
  }

  private addSignalStrength (currentCycle: number) {
    this.signalStrengths.push(this.X * currentCycle)
  }

  private drawPixel (currentCycle: number) {
    const ctrPositions = this.getCRTPositions(currentCycle)
    if (ctrPositions.includes(this.X)) {
      this.screen.push('#')
    } else {
      this.screen.push('.')
    }
    if ((this.screen.length / this.screenWidth) > (this.screenLines + 1)) {
      this.screenLines += 1
    }
  }

  private getCRTPositions (currentCycle: number) {
    const centerPosition = currentCycle - (this.screenWidth * this.screenLines)
    return [centerPosition - 2, centerPosition - 1, centerPosition]
  }
}

export function sumSignalStrengths (input: string) {
  const vsr = new VideoSystemReplacement().run(split(EOL, input))
  return sum(...vsr.getSignalStrengthForCycles(20, 60, 100, 140, 180, 220))
}

export function print (input: string) {
  const vsr = new VideoSystemReplacement().run(split(EOL, input))
  return vsr.getScreenShot()
}
