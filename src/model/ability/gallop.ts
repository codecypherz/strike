import { Cell } from "../cell";
import { Terrain } from "../terrain";
import { Ability } from "./ability";

export class Gallop extends Ability {

  getAbilityName(): string {
    return 'Gallop';
  }

  getAbilityDescription(): string {
    return 'Attack increased by <buff>+1</buff> when attacking from a Grassland tile.';
  }

  override modifyAttackPower(attackPower: number, cell: Cell): number {
    if (cell.terrain == Terrain.GRASSLAND) {
      return attackPower + 1;
    }
    return attackPower;
  }
}
