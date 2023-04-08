import { MeleePiece } from "../piece/melee-piece";
import { Piece } from "../piece/piece";

export class Spikesnout extends MeleePiece {

  static NAME = 'Spikesnout';
  static IMAGE_URL = Piece.IMAGE_PATH + 'spikesnout.webp';
  static POINTS = 1;
  static MOVEMENT = 2;
  static ATTACK = 2;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 5;

  constructor() {
    super(
      Spikesnout.NAME,
      Spikesnout.IMAGE_URL,
      Spikesnout.POINTS,
      Spikesnout.MOVEMENT,
      Spikesnout.ATTACK,
      Spikesnout.ATTACK_RANGE,
      Spikesnout.MAX_HEALTH);
  }
}
