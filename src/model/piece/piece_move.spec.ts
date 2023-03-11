import { Scrounger } from "../machine/scrounger";
import { Piece } from "./piece";
import { PieceTest } from "./piecetest";

describe('Piece Move', () => {
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
    
    pt.initializePiece(piece11, 0, 0);
    pt.initializePiece(piece12, 0, 1);
    pt.initializePiece(piece21, 7, 7);
    pt.board.clearTurnData();

    // Important assumptions for all tests.
    expect(pt.player1.isLastPiece(piece11)).toBe(false);
    expect(pt.player1.isLastPiece(piece12)).toBe(false);
    expect(pt.player2.isLastPiece(piece21)).toBe(true);
  });

  it('#canMove no action taken', () => {
    expect(piece11.canMove()).toBe(true);
  });

  it('#canMove not active player turn', () => {
    expect(piece11.canMove()).toBe(true);
    expect(piece21.canMove()).toBe(false);
  });

  it('#canMove last piece', () => {
    pt.setActivePlayer2();
    expect(piece21.canMove()).toBe(true);
  });

  it('#canMove last piece 1 move', () => {
    pt.setActivePlayer2();
    expect(piece21.canMove()).toBe(true);

    pt.performMove(piece21, 7, 6);
    // Can move a second time with last piece.
    expect(piece21.canMove()).toBe(true);
  });

  it('#canMove last piece: move, move', () => {
    pt.setActivePlayer2();
    expect(piece21.canMove()).toBe(true);

    pt.performMove(piece21, 7, 6);
    expect(piece21.canMove()).toBe(true);

    pt.performMove(piece21, 7, 5);
    expect(piece21.canMove()).toBe(false);
  });

  it('#canMove last piece: move, overcharge move', () => {
    pt.setActivePlayer2();
    expect(piece21.canMove()).toBe(true);

    pt.performMove(piece21, 7, 6);
    expect(piece21.canMove()).toBe(true);

    pt.performMoveWithOvercharge(piece21, 7, 5);
    // Can still do a second, regular move.
    expect(piece21.canMove()).toBe(true);
  });

  it('#canMove last piece: move, overcharge move, move', () => {
    pt.setActivePlayer2();
    expect(piece21.canMove()).toBe(true);

    pt.performMove(piece21, 7, 6);
    expect(piece21.canMove()).toBe(true);

    pt.performMoveWithOvercharge(piece21, 7, 5);
    // Can still do a second, regular move.
    expect(piece21.canMove()).toBe(true);

    pt.performMove(piece21, 7, 6);
    expect(piece21.canMove()).toBe(false);
  });

  it('#canMove last piece: move, overcharge move, move, overcharge move', () => {
    pt.setActivePlayer2();
    expect(piece21.canMove()).toBe(true);

    // 1st regular move
    pt.performMove(piece21, 7, 6);
    expect(piece21.canMove()).toBe(true);

    // 1st overcharge
    pt.performMoveWithOvercharge(piece21, 7, 5);
    expect(piece21.canMove()).toBe(true);

    // 2nd regular move
    pt.performMove(piece21, 7, 6);
    expect(piece21.canMove()).toBe(false);

    // 2nd overcharge
    pt.performMoveWithOvercharge(piece21, 7, 5);
    expect(piece21.canMove()).toBe(false);
  });
});
