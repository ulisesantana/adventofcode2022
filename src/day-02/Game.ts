
export enum GameOption {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C'
}

enum GameResult {
  Win= 6,
  Draw = 3,
  Lose = 0
}

enum OptionPoints {
  Rock = 1,
  Paper = 2,
  Scissors = 3
}

type Score = number

export class Game {
  static play (player1: GameOption, player2: GameOption): Score {
    const result = Game.resolveRound(player1, player2)
    return result + Game.calcOptionPoints(player1)
  }

  private static resolveRound (player1: GameOption, player2: GameOption): GameResult {
    if (player1 === player2) return GameResult.Draw
    if (player1 === GameOption.Paper && player2 === GameOption.Rock) return GameResult.Win
    if (player1 === GameOption.Scissors && player2 === GameOption.Paper) return GameResult.Win
    if (player1 === GameOption.Rock && player2 === GameOption.Scissors) return GameResult.Win
    return GameResult.Lose
  }

  private static calcOptionPoints (option: GameOption) {
    if (option === GameOption.Scissors) return OptionPoints.Scissors
    if (option === GameOption.Paper) return OptionPoints.Paper
    return OptionPoints.Rock
  }
}
