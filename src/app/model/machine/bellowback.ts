import { Spray } from "../ability/spray";
import { Direction } from "../direction";
import { GunnerPiece } from "../piece/gunner-piece";
import { Piece } from "../piece/piece";
import { Strength } from "../strength";

export class Bellowback extends GunnerPiece {

  static NAME = 'Bellowback';
  static IMAGE_URL = Piece.IMAGE_PATH + 'bellowback.webp';
  static POINTS = 3;
  static MOVEMENT = 2;
  static ATTACK = 3;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 7;

  constructor() {
    super(
      Bellowback.NAME,
      Bellowback.IMAGE_URL,
      Bellowback.POINTS,
      Bellowback.MOVEMENT,
      Bellowback.ATTACK,
      Bellowback.ATTACK_RANGE,
      Bellowback.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.STRONG],
      [Direction.RIGHT.degrees, Strength.WEAK],
      [Direction.LEFT.degrees, Strength.WEAK],
      [Direction.DOWN.degrees, Strength.WEAK]
    ]);

    this.setAbility(new Spray(this));
  }
}
