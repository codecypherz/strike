import { TestMeleePiece } from "src/test/test-melee-piece";
import { BaseTest } from "../../test/basetest";
import { Position } from "../position";
import { SwoopPiece } from "./swooppiece";

describe('Swoop Piece', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
  });

  it('basic attack', () => {
    let piece11 = new TestSwoopPiece();
    let piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 3, 0);

    t.performAttack(piece11);
  
    // The piece being attacked loses health.
    // 1 health for attack power
    // 1 health for the +1 terrain bonus
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 2);
    expect(piece21.getPosition()).toEqual(Position.from(3, 0));

    // The attacking piece moves next to piece being attacked.
    expect(piece11.getPosition()).toEqual(Position.from(2, 0));
  });
});

class TestSwoopPiece extends SwoopPiece {
  constructor() {
    super(
      'Test Swoop Piece',
      'image url',
      2,  // points
      3,  // movement
      1,  // attack
      3,  // attack range
      5); // health
    }
}
