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
