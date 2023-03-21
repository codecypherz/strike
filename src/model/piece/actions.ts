export class Actions {

  private actions = new Array<Action>();

  addMove(): void {
    this.actions.push(new Move());
  }

  addSprint() {
    this.actions.push(new Sprint());
  }

  addAttack(): void {
    this.actions.push(new Attack());
  }

  addOvercharge(): void {
    this.actions.push(new Overcharge());
  }

  getActions(): Array<Action> {
    return this.actions;
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

  hasAttackedSinceLastOvercharge() {
    // TODO
    return false;
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
      if (action instanceof Overcharge) {
        return true;
      }
    }
    return false;
  }

  clear(): void {
    this.actions = new Array<Action>();
  }
}

export interface Action {
}

export class Move implements Action {
}

export class Attack implements Action {
}

export class Sprint implements Action {
}

export class Overcharge implements Action {
}