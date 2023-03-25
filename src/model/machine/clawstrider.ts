import { MeleePiece } from "../piece/melee-piece";
import { Piece } from "../piece/piece";

export class Clawstrider extends MeleePiece {

  static NAME = 'Clawstrider';
  static IMAGE_URL = Piece.IMAGE_PATH + 'clawstrider.webp';
  static POINTS = 3;
  static MOVEMENT = 2;
  static ATTACK = 3;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 8;

  constructor() {
    super(
      Clawstrider.NAME,
      Clawstrider.IMAGE_URL,
      Clawstrider.POINTS,
      Clawstrider.MOVEMENT,
      Clawstrider.ATTACK,
      Clawstrider.ATTACK_RANGE,
      Clawstrider.MAX_HEALTH);
  }
}
