export class Actions {

  private actions = new Array<Action>();

  addMove(overcharged: boolean, sprinted: boolean): void {
    this.actions.push(new Move(overcharged, sprinted));
  }

  addAttack(overcharged: boolean): void {
    this.actions.push(new Attack(overcharged));
  }

  getActions(): Array<Action> {
    return this.actions;
  }

  getActionsSinceResetPoint(): Actions {
    const filteredActions = new Actions();
    let seenNormalMove = false;
    let seenNormalAttack = false;
    for (let action of this.actions) {
      if (action.overcharged) {
        // Reset point!
        seenNormalMove = false;
        seenNormalAttack = false;
        filteredActions.clear();
      } else {
        // Non overcharge action.
        if ((seenNormalMove && action instanceof Move)
          || (seenNormalAttack && action instanceof Attack)) {
          // Discovered duplicate - reset point!
          seenNormalMove = action instanceof Move;
          seenNormalAttack = action instanceof Attack;
          filteredActions.clear();
          filteredActions.actions.push(action);
        }
        // No duplicate, so just add.
        if (action instanceof Move) {
          seenNormalMove = true;
        } else if (action instanceof Attack) {
          seenNormalAttack = true;
        }
        filteredActions.actions.push(action);
      }
    }
    return filteredActions;
  }

  hasAction(): boolean {
    return this.actions.length > 0;
  }

  hasMoved(): boolean {
    for (let action of this.actions) {
      if (action instanceof Move) {
        return true;
      }
    }
    return false;
  }

  getLastMove(): Action | null {
    let lastMove = null;
    for (let action of this.actions) {
      if (action instanceof Move) {
        lastMove = action;
      }
    }
    return lastMove;
  }

  hasActionSinceLastOvercharge() {
    let numActionsSinceLastOvercharge = 0;
    for (let action of this.actions) {
      if (action.overcharged) {
        numActionsSinceLastOvercharge = 0;
      } else {
        numActionsSinceLastOvercharge++;
      }
    }
    return numActionsSinceLastOvercharge > 0;
  }

  hasAttackedOrSprinted() {
    for (let action of this.actions) {
      if (action instanceof Attack || (action as Move).sprinted) {
        return true;
      }
    }
    return false;
  }

  hasAttackedSinceLastOvercharge() {
    let numSinceLastOvercharge = 0;
    for (let action of this.actions) {
      if (action.overcharged) {
        numSinceLastOvercharge = 0;
      } else if (action instanceof Attack) {
        numSinceLastOvercharge++;
      }
    }
    return numSinceLastOvercharge > 0;
  }

  hasAttacked(): boolean {
    for (let action of this.actions) {
      if (action instanceof Attack) {
        return true;
      }
    }
    return false;
  }

  getNumOvercharges(): number {
    let num = 0;
    for (let action of this.actions) {
      if (action.overcharged) {
        num++;
      }
    }
    return num;
  }

  getNumMovesWithoutOvercharge(): number {
    let num = 0;
    for (let action of this.actions) {
      if (action instanceof Move && !action.overcharged) {
        num++;
      }
    }
    return num;
  }

  clear(): void {
    this.actions = new Array<Action>();
  }
}

export abstract class Action {
  constructor(public overcharged: boolean) {
  }
}

export class Move extends Action {
  constructor(overcharged: boolean, public sprinted: boolean) {
    super(overcharged);
  }
}

export class Attack extends Action {
  constructor(overcharged: boolean) {
    super(overcharged);
  }
}
