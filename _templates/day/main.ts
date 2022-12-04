import { readFile } from '../utils'
import { doStuff } from './solution'

readFile('src/{{dayFolder}}/input.txt').then((input) => {
  console.log(`Result: ${doStuff(input)}`)
})
