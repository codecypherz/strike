import { Gallop } from "../ability/gallop";
import { Direction } from "../direction";
import { DashPiece } from "../piece/dash-piece";
import { Piece } from "../piece/piece";
import { RamPiece } from "../piece/ram-piece";
import { Strength } from "../strength";

export class Grazer extends RamPiece {

  static NAME = 'Grazer';
  static IMAGE_URL = Piece.IMAGE_PATH + 'grazer.png';
  static POINTS = 1;
  static MOVEMENT = 2;
  static ATTACK = 1;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 4;

  constructor() {
    super(
      Grazer.NAME,
      Grazer.IMAGE_URL,
      Grazer.POINTS,
      Grazer.MOVEMENT,
      Grazer.ATTACK,
      Grazer.ATTACK_RANGE,
      Grazer.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.STRONG],
      [Direction.RIGHT.degrees, Strength.WEAK],
      [Direction.LEFT.degrees, Strength.WEAK],
      [Direction.DOWN.degrees, Strength.NEUTRAL]
    ]);

    this.setAbility(new Gallop(this));
  }
}
