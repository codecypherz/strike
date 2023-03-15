import { Board } from "./board";
import { GameService } from "./game.service";
import { TurnService } from "./turn.service";

describe('GameService', () => {
  let board: Board;
  let turnService: TurnService;
  let gameService: GameService;
  beforeEach(() => {
    board = new Board();
    turnService = new TurnService();
    gameService = new GameService(board, turnService);

    turnService.player1.setActive(true);
    turnService.player2.setActive(false);

    expect(gameService.isGameOver()).toBe(false);
    expect(gameService.getWinningPlayer()).toBeNull();
  });

  it('#checkWinCondition no points, not over', () => {
    gameService.checkWinCondition();
    expect(gameService.isGameOver()).toBe(false);
    expect(gameService.getWinningPlayer()).toBeNull();
  });

  it('#checkWinCondition some points, not over', () => {
    turnService.player1.addPoints(5);
    turnService.player2.addPoints(3);
    gameService.checkWinCondition();
    expect(gameService.isGameOver()).toBe(false);
    expect(gameService.getWinningPlayer()).toBeNull();
  });

  it('#checkWinCondition player 1 won', () => {
    turnService.player1.addPoints(7);
    turnService.player2.addPoints(3);
    gameService.checkWinCondition();
    expect(gameService.isGameOver()).toBe(true);
    expect(gameService.getWinningPlayer()).toEqual(turnService.player1);
  });

  it('#checkWinCondition player 2 won', () => {
    turnService.player1.addPoints(1);
    turnService.player2.addPoints(7);
    gameService.checkWinCondition();
    expect(gameService.isGameOver()).toBe(true);
    expect(gameService.getWinningPlayer()).toEqual(turnService.player2);
  });

  it('#checkWinCondition tie in points, player 1 active', () => {
    turnService.player1.setActive(true);
    turnService.player2.setActive(false);
    turnService.player1.addPoints(7);
    turnService.player2.addPoints(7);
    gameService.checkWinCondition();
    expect(gameService.isGameOver()).toBe(true);
    expect(gameService.getWinningPlayer()).toEqual(turnService.player1);
  });

  it('#checkWinCondition tie in points, player 2 active', () => {
    turnService.player1.setActive(false);
    turnService.player2.setActive(true);
    turnService.player1.addPoints(7);
    turnService.player2.addPoints(7);
    gameService.checkWinCondition();
    expect(gameService.isGameOver()).toBe(true);
    expect(gameService.getWinningPlayer()).toEqual(turnService.player2);
  });
});
