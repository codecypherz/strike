import { Board } from "./board";
import { Direction } from "./direction";
import { Scrounger } from "./machine/scrounger";
import { Piece } from "./piece/piece";
import { Player } from "./player";
import { Position } from "./position";

describe('Player', () => {
  let board: Board;
  let player1: Player;
  let player2: Player;
  beforeEach(() => {
    board = new Board();
    player1 = new Player('player-1', 'Player One', Direction.DOWN);
    player2 = new Player('player-2', 'Player Two', Direction.UP);
    player1.setActive(true);
  });

  it('#canEndTurn 1 piece no action taken', () => {
    let piece1 = new Scrounger(board, player1);
    initializePiece(piece1, 0, 0);
    expect(player1.canEndTurn()).toBe(false);
  });

  it('#canEndTurn 1 piece 1 action taken', () => {
    let piece1 = new Scrounger(board, player1);
    initializePiece(piece1, 0, 0);
    expect(player1.canEndTurn()).toBe(false);

    piece1.select();
    piece1.moveOrSprintTo(board.getByRowCol(0, 1));
    expect(piece1.hasConfirmableMove()).toBe(true);
    piece1.confirmMove();
    piece1.deselect();
    expect(player1.canEndTurn()).toBe(false);
  });

  it('#canEndTurn 1 piece 2 actions taken', () => {
    let piece1 = new Scrounger(board, player1);
    initializePiece(piece1, 0, 0);
    expect(player1.canEndTurn()).toBe(false);

    piece1.select();
    piece1.moveOrSprintTo(board.getByRowCol(0, 1));
    expect(piece1.hasConfirmableMove()).toBe(true);
    piece1.confirmMove();
    piece1.deselect();
    expect(player1.canEndTurn()).toBe(false);

    piece1.select();
    piece1.moveOrSprintTo(board.getByRowCol(0, 2));
    expect(piece1.hasConfirmableMove()).toBe(true);
    piece1.confirmMove();
    piece1.deselect();
    expect(player1.canEndTurn()).toBe(true);
  });

  it('#canEndTurn 2 pieces no action taken', () => {
    let piece1 = new Scrounger(board, player1);
    let piece2 = new Scrounger(board, player1);
    initializePiece(piece1, 0, 2);
    initializePiece(piece2, 0, 4);
    expect(player1.canEndTurn()).toBe(false);
  });

  it('#canEndTurn 2 pieces 1 action taken', () => {
    let piece1 = new Scrounger(board, player1);
    let piece2 = new Scrounger(board, player1);
    initializePiece(piece1, 0, 2);
    initializePiece(piece2, 0, 4);

    piece1.select();
    piece1.moveOrSprintTo(board.getByRowCol(0, 1));
    expect(piece1.hasConfirmableMove()).toBe(true);
    piece1.confirmMove();
    piece1.deselect();
    expect(player1.canEndTurn()).toBe(false);
  });

  it('#canEndTurn 2 pieces 2 actions taken', () => {
    let piece1 = new Scrounger(board, player1);
    let piece2 = new Scrounger(board, player1);
    initializePiece(piece1, 0, 2);
    initializePiece(piece2, 0, 4);

    piece1.select();
    piece1.moveOrSprintTo(board.getByRowCol(0, 1));
    expect(piece1.hasConfirmableMove()).toBe(true);
    piece1.confirmMove();
    piece1.deselect();
    expect(player1.canEndTurn()).toBe(false);

    piece2.select();
    piece2.moveOrSprintTo(board.getByRowCol(0, 3));
    expect(piece2.hasConfirmableMove()).toBe(true);
    piece2.confirmMove();
    piece2.deselect();
    expect(player1.canEndTurn()).toBe(true);
  });

  it('#canEndTurn 1 piece unable to move', () => {
    let piece11 = new Scrounger(board, player1);
    let piece21 = new Scrounger(board, player2);
    let piece22 = new Scrounger(board, player2);
    initializePiece(piece11, 0, 0);
    // box in the piece so it can't move
    initializePiece(piece21, 0, 1);
    initializePiece(piece22, 1, 0);

    // Confirm that the piece cannot move.
    expect(piece11.isStuck()).toBe(true);

    // Can end turn since player is stuck.
    expect(player1.canEndTurn()).toBe(true);
  });

  it('#canEndTurn 1 piece 1 move 1 overcharge', () => {
    let piece11 = new Scrounger(board, player1);
    initializePiece(piece11, 0, 0);

    piece11.select();
    piece11.moveOrSprintTo(board.getByRowCol(0, 1));
    expect(piece11.hasConfirmableMove()).toBe(true);
    piece11.confirmMove();
    piece11.deselect();
    // Cannot end turn because the last piece must move twice.
    expect(player1.canEndTurn()).toBe(false);

    piece11.select();
    piece11.overcharge();
    piece11.moveOrSprintTo(board.getByRowCol(0, 2));
    expect(piece11.hasConfirmableMove()).toBe(true);
    piece11.confirmMove();
    piece11.deselect();

    // Still can't end turn because overcharge doesn't count.
    expect(player1.canEndTurn()).toBe(false);
  });

  function initializePiece(piece: Piece, row: number, col: number) {
    board.getByRowCol(row, col).setPiece(piece);
    piece.position = new Position(row, col);
    piece.stageAction();
  }
});
