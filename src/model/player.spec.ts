import { BaseTest } from "../test/basetest";
import { Scrounger } from "./machine/scrounger";

describe('Player', () => {
  let t: BaseTest;
  beforeEach(() => {
    t = new BaseTest();
    t.setActivePlayer1();
  });

  it('#canEndTurn 2 pieces: no action taken', () => {
    let piece1 = new Scrounger(t.board, t.player1);
    let piece2 = new Scrounger(t.board, t.player1);
    t.initializePiece(piece1, 0, 2);
    t.initializePiece(piece2, 0, 4);
    expect(t.player1.canEndTurn()).toBe(false);
  });

  it('#canEndTurn 2 pieces: 1 move', () => {
    let piece1 = new Scrounger(t.board, t.player1);
    let piece2 = new Scrounger(t.board, t.player1);
    t.initializePiece(piece1, 0, 2);
    t.initializePiece(piece2, 0, 4);

    t.performMove(piece1, 0, 1);
    expect(t.player1.canEndTurn()).toBe(false);
  });

  it('#canEndTurn 2 pieces: 1 move each', () => {
    let piece1 = new Scrounger(t.board, t.player1);
    let piece2 = new Scrounger(t.board, t.player1);
    t.initializePiece(piece1, 0, 2);
    t.initializePiece(piece2, 0, 4);

    t.performMove(piece1, 0, 1);
    expect(t.player1.canEndTurn()).toBe(false);

    t.performMove(piece2, 0, 3);
    expect(t.player1.canEndTurn()).toBe(true);
  });

  it('#canEndTurn 2 pieces: 1 piece moves and attacks', () => {
    let piece11 = new Scrounger(t.board, t.player1);
    let piece12 = new Scrounger(t.board, t.player1);
    let piece21 = new Scrounger(t.board, t.player2);
    t.initializePiece(piece11, 0, 1);
    t.initializePiece(piece12, 0, 4);
    t.initializePiece(piece21, 1, 0);

    t.performMove(piece11, 0, 0);
    t.performAttack(piece11);
    expect(t.player1.canEndTurn()).toBe(false);
  });

  it('#canEndTurn 2 pieces: neither piece can move', () => {
    let piece11 = new Scrounger(t.board, t.player1);
    let piece12 = new Scrounger(t.board, t.player1);
    let piece21 = new Scrounger(t.board, t.player2);
    let piece22 = new Scrounger(t.board, t.player2);
    let piece23 = new Scrounger(t.board, t.player2);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece12, 0, 1);
    // Use player 2 pieces to box in
    t.initializePiece(piece21, 1, 0);
    t.initializePiece(piece22, 1, 1);
    t.initializePiece(piece23, 0, 2);
    // confirm player 1 pieces are stuck
    expect(piece11.isStuck()).toBe(true);
    expect(piece12.isStuck()).toBe(true);

    // Can end your turn if all pieces are stuck
    expect(t.player1.canEndTurn()).toBe(true);
  });

  it('#canEndTurn 2 pieces: 1 piece stuck, only 1 moves', () => {
    let piece11 = new Scrounger(t.board, t.player1);
    let piece12 = new Scrounger(t.board, t.player1);
    let piece21 = new Scrounger(t.board, t.player2);
    let piece22 = new Scrounger(t.board, t.player2);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece12, 0, 4);
    // Use player 2 pieces to box in piece 11
    t.initializePiece(piece21, 1, 0);
    t.initializePiece(piece22, 0, 1);
    // 1 piece stuck, 1 piece not stuck
    expect(piece11.isStuck()).toBe(true);
    expect(piece12.isStuck()).toBe(false);

    // Cannot end your turn if a piece can still move
    expect(t.player1.canEndTurn()).toBe(false);

    t.performMove(piece12, 0, 3);
    expect(piece11.isStuck()).toBe(true); // this is still stuck

    // Can end turn because 1 piece is still stuck
    expect(t.player1.canEndTurn()).toBe(true);
  });

  it('#canEndTurn 2 pieces: 1 piece stuck, both pieces move', () => {
    let piece11 = new Scrounger(t.board, t.player1);
    let piece12 = new Scrounger(t.board, t.player1);
    let piece21 = new Scrounger(t.board, t.player2);
    let piece22 = new Scrounger(t.board, t.player2);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece12, 0, 1);
    // Use player 2 pieces to box in piece 11
    t.initializePiece(piece21, 1, 0);
    t.initializePiece(piece22, 1, 1);
    // 1 piece stuck, 1 piece not stuck
    expect(piece11.isStuck()).toBe(true);
    expect(piece12.isStuck()).toBe(false);

    // Cannot end your turn if a piece can still move
    expect(t.player1.canEndTurn()).toBe(false);

    t.performMove(piece12, 0, 2);
    expect(piece11.isStuck()).toBe(false);

    // Still cannot end turn because piece 1 is now unstuck.
    expect(t.player1.canEndTurn()).toBe(false);

    t.performMove(piece11, 0, 1);
    // Now that both pieces have moved, can end turn.
    expect(t.player1.canEndTurn()).toBe(true);
  });

  it('#canEndTurn 1 piece: no action taken', () => {
    let piece1 = new Scrounger(t.board, t.player1);
    t.initializePiece(piece1, 0, 0);
    expect(t.player1.canEndTurn()).toBe(false);
  });

  it('#canEndTurn 1 piece: 1 move', () => {
    let piece1 = new Scrounger(t.board, t.player1);
    t.initializePiece(piece1, 0, 0);
    expect(t.player1.canEndTurn()).toBe(false);

    t.performMove(piece1, 0, 1);
    expect(t.player1.canEndTurn()).toBe(false);
  });

  it('#canEndTurn 1 piece: 2 moves', () => {
    let piece1 = new Scrounger(t.board, t.player1);
    t.initializePiece(piece1, 0, 0);
    expect(t.player1.canEndTurn()).toBe(false);

    t.performMove(piece1, 0, 1);
    expect(t.player1.canEndTurn()).toBe(false);

    t.performMove(piece1, 0, 2);
    expect(t.player1.canEndTurn()).toBe(true);
  });

  it('#canEndTurn 1 piece: 1 move, 1 overcharge', () => {
    let piece11 = new Scrounger(t.board, t.player1);
    t.initializePiece(piece11, 0, 0);

    t.performMove(piece11, 0, 1);
    // Cannot end turn because the last piece must move twice.
    expect(t.player1.canEndTurn()).toBe(false);

    t.performMoveWithOvercharge(piece11, 0, 2);
    // Still can't end turn because overcharge doesn't count.
    expect(t.player1.canEndTurn()).toBe(false);
  });

  it('#canEndTurn 1 piece: 1 move, 1 overcharge, 1 move', () => {
    let piece11 = new Scrounger(t.board, t.player1);
    t.initializePiece(piece11, 0, 0);

    t.performMove(piece11, 0, 1);
    // Cannot end turn because the last piece must move twice.
    expect(t.player1.canEndTurn()).toBe(false);

    t.performMoveWithOvercharge(piece11, 0, 2);
    // Still can't end turn because overcharge doesn't count.
    expect(t.player1.canEndTurn()).toBe(false);

    t.performMove(piece11, 0, 1);
    expect(t.player1.canEndTurn()).toBe(true);
  });

  it('#canEndTurn 1 piece: 1 move, 1 overcharge, 1 move, 1 overcharge', () => {
    let piece11 = new Scrounger(t.board, t.player1);
    t.initializePiece(piece11, 0, 0);

    t.performMove(piece11, 0, 1);
    // Cannot end turn because the last piece must move twice.
    expect(t.player1.canEndTurn()).toBe(false);

    t.performMoveWithOvercharge(piece11, 0, 2);
    // Still can't end turn because overcharge doesn't count.
    expect(t.player1.canEndTurn()).toBe(false);

    t.performMove(piece11, 0, 1);
    expect(t.player1.canEndTurn()).toBe(true);

    t.performMoveWithOvercharge(piece11, 0, 2);
    expect(t.player1.canEndTurn()).toBe(true);
  });

  it('#canEndTurn 1 piece: unable to move', () => {
    let piece11 = new Scrounger(t.board, t.player1);
    let piece21 = new Scrounger(t.board, t.player2);
    let piece22 = new Scrounger(t.board, t.player2);
    t.initializePiece(piece11, 0, 0);
    // box in the piece so it can't move
    t.initializePiece(piece21, 0, 1);
    t.initializePiece(piece22, 1, 0);

    // Confirm that the piece cannot move.
    expect(piece11.isStuck()).toBe(true);

    // Can end turn since player is stuck.
    expect(t.player1.canEndTurn()).toBe(true);
  });
});
