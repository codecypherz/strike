import { Board } from "../board";
import { Direction } from "../direction";
import { Scrounger } from "../machine/scrounger";
import { Player } from "../player";
import { Position } from "../position";
import { Terrain } from "../terrain";
import { DashPiece } from "./dashpiece";
import { BaseTest } from "../../test/basetest";

describe('Dash Piece', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
    t.player1.setActive(true);
    t.board.clearTurnData();
  });

  it('dash attack', () => {
    let piece11 = new TestDashPiece(t.board, t.player1);
    let piece21 = new Scrounger(t.board, t.player2);
    piece21.rotateClockwise();
    expect(piece21.getDirection()).toEqual(Direction.RIGHT);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 1, 0);

    t.performAttack(piece11);
  
    // The piece being attacked loses health and rotates 180.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(1, 0));
    expect(piece21.getDirection()).toEqual(Direction.LEFT);

    // The attacking piece moves through the defender.
    expect(piece11.getPosition()).toEqual(Position.from(2, 0));
  });

  it('dash attack with armor break', () => {
    let piece11 = new TestDashPiece(t.board, t.player1);
    let piece21 = new Scrounger(t.board, t.player2);
    expect(piece21.getDirection()).toEqual(Direction.UP);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 1, 0);
    t.setTerrain(1, 0, Terrain.FOREST); // This makes attack and defense a tie.

    t.performAttack(piece11);
  
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
