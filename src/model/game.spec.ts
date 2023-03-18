import { Board } from "./board";
import { Game } from "./game";

describe('Game', () => {
  let game: Game;
  beforeEach(() => {
    game = new Game(new Board());

    expect(game.isGameOver()).toBe(false);
    expect(game.getWinningPlayer()).toBeNull();
  });

  it('#defaultState has player 1 active', () => {
    expect(game.getPlayer1().isActive()).toBe(true);
    expect(game.getPlayer2().isActive()).toBe(false);
  });

  it('#startGame should begin with player 1', () => {
    game.start();
    expect(game.getPlayer1().isActive()).toBe(true);
    expect(game.getPlayer2().isActive()).toBe(false);
    game.endTurn();
    expect(game.getPlayer1().isActive()).toBe(false);
    expect(game.getPlayer2().isActive()).toBe(true);
    game.start();
    expect(game.getPlayer1().isActive()).toBe(true);
    expect(game.getPlayer2().isActive()).toBe(false);
  });

  it('#endTurn switches active player', () => {
    game.start();
    expect(game.getPlayer1().isActive()).toBe(true);
    expect(game.getPlayer2().isActive()).toBe(false);
    game.endTurn();
    expect(game.getPlayer1().isActive()).toBe(false);
    expect(game.getPlayer2().isActive()).toBe(true);
    game.endTurn();
    expect(game.getPlayer1().isActive()).toBe(true);
    expect(game.getPlayer2().isActive()).toBe(false);
  });

  it('#getActivePlayer returns active player', () => {
    game.start();
    expect(game.getActivePlayer()).toBe(game.getPlayer1());
    game.endTurn();
    expect(game.getActivePlayer()).toBe(game.getPlayer2());
    game.endTurn();
    expect(game.getActivePlayer()).toBe(game.getPlayer1());
  });

  it('#getOtherPlayer', () => {
    expect(game.getOtherPlayer(game.getPlayer1())).toBe(game.getPlayer2());
    expect(game.getOtherPlayer(game.getPlayer2())).toBe(game.getPlayer1());
  });

  it('#checkWinCondition no points, not over', () => {
    game.checkWinCondition();
    expect(game.isGameOver()).toBe(false);
    expect(game.getWinningPlayer()).toBeNull();
  });

  it('#checkWinCondition some points, not over', () => {
    game.getPlayer1().addPoints(5);
    game.getPlayer2().addPoints(3);
    game.checkWinCondition();
    expect(game.isGameOver()).toBe(false);
    expect(game.getWinningPlayer()).toBeNull();
  });

  it('#checkWinCondition player 1 won', () => {
    game.getPlayer1().addPoints(7);
    game.getPlayer2().addPoints(3);
    game.checkWinCondition();
    expect(game.isGameOver()).toBe(true);
    expect(game.getWinningPlayer()).toEqual(game.getPlayer1());
  });

  it('#checkWinCondition player 2 won', () => {
    game.getPlayer1().addPoints(1);
    game.getPlayer2().addPoints(7);
    game.checkWinCondition();
    expect(game.isGameOver()).toBe(true);
    expect(game.getWinningPlayer()).toEqual(game.getPlayer2());
  });

  it('#checkWinCondition tie in points, player 1 active', () => {
    game.getPlayer1().setActive(true);
    game.getPlayer2().setActive(false);
    game.getPlayer1().addPoints(7);
    game.getPlayer2().addPoints(7);
    game.checkWinCondition();
    expect(game.isGameOver()).toBe(true);
    expect(game.getWinningPlayer()).toEqual(game.getPlayer1());
  });

  it('#checkWinCondition tie in points, player 2 active', () => {
    game.getPlayer1().setActive(false);
    game.getPlayer2().setActive(true);
    game.getPlayer1().addPoints(7);
    game.getPlayer2().addPoints(7);
    game.checkWinCondition();
    expect(game.isGameOver()).toBe(true);
    expect(game.getWinningPlayer()).toEqual(game.getPlayer2());
  });
});
