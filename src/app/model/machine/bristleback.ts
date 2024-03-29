import { Spray } from "../ability/spray";
import { Piece } from "../piece/piece";
import { RamPiece } from "../piece/ram-piece";

export class Bristleback extends RamPiece {

  static NAME = 'Bristleback';
  static IMAGE_URL = Piece.IMAGE_PATH + 'bristleback.webp';
  static POINTS = 2;
  static MOVEMENT = 3;
  static ATTACK = 2;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 4;

  constructor() {
    super(
      Bristleback.NAME,
      Bristleback.IMAGE_URL,
      Bristleback.POINTS,
      Bristleback.MOVEMENT,
      Bristleback.ATTACK,
      Bristleback.ATTACK_RANGE,
      Bristleback.MAX_HEALTH);

    this.setAbility(new Spray(this));
  }
}
