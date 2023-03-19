import { Scrounger } from "../machine/scrounger";
import { Piece } from "./piece";
import { BaseTest } from "../../test/base-test";

describe('Piece Move', () => {
  let t: BaseTest;
  let piece11: Piece;
  let piece12: Piece;
  let piece21: Piece;

  beforeEach(() => {
    t = new BaseTest();

    t.setActivePlayer1();
    piece11 = new Scrounger();
    piece12 = new Scrounger();
    piece21 = new Scrounger();
    
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 1);
    t.initializePiece(piece21, t.player2, 7, 7);
    t.board.clearTurnData();

    // Important assumptions for all tests.
    expect(t.player1.isLastPiece(piece11)).toBe(false);
    expect(t.player1.isLastPiece(piece12)).toBe(false);
    expect(t.player2.isLastPiece(piece21)).toBe(true);
  });

  it('#canMove no action taken', () => {
    expect(piece11.canMove()).toBe(true);
  });

  it('#canMove not active player turn', () => {
    expect(piece11.canMove()).toBe(true);
    expect(piece21.canMove()).toBe(false);
  });

  it('#canMove last piece', () => {
    t.setActivePlayer2();
    expect(piece21.canMove()).toBe(true);
  });

  it('#canMove last piece 1 move', () => {
    t.setActivePlayer2();
    expect(piece21.canMove()).toBe(true);

    t.performMove(piece21, 7, 6);
    // Can move a second time with last piece.
    expect(piece21.canMove()).toBe(true);
  });

  it('#canMove last piece: move, move', () => {
    t.setActivePlayer2();
    expect(piece21.canMove()).toBe(true);

    t.performMove(piece21, 7, 6);
    expect(piece21.canMove()).toBe(true);

    t.performMove(piece21, 7, 5);
    expect(piece21.canMove()).toBe(false);
  });

  it('#canMove last piece: move, overcharge move', () => {
    t.setActivePlayer2();
    expect(piece21.canMove()).toBe(true);

    t.performMove(piece21, 7, 6);
    expect(piece21.canMove()).toBe(true);

    t.performMoveWithOvercharge(piece21, 7, 5);
    // Can still do a second, regular move.
    expect(piece21.canMove()).toBe(true);
  });

  it('#canMove last piece: move, overcharge move, move', () => {
    t.setActivePlayer2();
    expect(piece21.canMove()).toBe(true);

    t.performMove(piece21, 7, 6);
    expect(piece21.canMove()).toBe(true);

    t.performMoveWithOvercharge(piece21, 7, 5);
    // Can still do a second, regular move.
    expect(piece21.canMove()).toBe(true);

    t.performMove(piece21, 7, 6);
    expect(piece21.canMove()).toBe(false);
  });

  it('#canMove last piece: move, overcharge move, move, overcharge move', () => {
    t.setActivePlayer2();
    expect(piece21.canMove()).toBe(true);

    // 1st regular move
    t.performMove(piece21, 7, 6);
    expect(piece21.canMove()).toBe(true);

    // 1st overcharge
    t.performMoveWithOvercharge(piece21, 7, 5);
    expect(piece21.canMove()).toBe(true);

    // 2nd regular move
    t.performMove(piece21, 7, 6);
    expect(piece21.canMove()).toBe(false);

    // 2nd overcharge
    t.performMoveWithOvercharge(piece21, 7, 5);
    expect(piece21.canMove()).toBe(false);
  });
});
