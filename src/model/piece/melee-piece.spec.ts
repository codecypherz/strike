import { TestMeleePiece } from "src/test/test-melee-piece";
import { BaseTest } from "../../test/base-test";
import { Position } from "../position";
import { Terrain } from "../terrain";

describe('Melee Piece', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
  });

  it('basic attack', () => {
    let piece11 = new TestMeleePiece();
    let piece21 = new TestMeleePiece();
    piece21.rotateClockwise();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);

    t.performAttack(piece11);
  
    // The piece being attacked loses 1 health.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(1, 0));

    // The attacking piece is untouched.
    expect(piece11.getHealth()).toBe(piece11.maxHealth);
    expect(piece11.getPosition()).toEqual(Position.from(0, 0));
  });

  it('basic attack, armor break', () => {
    let piece11 = new TestMeleePiece();
    let piece21 = new TestMeleePiece();
    piece21.rotateClockwise();
    t.setTerrain(1, 0, Terrain.MOUNTAIN); // Ensures armor break
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);

    t.performAttack(piece11);
  
    // The piece being attacked loses 1 health due to armor break.
    // Position changed due to the knockback
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(2, 0));

    // The attacking piece takes 1 damage due to armor break
    expect(piece11.getHealth()).toBe(piece11.maxHealth - 1);
    expect(piece11.getPosition()).toEqual(Position.from(0, 0));
  });

  it('can attack in range', () => {
    let piece11 = new TestMeleePiece();
    let piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);

    expect(piece11.hasConfirmableAttack()).toBeTrue();
  });

  it('cannot attack out of range', () => {
    let piece11 = new TestMeleePiece();
    let piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 2, 0);

    expect(piece11.hasConfirmableAttack()).toBeFalse();
  });
});
