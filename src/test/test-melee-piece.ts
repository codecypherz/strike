import { Direction } from "src/model/direction";
import { MeleePiece } from "src/model/piece/meleepiece";
import { Strength } from "src/model/strength";

export class TestMeleePiece extends MeleePiece {
  constructor() {
    super(
      'Test Melee Piece',
      'image url',
      2,   // points
      3,   // movement
      1,   // attack
      1,   // attack range
      5,); // health

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.NEUTRAL],
      [Direction.RIGHT.degrees, Strength.NEUTRAL],
      [Direction.LEFT.degrees, Strength.NEUTRAL],
      [Direction.DOWN.degrees, Strength.NEUTRAL]
    ]);
  }
}