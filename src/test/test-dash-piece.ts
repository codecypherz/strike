import { Direction } from "src/model/direction";
import { DashPiece } from "src/model/piece/dash-piece";
import { Strength } from "src/model/strength";

export class TestDashPiece extends DashPiece {
  constructor() {
    super(
      'Test Dash Piece',
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