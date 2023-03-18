import { DashPiece } from "../piece/dashpiece";
import { Piece } from "../piece/piece";

export class Slitherfang extends DashPiece {

  static NAME = 'Slitherfang';
  static IMAGE_URL = Piece.IMAGE_PATH + 'slitherfang.webp';
  static POINTS = 9;
  static MOVEMENT = 2;
  static ATTACK = 4;
  static ATTACK_RANGE = 3;
  static MAX_HEALTH = 12;

  constructor() {
    super(
      Slitherfang.NAME,
      Slitherfang.IMAGE_URL,
      Slitherfang.POINTS,
      Slitherfang.MOVEMENT,
      Slitherfang.ATTACK,
      Slitherfang.ATTACK_RANGE,
      Slitherfang.MAX_HEALTH);
  }
}
