import { Direction } from "../model/direction";
import { SwoopPiece } from "../model/piece/swoop-piece";
import { Strength } from "../model/strength";

export class TestSwoopPiece extends SwoopPiece {
  constructor() {
    super(
      'Test Swoop Piece',
      'image url',
      2,  // points
      3,  // movement
      1,  // attack
      3,  // attack range
      5); // health

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.NEUTRAL],
      [Direction.RIGHT.degrees, Strength.NEUTRAL],
      [Direction.LEFT.degrees, Strength.NEUTRAL],
      [Direction.DOWN.degrees, Strength.NEUTRAL]
    ]);
  }
}