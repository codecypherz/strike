import { Direction } from "../direction";
import { Piece } from "../piece/piece";
import { SwoopPiece } from "../piece/swoop-piece";
import { Strength } from "../strength";

export class Sunwing extends SwoopPiece {

  static NAME = 'Sunwing';
  static IMAGE_URL = Piece.IMAGE_PATH + 'sunwing.webp';
  static POINTS = 3;
  static MOVEMENT = 3;
  static ATTACK = 3;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 7;

  constructor() {
    super(
      Sunwing.NAME,
      Sunwing.IMAGE_URL,
      Sunwing.POINTS,
      Sunwing.MOVEMENT,
      Sunwing.ATTACK,
      Sunwing.ATTACK_RANGE,
      Sunwing.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.WEAK],
      [Direction.RIGHT.degrees, Strength.NEUTRAL],
      [Direction.LEFT.degrees, Strength.NEUTRAL],
      [Direction.DOWN.degrees, Strength.STRONG]
    ]);
  }
}
