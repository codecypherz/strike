import { Climb } from "../ability/climb";
import { Empower } from "../ability/empower";
import { Direction } from "../direction";
import { MeleePiece } from "../piece/melee-piece";
import { Piece } from "../piece/piece";
import { RamPiece } from "../piece/ram-piece";
import { Strength } from "../strength";

export class Leaplasher extends MeleePiece {

  static NAME = 'Leaplasher';
  static IMAGE_URL = Piece.IMAGE_PATH + 'leaplasher.webp';
  static POINTS = 1;
  static MOVEMENT = 4;
  static ATTACK = 1;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 3;

  constructor() {
    super(
      Leaplasher.NAME,
      Leaplasher.IMAGE_URL,
      Leaplasher.POINTS,
      Leaplasher.MOVEMENT,
      Leaplasher.ATTACK,
      Leaplasher.ATTACK_RANGE,
      Leaplasher.MAX_HEALTH);

    this.setAbility(new Empower(this));
  }
}
