import { Burn } from "../ability/burn";
import { Freeze } from "../ability/freeze";
import { Direction } from "../direction";
import { MeleePiece } from "../piece/melee-piece";
import { Piece } from "../piece/piece";
import { Strength } from "../strength";

export class Frostclaw extends MeleePiece {

  static NAME = 'Frostclaw';
  static IMAGE_URL = Piece.IMAGE_PATH + 'frostclaw.webp';
  static POINTS = 7;
  static MOVEMENT = 2;
  static ATTACK = 4;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 10;

  constructor() {
    super(
      Frostclaw.NAME,
      Frostclaw.IMAGE_URL,
      Frostclaw.POINTS,
      Frostclaw.MOVEMENT,
      Frostclaw.ATTACK,
      Frostclaw.ATTACK_RANGE,
      Frostclaw.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.WEAK],
      [Direction.RIGHT.degrees, Strength.STRONG],
      [Direction.LEFT.degrees, Strength.STRONG],
      [Direction.DOWN.degrees, Strength.NEUTRAL]
    ]);

    this.setAbility(new Freeze(this));
  }
}
