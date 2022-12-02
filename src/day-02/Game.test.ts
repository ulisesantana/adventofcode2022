import { Game, GameOption } from './Game'

describe('Rock, Paper, Scissors game', () => {
  it.each([
    {
      message: 'rock should win scissors',
      player1: GameOption.Rock,
      player2: GameOption.Scissors,
      expectedResult: 7
    },
    {
      message: 'paper should win rock',
      player1: GameOption.Paper,
      player2: GameOption.Rock,
      expectedResult: 8
    },
    {
      message: 'scissors should win paper',
      player1: GameOption.Scissors,
      player2: GameOption.Paper,
      expectedResult: 9
    },
    {
      message: 'scissors should be beaten by rock',
      player1: GameOption.Scissors,
      player2: GameOption.Rock,
      expectedResult: 3
    },
    {
      message: 'rock should be beaten by paper',
      player1: GameOption.Rock,
      player2: GameOption.Paper,
      expectedResult: 1
    },
    {
      message: 'paper should be beaten by scissors',
      player1: GameOption.Paper,
      player2: GameOption.Scissors,
      expectedResult: 2
    },
    {
      message: 'same options result in draw',
      player1: GameOption.Scissors,
      player2: GameOption.Scissors,
      expectedResult: 6
    }
  ])('$message', ({
    player1,
    player2,
    expectedResult
  }) => {
    expect(Game.play(player1, player2)).toBe(expectedResult)
  })
})
