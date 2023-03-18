import { BaseTest } from "../../test/basetest";
import { Scrounger } from "../machine/scrounger";
import { Position } from "../position";
import { Terrain } from "../terrain";
import { PullPiece } from "./pullpiece";

describe('Pull Piece', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
    t.player1.setActive(true);
    t.board.clearTurnData();
  });

  it('basic attack', () => {
    let piece11 = new TestPullPiece();
    let piece21 = new Scrounger();
    piece21.rotateClockwise();
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 3, 0);

    t.performAttack(piece11);
  
    // The piece being attacked loses 1 health and gets pulled 1 space.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(2, 0));
  });

  it('basic attack, kills target', () => {
    let piece11 = new TestPullPiece();
    let piece21 = new Scrounger();
    piece21.rotateClockwise();
    t.setHealth(piece21, 1);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 3, 0);

    t.performAttack(piece11);
  
    // The piece being attacked dies.
    expect(piece21.isDead()).toBeTrue();
  });

  it('basic attack, makes collision', () => {
    let piece11 = new TestPullPiece();
    let piece21 = new Scrounger();
    piece21.rotateClockwise();
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 1, 0);

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
    let piece21 = new Scrounger();
    t.setHealth(piece21, 2);
    piece21.rotateClockwise();
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 1, 0);

    t.performAttack(piece11);
  
    // The piece being attacked dies
    expect(piece21.isDead()).toBeTrue();

    // The pulling piece loses 1 health for the collision.
    expect(piece11.getHealth()).toBe(piece11.maxHealth - 1);
  });

  it('pull overrides armor break', () => {
    let piece11 = new TestPullPiece();
    let piece21 = new Scrounger();
    piece21.rotateClockwise();
    t.setTerrain(3, 0, Terrain.MOUNTAIN); // Ensures armor break
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 3, 0);

    t.performAttack(piece11);
  
    // The piece being attacked loses 1 health and gets pulled 1 space.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(2, 0));
  });

  it('pull into valid cell', () => {
    let piece11 = new TestPullPiece();
    let piece21 = new Scrounger();
    t.setTerrain(1, 0, Terrain.FOREST);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 2, 0);

    expect(piece11.hasConfirmableAttack()).toBeTrue();
  });

  it('pull into invalid cell', () => {
    let piece11 = new TestPullPiece();
    let piece21 = new Scrounger();
    t.setTerrain(1, 0, Terrain.CHASM);
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 2, 0);

    expect(piece11.hasConfirmableAttack()).toBeFalse();
  });
});

class TestPullPiece extends PullPiece {
  constructor() {
    super(
      'Test Pull Piece',
      'image url',
      2,  // points
      3,  // movement
      1,  // attack
      3,  // attack range
      5); // health
    }
}
