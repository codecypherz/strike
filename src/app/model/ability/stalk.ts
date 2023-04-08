import { Cell } from "../cell";
import { Terrain } from "../terrain";
import { Ability } from "./ability";

export class Stalk extends Ability {

  getAbilityName(): string {
    return 'Stalk';
  }

  getAbilityDescription(): string {
    return 'When attacking from Forest terrain, gain <buff>+1</buff> Combat Power.';
  }

  override modifyAttackPower(attackPower: number, cell: Cell): number {
    if (cell.terrain == Terrain.FOREST) {
      return attackPower + 1;
    }
    return attackPower;
  }
}
