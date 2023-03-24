import { Gallop } from "../ability/gallop";
import { DashPiece } from "../piece/dash-piece";
import { Piece } from "../piece/piece";

export class Charger extends DashPiece {

  static NAME = 'Charger';
  static IMAGE_URL = Piece.IMAGE_PATH + 'charger.png';
  static POINTS = 2;
  static MOVEMENT = 3;
  static ATTACK = 2;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 4;

  constructor() {
    super(
      Charger.NAME,
      Charger.IMAGE_URL,
      Charger.POINTS,
      Charger.MOVEMENT,
      Charger.ATTACK,
      Charger.ATTACK_RANGE,
      Charger.MAX_HEALTH);
    
    this.setAbility(new Gallop(this));
  }
}
