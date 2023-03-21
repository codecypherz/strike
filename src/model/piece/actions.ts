enum Action {
  MOVE,
  SPRINT,
  ATTACK,
  OVERCHARGE
}

export class Actions {

  private actions = new Array<Action>();

  addMove(): void {
    this.addAction(Action.MOVE);
  }

  addSprint() {
    this.addAction(Action.SPRINT);
  }

  addAttack(): void {
    this.addAction(Action.ATTACK);
  }

  addOvercharge(): void {
    this.addAction(Action.OVERCHARGE);
  }

  private addAction(action: Action): void {
    this.actions.push(action);
  }

  hasMoved(): boolean {
    return this.hasAction(Action.MOVE);
  }

  hasSprinted(): boolean {
    return this.hasAction(Action.SPRINT);
  }

  hasAttacked(): boolean {
    return this.hasAction(Action.ATTACK);
  }

  hasOvercharged(): boolean {
    return this.hasAction(Action.OVERCHARGE);
  }

  private hasAction(desiredAction: Action): boolean {
    for (let action of this.actions) {
      if (action == desiredAction) {
        return true;
      }
    }
    return false;
  }
}