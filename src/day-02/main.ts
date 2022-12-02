import { readFile } from '../utils'
import { EOL } from 'os'
import { Game, GameOption } from './Game'
import { StrategyEngine, StrategyOption } from './StrategyEngine'

export function getTotalScore (input: string) {
  const rounds = input.split(EOL).filter(Boolean)
  return rounds.reduce((total, round) => {
    const [opponentOption, strategy] = round.split(' ').filter(Boolean) as [GameOption, StrategyOption]
    const myOption = StrategyEngine.getGameOptionFor(opponentOption, strategy)
    return Game.play(myOption, opponentOption) + total
  }, 0)
}

if (require.main === module) {
  readFile('src/day-02/input.txt').then((input) => {
    console.log(`If everything goes exactly according to your strategy guide my total score will be ${getTotalScore(input)}`)
  })
}
