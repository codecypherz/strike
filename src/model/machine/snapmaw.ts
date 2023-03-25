import { Piece } from "../piece/piece";
import { PullPiece } from "../piece/pull-piece";

export class Snapmaw extends PullPiece {

  static NAME = 'Snapmaw';
  static IMAGE_URL = Piece.IMAGE_PATH + 'snapmaw.webp';
  static POINTS = 3;
  static MOVEMENT = 2;
  static ATTACK = 3;
  static ATTACK_RANGE = 3;
  static MAX_HEALTH = 7;

  constructor() {
    super(
      Snapmaw.NAME,
      Snapmaw.IMAGE_URL,
      Snapmaw.POINTS,
      Snapmaw.MOVEMENT,
      Snapmaw.ATTACK,
      Snapmaw.ATTACK_RANGE,
      Snapmaw.MAX_HEALTH);
  }
}
