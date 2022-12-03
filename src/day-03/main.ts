import { readFile } from '../utils'
import { EOL } from 'os'
import { PriorityCalculator } from './PriorityCalculator'

export function calcPriority (input: string) {
  const rucksackList = input.split(EOL).filter(Boolean)
  return PriorityCalculator.calcList(rucksackList)
}

if (require.main === module) {
  readFile('src/day-03/input.txt').then((input) => {
    console.log(`Result: ${calcPriority(input)}`)
  })
}
