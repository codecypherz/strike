import { Sweep } from "../ability/sweep";
import { Direction } from "../direction";
import { DashPiece } from "../piece/dash-piece";
import { Piece } from "../piece/piece";
import { Strength } from "../strength";

export class Thunderjaw extends DashPiece {

  static NAME = 'Thunderjaw';
  static IMAGE_URL = Piece.IMAGE_PATH + 'thunderjaw.webp';
  static POINTS = 6;
  static MOVEMENT = 3;
  static ATTACK = 3;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 10;

  constructor() {
    super(
      Thunderjaw.NAME,
      Thunderjaw.IMAGE_URL,
      Thunderjaw.POINTS,
      Thunderjaw.MOVEMENT,
      Thunderjaw.ATTACK,
      Thunderjaw.ATTACK_RANGE,
      Thunderjaw.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.STRONG],
      [Direction.RIGHT.degrees, Strength.WEAK],
      [Direction.LEFT.degrees, Strength.WEAK],
      [Direction.DOWN.degrees, Strength.STRONG]
    ]);

    this.setAbility(new Sweep(this));
  }
}
