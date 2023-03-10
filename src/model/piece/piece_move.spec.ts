import { Board } from "../board";
import { Direction } from "../direction";
import { Scrounger } from "../machine/scrounger";
import { Player } from "../player";
import { Position } from "../position";
import { Piece } from "./piece";

describe('Piece Move', () => {
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

  it('#canMove no action taken', () => {
    expect(piece11.canMove()).toBe(true);
  });

  it('#canMove not active player turn', () => {
    expect(piece11.canMove()).toBe(true);
    expect(piece21.canMove()).toBe(false);
  });

  it('#canMove last piece', () => {
    setActive(player2);
    expect(piece21.canMove()).toBe(true);
  });

  it('#canMove last piece 1 move', () => {
    setActive(player2);
    expect(piece21.canMove()).toBe(true);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 6));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    // Can move a second time with last piece.
    expect(piece21.canMove()).toBe(true);
  });

  it('#canMove last piece 2 moves', () => {
    setActive(player2);
    expect(piece21.canMove()).toBe(true);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 6));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canMove()).toBe(true);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 5));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();

    expect(piece21.canMove()).toBe(false);
  });

  it('#canMove last piece 1 move 1 overcharge move', () => {
    setActive(player2);
    expect(piece21.canMove()).toBe(true);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 6));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();

    piece21.select();
    piece21.overcharge();
    piece21.moveOrSprintTo(board.getByRowCol(7, 5));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();

    // Can still do a second, regular move.
    expect(piece21.canMove()).toBe(true);
  });

  function initializePiece(piece: Piece, row: number, col: number) {
    board.getByRowCol(row, col).setPiece(piece);
    piece.position = new Position(row, col);
    piece.stageAction();
  }

  function setActive(player: Player) {
    player1.setActive(false);
    player2.setActive(false);
    player.setActive(true);
  }
});
