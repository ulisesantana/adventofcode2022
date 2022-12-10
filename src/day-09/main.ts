import { readFile } from '../utils'
import { countTailPositions, countTailPositionsOnLargeRope } from './solution'

readFile('src/day-09/input.txt').then((input) => {
  console.log(`Result: ${countTailPositions(input)}`)
  console.log(`Resul 2: ${countTailPositionsOnLargeRope(input)}`)
})
