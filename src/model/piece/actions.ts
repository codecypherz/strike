export class Actions {

  private actions = new Array<Action>();

  addMove(overcharged: boolean): void {
    this.actions.push(new Move(overcharged));
  }

  addSprint() {
    this.actions.push(new Sprint());
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
    let seenNormalSprint = false;
    for (let action of this.actions) {
      if (action.overcharged) {
        // Reset point!
        seenNormalMove = false;
        seenNormalAttack = false;
        seenNormalSprint = false;
        filteredActions.clear();
      } else {
        // Non overcharge action.
        if ((seenNormalMove && action instanceof Move)
          || (seenNormalAttack && action instanceof Attack)
          || (seenNormalSprint && action instanceof Sprint)) {
          // Discovered duplicate - reset point!
          seenNormalMove = action instanceof Move;
          seenNormalAttack = action instanceof Attack;
          seenNormalSprint = action instanceof Sprint;
          filteredActions.clear();
          filteredActions.actions.push(action);
        }
        // No duplicate, so just add.
        if (action instanceof Move) {
          seenNormalMove = true;
        } else if (action instanceof Attack) {
          seenNormalAttack = true;
        } else if (action instanceof Sprint) {
          seenNormalSprint = true;
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

  hasSprinted(): boolean {
    for (let action of this.actions) {
      if (action instanceof Sprint) {
        return true;
      }
    }
    return false;
  }

  getLastMoveOrSprint(): Action | null {
    let lastMove = null;
    for (let action of this.actions) {
      if (action instanceof Move || action instanceof Sprint) {
        lastMove = action;
      }
    }
    return lastMove;
  }

  lastActionWasOvercharged(): boolean {
    if (this.actions.length == 0) {
      return false;
    }
    return this.actions[this.actions.length - 1].overcharged;
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
      if (action instanceof Attack || action instanceof Sprint) {
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

  hasOvercharged(): boolean {
    for (let action of this.actions) {
      if (action.overcharged) {
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

  getNumMovesOrSprintsWithoutOvercharge(): number {
    let num = 0;
    for (let action of this.actions) {
      if (!action.overcharged
        && (action instanceof Move || action instanceof Sprint)) {
        num++;
      }
    }
    return num;
  }

  getNumAttacksWithoutOvercharge(): number {
    let num = 0;
    for (let action of this.actions) {
      if (!action.overcharged && action instanceof Attack) {
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
  constructor(overcharged: boolean) {
    super(overcharged);
  }
}

export class Attack extends Action {
  constructor(overcharged: boolean) {
    super(overcharged);
  }
}

export class Sprint extends Action {
  constructor() {
    super(false);
  }
}
