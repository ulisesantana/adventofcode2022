import { readFile } from '../utils'
import { findMessageMarkerPosition, findPacketMarkerPosition } from './solution'

readFile('src/day-06/input.txt').then((input) => {
  console.log(`Packet: ${findPacketMarkerPosition(input)}`)
  console.log(`Message: ${findMessageMarkerPosition(input)}`)
})
