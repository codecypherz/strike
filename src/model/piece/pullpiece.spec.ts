import { TestMeleePiece } from "src/test/test-melee-piece";
import { TestPullPiece } from "src/test/test-pull-piece";
import { BaseTest } from "../../test/basetest";
import { Position } from "../position";
import { Terrain } from "../terrain";

describe('Pull Piece', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
  });

  it('basic attack', () => {
    let piece11 = new TestPullPiece();
    let piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 3, 0);

    t.performAttack(piece11);
  
    // The piece being attacked loses 1 health and gets pulled 1 space.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(2, 0));
  });

  it('basic attack, kills target', () => {
    let piece11 = new TestPullPiece();
    let piece21 = new TestMeleePiece();
    t.setHealth(piece21, 1);
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 3, 0);

    t.performAttack(piece11);
  
    // The piece being attacked dies.
    expect(piece21.isDead()).toBeTrue();
  });

  it('basic attack, makes collision', () => {
    let piece11 = new TestPullPiece();
    let piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);

    t.performAttack(piece11);
  
    // The piece being attacked loses 2 health
    // 1 for the attack
    // 1 for the collision
    // Position does not change
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 2);
    expect(piece21.getPosition()).toEqual(Position.from(1, 0));

    // The pulling piece loses 1 health for the collision.
    expect(piece11.getHealth()).toBe(piece11.maxHealth - 1);
    expect(piece11.getPosition()).toEqual(Position.from(0, 0));
  });

  it('basic attack, makes collision, kills target', () => {
    let piece11 = new TestPullPiece();
    let piece21 = new TestMeleePiece();
    t.setHealth(piece21, 2);
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);

    t.performAttack(piece11);
  
    // The piece being attacked dies
    expect(piece21.isDead()).toBeTrue();

    // The pulling piece loses 1 health for the collision.
    expect(piece11.getHealth()).toBe(piece11.maxHealth - 1);
  });

  it('pull overrides armor break', () => {
    let piece11 = new TestPullPiece();
    let piece21 = new TestMeleePiece();
    t.setTerrain(3, 0, Terrain.MOUNTAIN); // Ensures armor break
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 3, 0);

    t.performAttack(piece11);
  
    // The piece being attacked loses 1 health and gets pulled 1 space.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(2, 0));
  });

  it('pull into valid cell', () => {
    let piece11 = new TestPullPiece();
    let piece21 = new TestMeleePiece();
    t.setTerrain(1, 0, Terrain.FOREST);
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 2, 0);

    expect(piece11.hasConfirmableAttack()).toBeTrue();
  });

  it('pull into invalid cell', () => {
    let piece11 = new TestPullPiece();
    let piece21 = new TestMeleePiece();
    t.setTerrain(1, 0, Terrain.CHASM);
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 2, 0);

    expect(piece11.hasConfirmableAttack()).toBeFalse();
  });
});
