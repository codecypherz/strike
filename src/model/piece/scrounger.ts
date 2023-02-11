import { Player } from "../player";
import { Piece } from "./piece";

export class Scrounger extends Piece {

  static NAME = 'Scrounger';
  static POINTS = 1;
  static MOVEMENT = 3;
  static ATTACK_RANGE = 1;

  constructor(player: Player) {
    super(
      Scrounger.NAME,
      Scrounger.POINTS,
      Scrounger.MOVEMENT,
      Scrounger.ATTACK_RANGE,
      player);
  }
}
