import { Board } from "../board";
import { Direction } from "../direction";
import { Scrounger } from "../machine/scrounger";
import { Player } from "../player";
import { Position } from "../position";
import { DashPiece } from "./dashpiece";
import { PieceTest } from "./piecetest";

describe('Dash Piece', () => {
  let pt: PieceTest;

  beforeEach(() => {
    pt = new PieceTest();
    pt.player1.setActive(true);
    pt.board.clearTurnData();
  });

  it('dash attack', () => {
    let piece11 = new TestDashPiece(pt.board, pt.player1);
    let piece21 = new Scrounger(pt.board, pt.player2);
    piece21.rotateClockwise();
    expect(piece21.getDirection()).toBe(Direction.RIGHT);
    pt.initializePiece(piece11, 0, 0);
    pt.initializePiece(piece21, 1, 0);

    pt.performAttack(piece11);
  
    // The piece being attacked loses health and rotates 180.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(1, 0));
    expect(piece21.getDirection()).toBe(Direction.LEFT);

    // The attacking piece moves through the defender.
    expect(piece11.getPosition()).toEqual(Position.from(2, 0));
  });
});

class TestDashPiece extends DashPiece {
  constructor(board: Board, player: Player) {
    super(
      board,
      'Test Dash Piece',
      'image url',
      2, // points
      3, // movement
      1, // attack
      2, // attack range
      5, // health
      player);
    }
}
