import { Scrounger } from "../machine/scrounger";
import { Piece } from "./piece";
import { PieceTest } from "./piecetest";

describe('Piece Attack', () => {
  let pt: PieceTest;
  let piece11: Piece;
  let piece12: Piece;
  let piece21: Piece;

  beforeEach(() => {
    pt = new PieceTest();

    pt.setActivePlayer1();
    piece11 = new Scrounger(pt.board, pt.player1);
    piece12 = new Scrounger(pt.board, pt.player1);
    piece21 = new Scrounger(pt.board, pt.player2);
    
    pt.board.clearTurnData();
  });

  it('#canAttack no action taken', () => {
    expect(piece11.canAttack()).toBe(true);
  });

  it('#canAttack not active player turn', () => {
    expect(piece11.canAttack()).toBe(true);
    expect(piece21.canAttack()).toBe(false);
  });

  it('#canAttack with staged sprint', () => {
    pt.initializePiece(piece11, 0, 0);
    pt.initializePiece(piece21, 5, 0); // Move just outside of sprint range
    
    expect(piece11.canMove()).toBe(true);
    expect(piece11.canAttack()).toBe(true);
    expect(piece11.hasConfirmableAttack()).toBe(false);
    expect(piece11.stagedSprint).toBe(false);

    piece11.select();
    expect(piece11.hasConfirmableAttack()).toBe(false);

    piece11.moveOrSprintTo(pt.board.getByRowCol(4, 0));
    expect(piece11.stagedSprint).toBe(true);
    expect(piece11.hasConfirmableAttack()).toBe(false);
  });

  it('#canAttack last piece 0 attacks', () => {
    pt.initializePiece(piece11, 0, 0);
    pt.initializePiece(piece21, 1, 0);
    pt.setActivePlayer2();
    expect(piece21.canAttack()).toBe(true);
  });

  it('#canAttack last piece 1 attack', () => {
    pt.initializePiece(piece11, 0, 0);
    pt.initializePiece(piece21, 1, 0);
    pt.setActivePlayer2();
    expect(piece21.canAttack()).toBe(true);

    piece21.select();
  });
});
