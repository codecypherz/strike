import { Direction } from "src/model/direction";
import { RamPiece } from "src/model/piece/rampiece";
import { Strength } from "src/model/strength";

export class TestRamPiece extends RamPiece {
  constructor() {
    super(
      'Test Ram Piece',
      'image url',
      2,   // points
      3,   // movement
      1,   // attack
      3,   // attack range
      5,); // health

      this.sideStrengths = new Map<number, Strength>([
        [Direction.UP.degrees, Strength.NEUTRAL],
        [Direction.RIGHT.degrees, Strength.NEUTRAL],
        [Direction.LEFT.degrees, Strength.NEUTRAL],
        [Direction.DOWN.degrees, Strength.NEUTRAL]
      ]);
    }
}