import { HighGround } from "../ability/high-ground";
import { Direction } from "../direction";
import { Piece } from "../piece/piece";
import { RamPiece } from "../piece/ram-piece";
import { Strength } from "../strength";

export class Fanghorn extends RamPiece {

  static NAME = 'Fanghorn';
  static IMAGE_URL = Piece.IMAGE_PATH + 'fanghorn.webp';
  static POINTS = 2;
  static MOVEMENT = 2;
  static ATTACK = 2;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 5;

  constructor() {
    super(
      Fanghorn.NAME,
      Fanghorn.IMAGE_URL,
      Fanghorn.POINTS,
      Fanghorn.MOVEMENT,
      Fanghorn.ATTACK,
      Fanghorn.ATTACK_RANGE,
      Fanghorn.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.STRONG],
      [Direction.RIGHT.degrees, Strength.WEAK],
      [Direction.LEFT.degrees, Strength.WEAK],
      [Direction.DOWN.degrees, Strength.NEUTRAL]
    ]);

    this.setAbility(new HighGround(this));
  }
}
