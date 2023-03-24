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

  modifyDefense(defense: number, cell: Cell): number {
    // Defense is not modified by default.
    return defense;
  }

  takeStartOfTurnAction(): void {
    // Do nothing by default.
  }

  takeEndOfAttackAction(attackedPieces: Piece[]): void {
    // Do nothing by default.
  }
}
