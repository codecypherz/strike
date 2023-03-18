import { Board } from "../board";
import { Direction } from "../direction";
import { Scrounger } from "../machine/scrounger";
import { Player } from "../player";
import { Position } from "../position";
import { Piece } from "./piece";

describe('Piece', () => {
  let player1: Player;
  let player2: Player;
  let board: Board;
  let piece11: Piece;
  let piece12: Piece;
  let piece21: Piece;

  beforeEach(() => {
    board = new Board();

    player1 = new Player(true, 'Player 1', Direction.DOWN);
    player1.setActive(true);
    piece11 = new Scrounger();
    piece12 = new Scrounger();

    player2 = new Player(false, 'Player 2', Direction.UP);
    piece21 = new Scrounger();
    
    initializePiece(piece11, 0, 0);
    initializePiece(piece12, 0, 1);
    initializePiece(piece21, 7, 7);
    board.clearTurnData();

    // Important assumptions for all tests.
    expect(player1.isLastPiece(piece11)).toBe(false);
    expect(player1.isLastPiece(piece12)).toBe(false);
    expect(player2.isLastPiece(piece21)).toBe(true);
  });

  it('#canRotate no action taken', () => {
    expect(piece11.canRotate()).toBe(true);
  });

  it('#canRotate not active player turn', () => {
    expect(piece11.canRotate()).toBe(true);
    expect(piece21.canRotate()).toBe(false);
  });

  it('#canRotate before move but after attack', () => {
    movePieceTo(piece11, 0, 0);
    movePieceTo(piece21, 1, 0);
    
    expect(piece11.canMove()).toBe(true);
    expect(piece11.canAttack()).toBe(true);
    expect(piece11.canRotate()).toBe(true);

    piece11.select();
    expect(piece11.hasConfirmableAttack()).toBe(true);

    board.clearStagedAttackData();
    piece11.attack();
    piece11.deselect();

    expect(piece11.canMove()).toBe(true);
    expect(piece11.canAttack()).toBe(false);
    expect(piece11.canRotate()).toBe(false);
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
