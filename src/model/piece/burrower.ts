import { Player } from "../player";
import { Piece } from "./piece";

export class Burrower extends Piece {

  static NAME = 'Burrower';
  static POINTS = 1;
  static MOVEMENT = 2;
  static ATTACK = 2;
  static ATTACK_RANGE = 1;
  static HEALTH = 4;

  constructor(player: Player) {
    super(
      Burrower.NAME,
      Burrower.POINTS,
      Burrower.MOVEMENT,
      Burrower.ATTACK,
      Burrower.ATTACK_RANGE,
      Burrower.HEALTH,
      player);
  }
}
