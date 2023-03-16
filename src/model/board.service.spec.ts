import { BaseTest } from "src/test/basetest";
import { Board } from "./board";
import { BoardService } from "./board.service";
import { GameService } from "./game.service";
import { Bristleback } from "./machine/bristleback";
import { Scrounger } from "./machine/scrounger";
import { TurnService } from "./turn.service";

describe('BoardService', () => {
  let t: BaseTest;
  let turnService: TurnService;
  let gameService: GameService;
  let boardService: BoardService;
  beforeEach(() => {
    t = new BaseTest();
    turnService = new TurnService();
    t.player1 = turnService.player1;
    t.player2 = turnService.player2;
    gameService = new GameService(t.board, turnService);
    boardService = new BoardService(t.board, turnService, gameService);


  });

  it('Bristleback hurts pieces at start of turn', () => {
    let piece11 = new Bristleback(t.board, t.player1);
    let piece12 = new Scrounger(t.board, t.player1);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece12, 1, 0);
    t.board.clearTurnData();
    t.setActivePlayer2();
    expect(piece12.getHealth()).toBe(piece12.maxHealth);

    // Triggers the Bristleback on start of turn.
    turnService.endTurn();

    expect(piece12.getHealth()).toBe(piece12.maxHealth - 1);
  });

  it('Bristleback kills piece at start of turn, 2 pieces remain', () => {
    let piece11 = new Bristleback(t.board, t.player1);
    let piece12 = new Scrounger(t.board, t.player1);
    let piece13 = new Scrounger(t.board, t.player1);
    t.setHealth(piece13, 1);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece12, 1, 0);
    t.initializePiece(piece13, 0, 1);
    t.board.clearTurnData();
    t.setActivePlayer2();

    // Triggers the Bristleback on start of turn.
    turnService.endTurn();

    expect(piece12.getHealth()).toBe(piece12.maxHealth - 1);
    expect(piece13.isDead()).toBeTrue();
    expect(t.player2.getPoints()).toBe(piece13.points);
    expect(piece11.isLastPiece()).toBeFalse();
    expect(piece12.isLastPiece()).toBeFalse();
  });

  it('Bristleback kills piece at start of turn, 1 piece remains', () => {
    let piece11 = new Bristleback(t.board, t.player1);
    let piece12 = new Scrounger(t.board, t.player1);
    t.setHealth(piece12, 1);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece12, 0, 1);
    t.board.clearTurnData();
    t.setActivePlayer2();

    // Triggers the Bristleback on start of turn.
    turnService.endTurn();

    expect(piece12.isDead()).toBeTrue();
    expect(t.player2.getPoints()).toBe(piece12.points);
    expect(piece11.isLastPiece()).toBeTrue();
  });

  it('Bristleback kills piece at start of turn, 0 pieces remains', () => {
    let piece11 = new Bristleback(t.board, t.player1);
    let piece12 = new Bristleback(t.board, t.player1);
    t.setHealth(piece11, 1);
    t.setHealth(piece12, 1);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece12, 0, 1);
    t.board.clearTurnData();
    t.setActivePlayer2();

    // Triggers the Bristleback on start of turn.
    turnService.endTurn();

    expect(piece11.isDead()).toBeTrue();
    expect(piece12.isDead()).toBeTrue();
  });
});
