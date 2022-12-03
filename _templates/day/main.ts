import { readFile } from '../utils'

export function doStuff (input: string) {
  return null
}

if (require.main === module) {
  readFile('src/{{dayFolder}}/input.txt').then((input) => {
    console.log(`Result: ${doStuff(input)}`)
  })
}
