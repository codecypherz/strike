import { Player } from "../player";
import { DashPiece } from "./dashpiece";
import { Piece } from "./piece";

export class Charger extends DashPiece {

  static NAME = 'Charger';
  static IMAGE_URL = Piece.IMAGE_PATH + 'charger.png';
  static POINTS = 2;
  static MOVEMENT = 3;
  static ATTACK = 2;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 4;

  constructor(player: Player) {
    super(
      Charger.NAME,
      Charger.IMAGE_URL,
      Charger.POINTS,
      Charger.MOVEMENT,
      Charger.ATTACK,
      Charger.ATTACK_RANGE,
      Charger.MAX_HEALTH,
      player);
  }

  override hasAbility(): boolean {
    return true;
  }

  override getAbilityDescription(): string {
    return 'Attack increased by 1 when attacking from a Grassland tile.';
  }
}
