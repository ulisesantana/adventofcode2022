import { sum } from '../utils'

export type RucksackGroup = [string, string, string]
export class PriorityCalculator {
  private static priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

  static calcList (rucksackList: string[]) {
    const groups = Array.from(PriorityCalculator.generateGroups(rucksackList))
    return sum(...Array.from(groups).map(PriorityCalculator.calcGroup))
  }

  static calcGroup (rucksackGroup: RucksackGroup) {
    const repeatedItem = PriorityCalculator.findRepeatedItem(rucksackGroup)
    return PriorityCalculator.getPriority(repeatedItem)
  }

  private static * generateGroups (rucksackList: string[]): Generator<RucksackGroup> {
    const temp = []
    for (const rucksack of rucksackList) {
      temp.push(rucksack)
      if (temp.length === 3) {
        yield [...temp] as RucksackGroup
        temp.length = 0
      }
    }
  }

  private static findRepeatedItem ([firstRucksack, secondRucksack, thirdRucksack]: RucksackGroup) {
    const [first, second, third] = [Array.from(firstRucksack), Array.from(secondRucksack), Array.from(thirdRucksack)]
    return first.find(item => second.includes(item) && third.includes(item))!
  }

  private static getPriority (item: string): number {
    return PriorityCalculator.priority.indexOf(item) + 1
  }
}
