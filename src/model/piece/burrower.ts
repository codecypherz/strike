import { Player } from "../player";
import { Piece } from "./piece";

export class Burrower extends Piece {

  static NAME = 'Burrower';
  static POINTS = 1;
  static MOVEMENT = 1;

  constructor(player: Player) {
    super(
      Burrower.NAME,
      Burrower.POINTS,
      Burrower.MOVEMENT,
      player);
  }
}
