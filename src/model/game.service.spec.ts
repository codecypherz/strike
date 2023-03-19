import { BaseTest } from "src/test/basetest";
import { TestMeleePiece } from "src/test/test-melee-piece";
import { GameService } from "./game.service";
import { Bristleback } from "./machine/bristleback";

describe('GameService', () => {
  let t: BaseTest;
  let gameService: GameService;

  beforeEach(() => {
    t = new BaseTest();
    gameService = new GameService();
    gameService.setGame(t.game);
  });

  it('Bristleback hurts pieces at start of turn', () => {
    let piece11 = new Bristleback();
    let piece12 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 1, 0);
    t.setActivePlayer2();
    expect(piece12.getHealth()).toBe(piece12.maxHealth);

    // Triggers the Bristleback on start of turn.
    t.game.endTurn();

    expect(piece12.getHealth()).toBe(piece12.maxHealth - 1);
  });

  it('Bristleback kills piece at start of turn, 2 pieces remain', () => {
    let piece11 = new Bristleback();
    let piece12 = new TestMeleePiece();
    let piece13 = new TestMeleePiece();
    t.setHealth(piece13, 1);
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 1, 0);
    t.initializePiece(piece13, t.player1, 0, 1);
    t.setActivePlayer2();

    // Triggers the Bristleback on start of turn.
    t.game.endTurn();

    expect(piece12.getHealth()).toBe(piece12.maxHealth - 1);
    expect(piece13.isDead()).toBeTrue();
    expect(t.player2.getPoints()).toBe(piece13.points);
    expect(piece11.isLastPiece()).toBeFalse();
    expect(piece12.isLastPiece()).toBeFalse();
  });

  it('Bristleback kills piece at start of turn, 1 piece remains', () => {
    let piece11 = new Bristleback();
    let piece12 = new TestMeleePiece();
    t.setHealth(piece12, 1);
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 1);
    t.setActivePlayer2();

    // Triggers the Bristleback on start of turn.
    t.game.endTurn();

    expect(piece12.isDead()).toBeTrue();
    expect(t.player2.getPoints()).toBe(piece12.points);
    expect(piece11.isLastPiece()).toBeTrue();
  });

  it('Bristleback kills piece at start of turn, 0 pieces remains', () => {
    let piece11 = new Bristleback();
    let piece12 = new Bristleback();
    t.setHealth(piece11, 1);
    t.setHealth(piece12, 1);
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 1);
    t.setActivePlayer2();

    // Triggers the Bristleback on start of turn.
    t.game.endTurn();

    expect(piece11.isDead()).toBeTrue();
    expect(piece12.isDead()).toBeTrue();
  });
});
