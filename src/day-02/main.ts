import { readFile } from '../utils'
import { getTotalScore } from './solution'

readFile('src/day-02/input.txt').then((input) => {
  console.log(`If everything goes exactly according to your strategy guide my total score will be ${getTotalScore(input)}`)
})
