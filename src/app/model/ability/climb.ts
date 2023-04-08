import { Cell } from "../cell";
import { Terrain } from "../terrain";
import { Ability } from "./ability";

export class Climb extends Ability {

  getAbilityName(): string {
    return 'Climb';
  }

  getAbilityDescription(): string {
    return 'When attacking from Hill terrain, gain <buff>+1</buff> Combat Power.';
  }

  override modifyAttackPower(attackPower: number, cell: Cell): number {
    if (cell.terrain == Terrain.HILL) {
      return attackPower + 1;
    }
    return attackPower;
  }
}
