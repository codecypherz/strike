import { TestDashPiece } from "src/test/test-dash-piece";
import { TestMeleePiece } from "src/test/test-melee-piece";
import { BaseTest } from "../../test/basetest";
import { Direction } from "../direction";
import { Position } from "../position";
import { Terrain } from "../terrain";

describe('Dash Piece', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
  });

  it('dash attack', () => {
    let piece11 = new TestDashPiece();
    let piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);
    expect(piece21.getDirection()).toEqual(Direction.UP);

    t.performAttack(piece11);
  
    // The piece being attacked loses health and rotates 180.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(1, 0));
    expect(piece21.getDirection()).toEqual(Direction.DOWN);

    // The attacking piece moves through the defender.
    expect(piece11.getPosition()).toEqual(Position.from(2, 0));
  });

  it('dash attack with armor break', () => {
    let piece11 = new TestDashPiece();
    let piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);
    t.setTerrain(1, 0, Terrain.FOREST); // This makes attack and defense a tie.
    expect(piece21.getDirection()).toEqual(Direction.UP);

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
