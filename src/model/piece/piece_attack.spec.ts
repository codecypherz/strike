import { Board } from "../board";
import { Direction } from "../direction";
import { Scrounger } from "../machine/scrounger";
import { Player } from "../player";
import { Position } from "../position";
import { Piece } from "./piece";

describe('Piece Attack', () => {
  let player1: Player;
  let player2: Player;
  let board: Board;
  let piece11: Piece;
  let piece12: Piece;
  let piece21: Piece;

  beforeEach(() => {
    board = new Board();

    player1 = new Player('player-1', 'Player 1', Direction.DOWN);
    player1.setActive(true);
    piece11 = new Scrounger(board, player1);
    piece12 = new Scrounger(board, player1);

    player2 = new Player('player-2', 'Player 2', Direction.UP);
    piece21 = new Scrounger(board, player2);
    
    initializePiece(piece11, 0, 0);
    initializePiece(piece12, 0, 1);
    initializePiece(piece21, 7, 7);
    board.clearTurnData();

    // Important assumptions for all tests.
    expect(player1.isLastPiece(piece11)).toBe(false);
    expect(player1.isLastPiece(piece12)).toBe(false);
    expect(player2.isLastPiece(piece21)).toBe(true);
  });

  it('#canAttack no action taken', () => {
    expect(piece11.canAttack()).toBe(true);
  });

  it('#canAttack not active player turn', () => {
    expect(piece11.canAttack()).toBe(true);
    expect(piece21.canAttack()).toBe(false);
  });

  it('#canAttack with staged sprint', () => {
    movePieceTo(piece11, 0, 0);
    movePieceTo(piece21, 5, 0); // Move just outside of sprint range
    
    expect(piece11.canMove()).toBe(true);
    expect(piece11.canAttack()).toBe(true);
    expect(piece11.hasConfirmableAttack()).toBe(false);
    expect(piece11.stagedSprint).toBe(false);

    piece11.select();
    expect(piece11.hasConfirmableAttack()).toBe(false);

    piece11.moveOrSprintTo(board.getByRowCol(4, 0));
    expect(piece11.stagedSprint).toBe(true);
    expect(piece11.hasConfirmableAttack()).toBe(false);
  });

  function initializePiece(piece: Piece, row: number, col: number) {
    board.getByRowCol(row, col).setPiece(piece);
    piece.position = new Position(row, col);
    piece.stageAction();
  }

  function movePieceTo(piece: Piece, row: number, col: number) {
    board.getCell(piece.position).clearPiece();
    board.getByRowCol(row, col).setPiece(piece);
    piece.position = new Position(row, col);
  }
});
