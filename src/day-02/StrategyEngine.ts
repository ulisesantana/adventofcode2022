import { GameOption } from './Game'

export enum StrategyOption {
  Lose = 'X',
  Draw = 'Y',
  Win = 'Z'
}

export class StrategyEngine {
  static getGameOptionFor (option: GameOption, strategy: StrategyOption) {
    if (strategy === StrategyOption.Draw) return option
    if (strategy === StrategyOption.Win) return StrategyEngine.getWinnerOptionFor(option)
    return StrategyEngine.getLoserOptionFor(option)
  }

  private static getWinnerOptionFor (option: GameOption): GameOption {
    if (option === GameOption.Scissors) return GameOption.Rock
    if (option === GameOption.Paper) return GameOption.Scissors
    return GameOption.Paper
  }

  private static getLoserOptionFor (option: GameOption): GameOption {
    if (option === GameOption.Scissors) return GameOption.Paper
    if (option === GameOption.Paper) return GameOption.Rock
    return GameOption.Scissors
  }
}
