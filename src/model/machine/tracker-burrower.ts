import { AlterTerrain } from "../ability/alter-terrain";
import { MeleePiece } from "../piece/melee-piece";
import { Piece } from "../piece/piece";

export class TrackerBurrower extends MeleePiece {

  static NAME = 'Tracker Burrower';
  static IMAGE_URL = Piece.IMAGE_PATH + 'burrower.webp';
  static POINTS = 2;
  static MOVEMENT = 2;
  static ATTACK = 2;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 4;

  constructor() {
    super(
      TrackerBurrower.NAME,
      TrackerBurrower.IMAGE_URL,
      TrackerBurrower.POINTS,
      TrackerBurrower.MOVEMENT,
      TrackerBurrower.ATTACK,
      TrackerBurrower.ATTACK_RANGE,
      TrackerBurrower.MAX_HEALTH);

    this.setAbility(new AlterTerrain(this));
  }
}
