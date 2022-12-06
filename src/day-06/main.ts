import { readFile } from '../utils'
import { findMarkerPosition } from './solution'

readFile('src/day-06/input.txt').then((input) => {
  console.log(`Result: ${findMarkerPosition(input)}`)
})
