import { Retaliate } from "../ability/retaliate";
import { Direction } from "../direction";
import { MeleePiece } from "../piece/melee-piece";
import { Piece } from "../piece/piece";
import { Strength } from "../strength";

export class Rollerback extends MeleePiece {

  static NAME = 'Rollerback';
  static IMAGE_URL = Piece.IMAGE_PATH + 'rollerback.jpg';
  static POINTS = 4;
  static MOVEMENT = 3;
  static ATTACK = 3;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 5;

  constructor() {
    super(
      Rollerback.NAME,
      Rollerback.IMAGE_URL,
      Rollerback.POINTS,
      Rollerback.MOVEMENT,
      Rollerback.ATTACK,
      Rollerback.ATTACK_RANGE,
      Rollerback.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.STRONG],
      [Direction.RIGHT.degrees, Strength.STRONG],
      [Direction.LEFT.degrees, Strength.STRONG],
      [Direction.DOWN.degrees, Strength.WEAK]
    ]);

    this.setAbility(new Retaliate(this));
  }
}
