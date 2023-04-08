import { Direction } from "../direction";
import { Piece } from "../piece/piece";
import { PullPiece } from "../piece/pull-piece";
import { Strength } from "../strength";

export class Shellsnapper extends PullPiece {

  static NAME = 'Shellsnapper';
  static IMAGE_URL = Piece.IMAGE_PATH + 'shellsnapper.webp';
  static POINTS = 6;
  static MOVEMENT = 2;
  static ATTACK = 3;
  static ATTACK_RANGE = 3;
  static MAX_HEALTH = 10;

  constructor() {
    super(
      Shellsnapper.NAME,
      Shellsnapper.IMAGE_URL,
      Shellsnapper.POINTS,
      Shellsnapper.MOVEMENT,
      Shellsnapper.ATTACK,
      Shellsnapper.ATTACK_RANGE,
      Shellsnapper.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.WEAK],
      [Direction.RIGHT.degrees, Strength.STRONG],
      [Direction.LEFT.degrees, Strength.STRONG],
      [Direction.DOWN.degrees, Strength.STRONG]
    ]);
  }
}
