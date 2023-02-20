import { Player } from "../player";
import { Piece } from "./piece";
import { RamPiece } from "./rampiece";

export class Lancehorn extends RamPiece {

  static NAME = 'Lancehorn';
  static IMAGE_URL = Piece.IMAGE_PATH + 'lancehorn.webp';
  static POINTS = 2;
  static MOVEMENT = 2;
  static ATTACK = 2;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 5;

  constructor(player: Player) {
    super(
      Lancehorn.NAME,
      Lancehorn.IMAGE_URL,
      Lancehorn.POINTS,
      Lancehorn.MOVEMENT,
      Lancehorn.ATTACK,
      Lancehorn.ATTACK_RANGE,
      Lancehorn.MAX_HEALTH,
      player);
  }
}
