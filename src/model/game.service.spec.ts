import { BaseTest } from "src/test/basetest";
import { Game } from "./game";
import { GameService } from "./game.service";
import { Bristleback } from "./machine/bristleback";
import { Scrounger } from "./machine/scrounger";

describe('GameService', () => {
  let t: BaseTest;
  let gameService: GameService;
  let game: Game;
  beforeEach(() => {
    t = new BaseTest();
    gameService = new GameService();
    game = new Game(t.board);
    gameService.setGame(game);
  });

  it('Bristleback hurts pieces at start of turn', () => {
    let piece11 = new Bristleback();
    let piece12 = new Scrounger();
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece12, 1, 0);
    t.board.clearTurnData();
    t.setActivePlayer2();
    expect(piece12.getHealth()).toBe(piece12.maxHealth);

    // Triggers the Bristleback on start of turn.
    game.endTurn();

    expect(piece12.getHealth()).toBe(piece12.maxHealth - 1);
  });

  it('Bristleback kills piece at start of turn, 2 pieces remain', () => {
    let piece11 = new Bristleback();
    let piece12 = new Scrounger();
    let piece13 = new Scrounger();
    t.setHealth(piece13, 1);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece12, 1, 0);
    t.initializePiece(piece13, 0, 1);
    t.board.clearTurnData();
    t.setActivePlayer2();

    // Triggers the Bristleback on start of turn.
    game.endTurn();

    expect(piece12.getHealth()).toBe(piece12.maxHealth - 1);
    expect(piece13.isDead()).toBeTrue();
    expect(t.player2.getPoints()).toBe(piece13.points);
    expect(piece11.isLastPiece()).toBeFalse();
    expect(piece12.isLastPiece()).toBeFalse();
  });

  it('Bristleback kills piece at start of turn, 1 piece remains', () => {
    let piece11 = new Bristleback();
    let piece12 = new Scrounger();
    t.setHealth(piece12, 1);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece12, 0, 1);
    t.board.clearTurnData();
    t.setActivePlayer2();

    // Triggers the Bristleback on start of turn.
    game.endTurn();

    expect(piece12.isDead()).toBeTrue();
    expect(t.player2.getPoints()).toBe(piece12.points);
    expect(piece11.isLastPiece()).toBeTrue();
  });

  it('Bristleback kills piece at start of turn, 0 pieces remains', () => {
    let piece11 = new Bristleback();
    let piece12 = new Bristleback();
    t.setHealth(piece11, 1);
    t.setHealth(piece12, 1);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece12, 0, 1);
    t.board.clearTurnData();
    t.setActivePlayer2();

    // Triggers the Bristleback on start of turn.
    game.endTurn();

    expect(piece11.isDead()).toBeTrue();
    expect(piece12.isDead()).toBeTrue();
  });
});
