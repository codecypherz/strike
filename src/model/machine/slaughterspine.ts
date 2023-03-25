import { Spray } from "../ability/spray";
import { Direction } from "../direction";
import { MeleePiece } from "../piece/melee-piece";
import { Piece } from "../piece/piece";
import { Strength } from "../strength";

export class Slaughterspine extends MeleePiece {

  static NAME = 'Slaughter Spine';
  static IMAGE_URL = Piece.IMAGE_PATH + 'slaughterspine.webp';
  static POINTS = 10;
  static MOVEMENT = 2;
  static ATTACK = 4;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 15;

  constructor() {
    super(
      Slaughterspine.NAME,
      Slaughterspine.IMAGE_URL,
      Slaughterspine.POINTS,
      Slaughterspine.MOVEMENT,
      Slaughterspine.ATTACK,
      Slaughterspine.ATTACK_RANGE,
      Slaughterspine.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.STRONG],
      [Direction.RIGHT.degrees, Strength.WEAK],
      [Direction.LEFT.degrees, Strength.WEAK],
      [Direction.DOWN.degrees, Strength.NEUTRAL]
    ]);

    this.setAbility(new Spray(this));
  }
}
