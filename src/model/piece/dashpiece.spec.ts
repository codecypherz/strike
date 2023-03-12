import { Board } from "../board";
import { Direction } from "../direction";
import { Scrounger } from "../machine/scrounger";
import { Player } from "../player";
import { Position } from "../position";
import { Terrain } from "../terrain";
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
    expect(piece21.getDirection()).toEqual(Direction.RIGHT);
    pt.initializePiece(piece11, 0, 0);
    pt.initializePiece(piece21, 1, 0);

    pt.performAttack(piece11);
  
    // The piece being attacked loses health and rotates 180.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(1, 0));
    expect(piece21.getDirection()).toEqual(Direction.LEFT);

    // The attacking piece moves through the defender.
    expect(piece11.getPosition()).toEqual(Position.from(2, 0));
  });

  it('dash attack with armor break', () => {
    let piece11 = new TestDashPiece(pt.board, pt.player1);
    let piece21 = new Scrounger(pt.board, pt.player2);
    expect(piece21.getDirection()).toEqual(Direction.UP);
    pt.initializePiece(piece11, 0, 0);
    pt.initializePiece(piece21, 1, 0);
    pt.setTerrain(1, 0, Terrain.FOREST); // This makes attack and defense a tie.

    pt.performAttack(piece11);
  
    // The piece being attacked loses 2 health and rotates 180.
    // The extra damage comes from armor break.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 2);
    expect(piece21.getPosition()).toEqual(Position.from(1, 0));
    expect(piece21.getDirection()).toEqual(Direction.DOWN);

    // The attacking piece moves through the defender.
    expect(piece11.getPosition()).toEqual(Position.from(2, 0));
    // The attacking piece loses 2 damage
    //   1 for armor break
    //   1 for the collision taken after movement
    //     The dash happens first, then the KB of armor break.
    expect(piece11.getHealth()).toBe(piece11.maxHealth - 2);
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
