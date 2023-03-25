import { Cell } from "../cell";
import { AttackResults } from "../piece/attack-results";
import { Piece } from "../piece/piece";

export abstract class Ability {

  constructor(public piece: Piece) {}

  abstract getAbilityName(): string;
  abstract getAbilityDescription(): string;

  modifyAttackPower(attackPower: number, cell: Cell): number {
    return attackPower;
  }

  modifyDefense(defense: number, cell: Cell): number {
    return defense;
  }

  takeStartOfTurnAction(): void {
  }

  /**
   * Lets the attacking piece perform some ability.
   */
  takeEndOfAttackAction(attackResults: AttackResults): void {
  }

  /**
   * Lets the piece being attacked perform some ability.
   */
  takeActionAfterBeingAttacked(attackingPiece: Piece): void {
  }
}
