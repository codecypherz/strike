import { Actions } from "./actions";

enum Phase {
  ONE,
  TWO
}

enum StateName {
  START,
  SPRINT,
  MOVE,
  ATTACK,
  OVERCHARGE
}

export class ActionTracker {

  stateMachine: StateMachine;
  actionTaken = false;
  moved = false;
  sprinted = false;

  constructor(lastPiece: boolean) {
    this.stateMachine = new StateMachine(lastPiece);
  }

  hasActionBeenTaken(): boolean {
    return this.actionTaken;
  }

  canMove(): boolean {
    return this.stateMachine.canTransitionTo(StateName.MOVE);
  }

  move(): void {
    this.stateMachine.transitionTo(StateName.MOVE);
    this.stateMachine.phaseActions.addMove();
    this.actionTaken = true;
    this.moved = true;
  }

  canSprint(): boolean {
    return this.stateMachine.canTransitionTo(StateName.SPRINT);
  }

  sprint(): void {
    this.stateMachine.transitionTo(StateName.SPRINT);
    this.stateMachine.phaseActions.addSprint();
    this.actionTaken = true;
    this.sprinted = true;
  }

  canAttack(): boolean {
    return this.stateMachine.canTransitionTo(StateName.ATTACK);
  }

  attack(): void {
    this.stateMachine.transitionTo(StateName.ATTACK);
    this.stateMachine.phaseActions.addAttack();
    this.actionTaken = true;
  }

  canOvercharge(): boolean {
    return this.stateMachine.canTransitionTo(StateName.OVERCHARGE);
  }

  overcharge(): void {
    this.stateMachine.transitionTo(StateName.OVERCHARGE);
    this.stateMachine.phaseActions.addOvercharge();
    this.actionTaken = true;
  }

  canRotate(): boolean {
    return !this.stateMachine.phaseActions.hasAttacked()
      || this.stateMachine.state instanceof OverchargeState;
  }

  hasMovedOrSprinted(): boolean {
    return this.moved || this.sprinted;
  }
}

class StateMachine {
  phase: Phase;
  state: State;
  lastPiece: boolean;

  // phase metadata
  phaseActions: Actions;

  constructor(lastPiece: boolean) {
    this.phase = Phase.ONE;
    this.lastPiece = lastPiece;
    this.phaseActions = new Actions();
    this.state = this.createState(StateName.START);
  }

  canTransitionTo(stateName: StateName): boolean {
    return this.state.canTransitionTo(stateName);
  }

  transitionTo(stateName: StateName): void {
    if (!this.canTransitionTo(stateName)) {
      throw new Error(`Cannot transition to the ${stateName} state.`);
    }
    this.state = this.state.transitionTo(stateName);
  }

  setPhaseTwo(): void {
    if (!this.lastPiece) {
      throw new Error('Can only have phase 2 for last piece.');
    }
    this.phase = Phase.TWO;
    this.phaseActions.clear();
  }

  createState(stateName: StateName): State {
    switch (stateName) {
      case StateName.START:
        return new StartState(this);
      case StateName.MOVE:
        return new MoveState(this);
      case StateName.ATTACK:
        return new AttackState(this);
      case StateName.SPRINT:
        return new SprintState(this);
      case StateName.OVERCHARGE:
        return new OverchargeState(this);
      default:
        throw new Error(`Unsupported state: ${stateName}`);
    }
  }
}

abstract class State {
  constructor(public stateMachine: StateMachine) { }

  abstract canTransitionTo(stateName: StateName): boolean;
  abstract transitionTo(stateName: StateName): State;
}

class StartState extends State {
  canTransitionTo(stateName: StateName): boolean {
    switch (stateName) {
      case StateName.ATTACK:
      case StateName.MOVE:
      case StateName.SPRINT:
        return true;
      case StateName.OVERCHARGE:
      default:
        return false;
    }
  }

  transitionTo(stateName: StateName): State {
    return this.stateMachine.createState(stateName);
  }
}

class MoveState extends State {
  canTransitionTo(stateName: StateName): boolean {
    if (this.stateMachine.lastPiece) {
      switch (stateName) {
        case StateName.ATTACK:
          return !this.stateMachine.phaseActions.hasAttacked()
            || this.stateMachine.phase == Phase.ONE;
        case StateName.MOVE:
          return this.stateMachine.phase == Phase.ONE;
        case StateName.SPRINT:
          return this.stateMachine.phase == Phase.ONE;
        case StateName.OVERCHARGE:
          return true;
        default:
          return false;
      }
    } else {
      switch (stateName) {
        case StateName.ATTACK:
          return !this.stateMachine.phaseActions.hasAttacked();
        case StateName.MOVE:
          return false;
        case StateName.SPRINT:
          return false;
        case StateName.OVERCHARGE:
          return true;
        default:
          return false;
      }
    }
  }

  transitionTo(stateName: StateName): State {
    if (this.stateMachine.lastPiece) {
      switch (stateName) {
        case StateName.ATTACK:
          if (this.stateMachine.phaseActions.hasAttacked()) {
            this.stateMachine.setPhaseTwo();
          }
          break;
        case StateName.MOVE:
          if (this.stateMachine.phaseActions.hasMoved()) {
            this.stateMachine.setPhaseTwo();
          }
          break;
        case StateName.SPRINT:
          this.stateMachine.setPhaseTwo();
          break;
        case StateName.OVERCHARGE:
        default:
          break;
      }
    }
    return this.stateMachine.createState(stateName);
  }
}

class AttackState extends State {
  canTransitionTo(stateName: StateName): boolean {
    if (this.stateMachine.lastPiece) {
      switch (stateName) {
        case StateName.ATTACK:
          return this.stateMachine.phaseActions.hasMoved()
            && this.stateMachine.phase == Phase.ONE;
        case StateName.MOVE:
          return !this.stateMachine.phaseActions.hasMoved()
            || (this.stateMachine.phaseActions.hasMoved()
              && this.stateMachine.phase == Phase.ONE);
        case StateName.SPRINT:
          return this.stateMachine.phaseActions.hasMoved()
            && this.stateMachine.phase == Phase.ONE;
        case StateName.OVERCHARGE:
          return this.stateMachine.phaseActions.hasMoved();
        default:
          return false;
      }
    } else {
      switch (stateName) {
        case StateName.ATTACK:
          return false;
        case StateName.MOVE:
          return !this.stateMachine.phaseActions.hasMoved();
        case StateName.SPRINT:
          return false;
        case StateName.OVERCHARGE:
          return this.stateMachine.phaseActions.hasMoved();
        default:
          return false;
      }
    }
  }

  transitionTo(stateName: StateName): State {
    if (this.stateMachine.lastPiece) {
      switch (stateName) {
        case StateName.ATTACK:
          if (this.stateMachine.phaseActions.hasAttacked()) {
            this.stateMachine.setPhaseTwo();
          }
          break;
        case StateName.MOVE:
          if (this.stateMachine.phaseActions.hasMoved()) {
            this.stateMachine.setPhaseTwo();
          }
          break;
        case StateName.SPRINT:
          this.stateMachine.setPhaseTwo();
          break;
        case StateName.OVERCHARGE:
        default:
          break;
      }
    }
    return this.stateMachine.createState(stateName);
  }
}

class SprintState extends State {
  canTransitionTo(stateName: StateName): boolean {
    if (this.stateMachine.lastPiece) {
      switch (stateName) {
        case StateName.ATTACK:
          return this.stateMachine.phase == Phase.ONE;
        case StateName.MOVE:
          return this.stateMachine.phase == Phase.ONE;
        case StateName.SPRINT:
          return this.stateMachine.phase == Phase.ONE;
        case StateName.OVERCHARGE:
          return true;
        default:
          return false;
      }
    } else {
      switch (stateName) {
        case StateName.ATTACK:
          return false;
        case StateName.MOVE:
          return false;
        case StateName.SPRINT:
          return false;
        case StateName.OVERCHARGE:
          return true;
        default:
          return false;
      }
    }
  }

  transitionTo(stateName: StateName): State {
    if (this.stateMachine.lastPiece) {
      switch (stateName) {
        case StateName.ATTACK:
          this.stateMachine.setPhaseTwo();
          break;
        case StateName.MOVE:
          this.stateMachine.setPhaseTwo();
          break;
        case StateName.SPRINT:
          this.stateMachine.setPhaseTwo();
          break;
        case StateName.OVERCHARGE:
        default:
          break;
      }
    }
    return this.stateMachine.createState(stateName);
  }
}

class OverchargeState extends State {
  canTransitionTo(stateName: StateName): boolean {
    if (this.stateMachine.lastPiece) {
      switch (stateName) {
        case StateName.ATTACK:
          return this.stateMachine.phase == Phase.ONE;
        case StateName.MOVE:
          return this.stateMachine.phase == Phase.ONE;
        case StateName.SPRINT:
          return this.stateMachine.phase == Phase.ONE;
        case StateName.OVERCHARGE:
          return false;
        default:
          return false;
      }
    } else {
      switch (stateName) {
        case StateName.ATTACK:
          return false;
        case StateName.MOVE:
          return false;
        case StateName.SPRINT:
          return false;
        case StateName.OVERCHARGE:
          return false;
        default:
          return false;
      }
    }
  }

  transitionTo(stateName: StateName): State {
    if (this.stateMachine.lastPiece) {
      switch (stateName) {
        case StateName.ATTACK:
          this.stateMachine.setPhaseTwo();
          break;
        case StateName.MOVE:
          this.stateMachine.setPhaseTwo();
          break;
        case StateName.SPRINT:
          this.stateMachine.setPhaseTwo();
          break;
        case StateName.OVERCHARGE:
        default:
          break;
      }
    }
    return this.stateMachine.createState(stateName);
  }
}