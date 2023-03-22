import { TestDashPiece } from "src/test/test-dash-piece";
import { TestMeleePiece } from "src/test/test-melee-piece";
import { BaseTest } from "../../test/base-test";
import { Direction } from "../direction";
import { Position } from "../position";
import { Terrain } from "../terrain";

describe('Dash Piece', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
  });

  it('dash attack', () => {
    const piece11 = new TestDashPiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);
    expect(piece21.getDirection()).toEqual(Direction.UP);

    t.performAttack(piece11);
  
    // The piece being attacked loses health and rotates 180.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(1, 0));
    expect(piece21.getDirection()).toEqual(Direction.DOWN);

    // The attacking piece moves through the defender.
    expect(piece11.getPosition()).toEqual(Position.from(piece11.attackRange, 0));
  });

  it('dash attacks own pieces', () => {
    const piece11 = new TestDashPiece();
    const piece12 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 1, 0);
    expect(piece12.getDirection()).toEqual(Direction.DOWN);

    t.performAttack(piece11);
  
    // The piece being attacked loses health and rotates 180.
    expect(piece12.getHealth()).toBe(piece12.maxHealth - 1);
    expect(piece12.getPosition()).toEqual(Position.from(1, 0));
    expect(piece12.getDirection()).toEqual(Direction.UP);

    // The attacking piece moves through the defender.
    expect(piece11.getPosition()).toEqual(Position.from(piece11.attackRange, 0));
  });

  it('dash attacks all pieces in the path', () => {
    const piece11 = new TestDashPiece();
    const piece21 = new TestMeleePiece();
    const piece22 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);
    t.initializePiece(piece22, t.player2, 2, 0);
    expect(piece21.getDirection()).toEqual(Direction.UP);
    expect(piece22.getDirection()).toEqual(Direction.UP);

    t.performAttack(piece11);
  
    // The pieces being attacked loses health and rotates 180.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(1, 0));
    expect(piece21.getDirection()).toEqual(Direction.DOWN);
    expect(piece22.getHealth()).toBe(piece22.maxHealth - 1);
    expect(piece22.getPosition()).toEqual(Position.from(2, 0));
    expect(piece22.getDirection()).toEqual(Direction.DOWN);

    // The attacking piece moves through the defenders.
    expect(piece11.getPosition()).toEqual(Position.from(piece11.attackRange, 0));
  });

  it('dash attack with armor break', () => {
    const piece11 = new TestDashPiece();
    const piece21 = new TestMeleePiece();
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
    expect(piece11.getPosition()).toEqual(Position.from(piece11.attackRange, 0));
    // The attacking piece loses 2 damage
    //   1 for armor break
    //   1 for the collision taken after movement
    //     The dash happens first, then the KB of armor break.
    expect(piece11.getHealth()).toBe(piece11.maxHealth - 2);
  });

  it('cannot dash across chasm', () => {
    const piece11 = new TestDashPiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);

    piece11.select();
    expect(piece11.canAttack()).toBeTrue();

    t.board.getByRowCol(2, 0).terrain = Terrain.GRASSLAND;
    expect(piece11.hasConfirmableAttack()).toBeTrue();

    t.board.getByRowCol(2, 0).terrain = Terrain.CHASM;
    expect(piece11.hasConfirmableAttack()).toBeFalse();
  });

  it('cannot end dash in a chasm', () => {
    const piece11 = new TestDashPiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);

    piece11.select();
    expect(piece11.canAttack()).toBeTrue();

    t.board.getByRowCol(3, 0).terrain = Terrain.GRASSLAND;
    expect(piece11.hasConfirmableAttack()).toBeTrue();

    t.board.getByRowCol(3, 0).terrain = Terrain.CHASM;
    expect(piece11.hasConfirmableAttack()).toBeFalse();
  });

  it('cannot end dash in occupied cell', () => {
    const piece11 = new TestDashPiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 3, 1);
    t.initializePiece(piece21, t.player2, 1, 0);

    piece11.select();
    expect(piece11.canAttack()).toBeTrue();

    // piece12 is out of the way.
    expect(piece11.hasConfirmableAttack()).toBeTrue();

    // move piece12 into the way.
    piece11.deselect();
    t.performMove(piece12, 3, 0);
    
    // now the attack cannot happen because piece12 blocks the finishing cell
    piece11.select();
    expect(piece11.canAttack()).toBeTrue();
    expect(piece11.hasConfirmableAttack()).toBeFalse();
  });
});
