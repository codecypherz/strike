import { Cell } from "../cell";
import { Terrain } from "../terrain";
import { Ability } from "./ability";

export class HighGround extends Ability {

  getAbilityName(): string {
    return 'High Ground';
  }

  getAbilityDescription(): string {
    return 'When attacking from Mountain terrain, gain <buff>+1</buff> Combat Power.';
  }

  override modifyAttackPower(attackPower: number, cell: Cell): number {
    if (cell.terrain == Terrain.MOUNTAIN) {
      return attackPower + 1;
    }
    return attackPower;
  }
}
