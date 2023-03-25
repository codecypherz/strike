import { Direction } from "../direction";
import { Piece } from "../piece/piece";
import { PullPiece } from "../piece/pull-piece";
import { Strength } from "../strength";

export class Tideripper extends PullPiece {

  static NAME = 'Tideripper';
  static IMAGE_URL = Piece.IMAGE_PATH + 'tideripper.webp';
  static POINTS = 6;
  static MOVEMENT = 2;
  static ATTACK = 4;
  static ATTACK_RANGE = 3;
  static MAX_HEALTH = 10;

  constructor() {
    super(
      Tideripper.NAME,
      Tideripper.IMAGE_URL,
      Tideripper.POINTS,
      Tideripper.MOVEMENT,
      Tideripper.ATTACK,
      Tideripper.ATTACK_RANGE,
      Tideripper.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.NEUTRAL],
      [Direction.RIGHT.degrees, Strength.STRONG],
      [Direction.LEFT.degrees, Strength.STRONG],
      [Direction.DOWN.degrees, Strength.WEAK]
    ]);
  }
}
