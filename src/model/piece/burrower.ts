import { Player } from "../player";
import { Piece } from "./piece";

export class Burrower extends Piece {

  constructor(player: Player) {
    super('Burrower', './dist/images/burrower.jpg', 1, player);
  }
}
