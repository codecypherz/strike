import { BaseTest } from "../../test/basetest";
import { Board } from "../board";
import { Scrounger } from "../machine/scrounger";
import { Player } from "../player";
import { Position } from "../position";
import { Terrain } from "../terrain";
import { MeleePiece } from "./meleepiece";
import { SwoopPiece } from "./swooppiece";

describe('Melee Piece', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
    t.player1.setActive(true);
    t.board.clearTurnData();
  });

  it('basic attack', () => {
    let piece11 = new TestMeleePiece();
    let piece21 = new Scrounger();
    piece21.rotateClockwise();
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 1, 0);

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
    let piece21 = new Scrounger();
    piece21.rotateClockwise();
    t.setTerrain(1, 0, Terrain.MOUNTAIN); // Ensures armor break
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 1, 0);

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
    let piece21 = new Scrounger();
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 1, 0);

    expect(piece11.hasConfirmableAttack()).toBeTrue();
  });

  it('cannot attack out of range', () => {
    let piece11 = new TestMeleePiece();
    let piece21 = new Scrounger();
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 2, 0);

    expect(piece11.hasConfirmableAttack()).toBeFalse();
  });
});

class TestMeleePiece extends MeleePiece {
  constructor() {
    super(
      'Test Melee Piece',
      'image url',
      2,  // points
      3,  // movement
      1,  // attack
      1,  // attack range
      5); // health
    }
}
