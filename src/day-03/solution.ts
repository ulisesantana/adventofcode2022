import { EOL } from 'os'
import { PriorityCalculator } from './PriorityCalculator'

export function calcPriority (input: string) {
  const rucksackList = input.split(EOL).filter(Boolean)
  return PriorityCalculator.calcList(rucksackList)
}
