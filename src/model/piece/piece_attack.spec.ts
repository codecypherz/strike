import { Scrounger } from "../machine/scrounger";
import { Piece } from "./piece";
import { BaseTest } from "../../test/basetest";

describe('Piece Attack', () => {
  let t: BaseTest;
  let piece11: Piece;
  let piece12: Piece;
  let piece21: Piece;

  beforeEach(() => {
    t = new BaseTest();

    t.setActivePlayer1();
    piece11 = new Scrounger(t.board, t.player1);
    piece12 = new Scrounger(t.board, t.player1);
    piece21 = new Scrounger(t.board, t.player2);
    
    t.board.clearTurnData();
  });

  it('#canAttack no action taken', () => {
    expect(piece11.canAttack()).toBe(true);
  });

  it('#canAttack not active player turn', () => {
    expect(piece11.canAttack()).toBe(true);
    expect(piece21.canAttack()).toBe(false);
  });

  it('#canAttack with staged sprint', () => {
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 5, 0); // Move just outside of sprint range
    
    expect(piece11.canMove()).toBe(true);
    expect(piece11.canAttack()).toBe(true);
    expect(piece11.hasConfirmableAttack()).toBe(false);
    expect(piece11.stagedSprint).toBe(false);

    piece11.select();
    expect(piece11.hasConfirmableAttack()).toBe(false);

    piece11.moveOrSprintTo(t.board.getByRowCol(4, 0));
    expect(piece11.stagedSprint).toBe(true);
    expect(piece11.hasConfirmableAttack()).toBe(false);
  });

  it('#canAttack last piece 0 attacks', () => {
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 1, 0);
    t.setActivePlayer2();
    expect(piece21.canAttack()).toBe(true);
  });

  it('#canAttack last piece 1 attack', () => {
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 1, 0);
    t.setActivePlayer2();
    expect(piece21.canAttack()).toBe(true);

    piece21.select();
  });
});
