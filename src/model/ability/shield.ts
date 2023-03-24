import { Cell } from "../cell";
import { Ability } from "./ability";

export class Shield extends Ability {

  getAbilityName(): string {
    return 'Shield';
  }

  getAbilityDescription(): string {
    return 'Gains <buff>+1</buff> Combat Power when defending from an attack.';
  }

  override modifyDefense(defense: number, cell: Cell): number {
    return defense + 1;
  }
}
