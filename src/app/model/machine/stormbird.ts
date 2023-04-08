import { Sweep } from "../ability/sweep";
import { Direction } from "../direction";
import { Piece } from "../piece/piece";
import { SwoopPiece } from "../piece/swoop-piece";
import { Strength } from "../strength";

export class Stormbird extends SwoopPiece {

  static NAME = 'Stormbird';
  static IMAGE_URL = Piece.IMAGE_PATH + 'stormbird.webp';
  static POINTS = 6;
  static MOVEMENT = 3;
  static ATTACK = 3;
  static ATTACK_RANGE = 3;
  static MAX_HEALTH = 9;

  constructor() {
    super(
      Stormbird.NAME,
      Stormbird.IMAGE_URL,
      Stormbird.POINTS,
      Stormbird.MOVEMENT,
      Stormbird.ATTACK,
      Stormbird.ATTACK_RANGE,
      Stormbird.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.WEAK],
      [Direction.RIGHT.degrees, Strength.NEUTRAL],
      [Direction.LEFT.degrees, Strength.NEUTRAL],
      [Direction.DOWN.degrees, Strength.STRONG]
    ]);

    this.setAbility(new Sweep(this));
  }
}
