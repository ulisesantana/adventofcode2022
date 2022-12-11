import { doStuff, Monkey } from './solution'
import { expectedOutput, fixture } from './fixture'

describe('Day 11', () => {
  xit('should ', () => {
    expect(doStuff(fixture)).toBe(expectedOutput)
  })

  describe('Monkey should', () => {
    it('be created from raw input', () => {
      const monkey = Monkey.from(0, `Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
If true: throw to monkey 2
If false: throw to monkey 0`)
      const expectedMonkey = new Monkey({
        items: [54, 65, 75, 74],
        monkeyId: 0,
        operation (old) {
          return old + 6
        },
        testFalse: 0,
        testTrue: 2,
        testValue: 19
      })
      expect(monkey.id).toBe(expectedMonkey.id)
      expect(monkey.items).toEqual(expectedMonkey.items)
      expect(monkey.operation(100)).toBe(expectedMonkey.operation(100))
      expect(monkey.testFalse).toBe(expectedMonkey.testFalse)
      expect(monkey.testTrue).toBe(expectedMonkey.testTrue)
      expect(monkey.testValue).toBe(expectedMonkey.testValue)
    })
  })
})
