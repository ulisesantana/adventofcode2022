import { getMonkeyBusiness, Monkey, MonkeyBusiness } from './solution'
import { expectedOutput, fixture } from './fixture'

describe('Day 11', () => {
  it('should ', () => {
    expect(getMonkeyBusiness(fixture)).toBe(expectedOutput)
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

  describe('Monkey Business should', () => {
    it('create all monkeys from raw input', () => {
      const mb = new MonkeyBusiness(fixture)
      expect(mb.monkeys).toHaveLength(4)
      expect(mb.monkeys.at(0)!.id).toBe(0)
      expect(mb.monkeys.at(0)!.items).toEqual([79, 98])
      expect(mb.monkeys.at(-1)!.id).toBe(3)
      expect(mb.monkeys.at(-1)!.items).toEqual([74])
    })
    it('run a round off monkeys doing monkey stuff', () => {
      const mb = new MonkeyBusiness(fixture)
      mb.run(1)
      expect(mb.monkeys.at(0)!.items).toEqual([20, 23, 27, 26])
      expect(mb.monkeys.at(1)!.items).toEqual([2080, 25, 167, 207, 401, 1046])
      expect(mb.monkeys.at(2)!.items).toEqual([])
      expect(mb.monkeys.at(3)!.items).toEqual([])
    })
  })
})
