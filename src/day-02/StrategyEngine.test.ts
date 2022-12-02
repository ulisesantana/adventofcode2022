import { GameOption } from './Game'
import { StrategyEngine, StrategyOption } from './StrategyEngine'

describe('Rock, Paper, Scissors strategy should', () => {
  describe.each([
    {
      opponentOption: GameOption.Scissors,
      message: 'scissors',
      lose: GameOption.Paper,
      win: GameOption.Rock
    },
    {
      opponentOption: GameOption.Rock,
      message: 'rock',
      lose: GameOption.Scissors,
      win: GameOption.Paper
    },
    {
      opponentOption: GameOption.Paper,
      message: 'paper',
      lose: GameOption.Rock,
      win: GameOption.Scissors
    }
  ])('for $message', ({
    opponentOption,
    win,
    lose
  }) => {
    it.each([
      {
        message: 'get winner option',
        strategy: StrategyOption.Win,
        expectedResult: win
      },
      {
        message: 'get loser option',
        strategy: StrategyOption.Lose,
        expectedResult: lose
      },
      {
        message: 'get draw option',
        strategy: StrategyOption.Draw,
        expectedResult: opponentOption
      }
    ])('$message', ({
      strategy,
      expectedResult
    }) => {
      expect(StrategyEngine.getGameOptionFor(opponentOption, strategy))
        .toBe(expectedResult)
    })
  })
})
