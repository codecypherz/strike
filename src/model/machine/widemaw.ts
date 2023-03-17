import { Piece } from "../piece/piece";
import { PullPiece } from "../piece/pullpiece";

export class Widemaw extends PullPiece {

  static NAME = 'Widemaw';
  static IMAGE_URL = Piece.IMAGE_PATH + 'widemaw.jpg';
  static POINTS = 3;
  static MOVEMENT = 2;
  static ATTACK = 3;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 7;

  constructor() {
    super(
      Widemaw.NAME,
      Widemaw.IMAGE_URL,
      Widemaw.POINTS,
      Widemaw.MOVEMENT,
      Widemaw.ATTACK,
      Widemaw.ATTACK_RANGE,
      Widemaw.MAX_HEALTH);
  }
}
