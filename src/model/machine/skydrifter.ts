import { Piece } from "../piece/piece";
import { SwoopPiece } from "../piece/swoop-piece";

export class Skydrifter extends SwoopPiece {

  static NAME = 'Skydrifter';
  static IMAGE_URL = Piece.IMAGE_PATH + 'skydrifter.webp';
  static POINTS = 2;
  static MOVEMENT = 2;
  static ATTACK = 2;
  static ATTACK_RANGE = 3;
  static MAX_HEALTH = 6;

  constructor() {
    super(
      Skydrifter.NAME,
      Skydrifter.IMAGE_URL,
      Skydrifter.POINTS,
      Skydrifter.MOVEMENT,
      Skydrifter.ATTACK,
      Skydrifter.ATTACK_RANGE,
      Skydrifter.MAX_HEALTH);
  }
}
