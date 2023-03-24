import { Cell } from "../cell";
import { Piece } from "../piece/piece";

export abstract class Ability {

  constructor(public piece: Piece) {}

  abstract getAbilityName(): string;
  abstract getAbilityDescription(): string;

  modifyAttackPower(attackPower: number, cell: Cell): number {
    // Attack power is not modified by default.
    return attackPower;
  }

  takeStartOfTurnAction(): void {
    // Do nothing by default.
  }
}
