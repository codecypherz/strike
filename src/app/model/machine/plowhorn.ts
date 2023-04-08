import { Growth } from "../ability/growth";
import { Piece } from "../piece/piece";
import { RamPiece } from "../piece/ram-piece";

export class Plowhorn extends RamPiece {

  static NAME = 'Plowhorn';
  static IMAGE_URL = Piece.IMAGE_PATH + 'plowhorn.webp';
  static POINTS = 1;
  static MOVEMENT = 2;
  static ATTACK = 2;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 5;

  constructor() {
    super(
      Plowhorn.NAME,
      Plowhorn.IMAGE_URL,
      Plowhorn.POINTS,
      Plowhorn.MOVEMENT,
      Plowhorn.ATTACK,
      Plowhorn.ATTACK_RANGE,
      Plowhorn.MAX_HEALTH);

    this.setAbility(new Growth(this));
  }
}
