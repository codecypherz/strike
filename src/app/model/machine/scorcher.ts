import { Burn } from "../ability/burn";
import { Gallop } from "../ability/gallop";
import { DashPiece } from "../piece/dash-piece";
import { Piece } from "../piece/piece";

export class Scorcher extends DashPiece {

  static NAME = 'Scorcher';
  static IMAGE_URL = Piece.IMAGE_PATH + 'scorcher.webp';
  static POINTS = 8;
  static MOVEMENT = 2;
  static ATTACK = 4;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 12;

  constructor() {
    super(
      Scorcher.NAME,
      Scorcher.IMAGE_URL,
      Scorcher.POINTS,
      Scorcher.MOVEMENT,
      Scorcher.ATTACK,
      Scorcher.ATTACK_RANGE,
      Scorcher.MAX_HEALTH);
    
    this.setAbility(new Burn(this));
  }
}
