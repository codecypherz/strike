import { Board } from "../board";
import { Direction } from "../direction";
import { Scrounger } from "../machine/scrounger";
import { Player } from "../player";
import { Position } from "../position";
import { Terrain } from "../terrain";
import { Piece } from "./piece";
import { PieceTest } from "./piecetest";
import { RamPiece } from "./rampiece";

describe('Ram Piece', () => {
  let pt: PieceTest;

  beforeEach(() => {
    pt = new PieceTest();
    pt.player1.setActive(true);
    pt.board.clearTurnData();
  });

  it('ram piece into empty cell', () => {
    let piece11 = new TestRamPiece(pt.board, pt.player1);
    let piece21 = new Scrounger(pt.board, pt.player2);
    piece21.rotateClockwise();
    pt.initializePiece(piece11, 0, 0);
    pt.initializePiece(piece21, 1, 0);

    pt.performAttack(piece11);
  
    // The piece being attacked loses health and gets knocked back.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(2, 0));

    // The attacking piece moves to where the defender was.
    expect(piece11.getPosition()).toEqual(Position.from(1, 0));
  });

  it('ram piece into edge of board', () => {
    let piece11 = new TestRamPiece(pt.board, pt.player1);
    let piece21 = new Scrounger(pt.board, pt.player2);
    piece21.rotateClockwise();
    pt.initializePiece(piece11, 6, 0);
    pt.initializePiece(piece21, 7, 0);

    pt.performAttack(piece11);
  
    // The defender loses health and stays at edge.
    // The defender suffers 1 extra damage due to the edge.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 2);
    expect(piece21.getPosition()).toEqual(Position.from(7, 0));

    // The attacking piece stays where it was.
    expect(piece11.getPosition()).toEqual(Position.from(6, 0));
    // The attacking piece is not hurt.
    expect(piece11.getHealth()).toBe(piece11.maxHealth);
  });

  it('ram kills piece', () => {
    let piece11 = new TestRamPiece(pt.board, pt.player1);
    let piece21 = new Scrounger(pt.board, pt.player2);
    piece21.rotateClockwise();
    pt.initializePiece(piece11, 0, 0);
    pt.initializePiece(piece21, 1, 0);
    pt.setHealth(piece21, 1);

    pt.performAttack(piece11);
  
    // The defender dies.
    expect(piece21.isDead()).toBe(true);

    // The attacking piece takes over the defender location.
    expect(piece11.getPosition()).toEqual(Position.from(1, 0));
    // The attacking piece is not hurt.
    expect(piece11.getHealth()).toBe(piece11.maxHealth);
  });
});

class TestRamPiece extends RamPiece {
  constructor(board: Board, player: Player) {
    super(
      board,
      'Test Ram Piece',
      'image url',
      2, // points
      3, // movement
      1, // attack
      3, // attack range
      5, // health
      player);
    }
}
