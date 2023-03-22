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

/**
 * Tracks the actions taken by a piece in a single turn.
 * 
 * Manages the valid state transitions between the different
 * actions taken using a state machine.
 */
export class ActionTracker {

  stateMachine: StateMachine;

  // This metadata is phase-independent.
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
    return this.stateMachine.state.canRotate();
  }

  hasMovedOrSprinted(): boolean {
    return this.moved || this.sprinted;
  }
}

/**
 * The class responsible for managing transitions between actions for
 * a given piece on a given turn.
 * 
 * The concept of a phase is really only pertinent for a player's last
 * piece which really takes two turns or "phases" as outlined here.
 */
class StateMachine {
  phase: Phase;
  state: State;
  lastPiece: boolean;

  // The actions taken during this phase.
  // This state is cleared on phase transition.
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
    this.phaseActions = new Actions();
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
  abstract canRotate(): boolean;
}

/**
 * The starting state for any piece.
 * 
 * All actions, except overcharge, are possible.
 */
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

  canRotate(): boolean {
    return true;
  }

  transitionTo(stateName: StateName): State {
    return this.stateMachine.createState(stateName);
  }
}

/**
 * Normal rules:
 *   - Can attack if you haven't already
 *   - Can overcharge
 * 
 * Last piece rules:
 *   - Can attack if you haven't already, otherwise phase 2
 *   - Moving again transitions to phase 2
 *   - Sprinting transitions to phase 2
 *   - Can overcharge
 */
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

  canRotate(): boolean {
    return true;
  }
}

/**
 * Normal rules:
 *   - Can move if you haven't already
 *   - Can overcharge if you've moved
 * 
 * Last piece rules:
 *   - Can attack only if you've moved; transition to phase 2
 *   - Moving again transitions to phase 2
 *   - Sprinting transitions to phase 2
 *   - Can overcharge if you've moved
 */
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

  canRotate(): boolean {
    if (this.stateMachine.lastPiece) {
      return this.stateMachine.phase == Phase.ONE;
    } else {
      return false;
    }
  }
}

/**
 * Normal rules:
 *   - Can't make a non-overcharge action
 *   - Can overcharge
 * 
 * Last piece rules:
 *   - Any non-overcharge action transitions to phase 2
 *   - Can overcharge
 */
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

  canRotate(): boolean {
    if (this.stateMachine.lastPiece) {
      return this.stateMachine.phase == Phase.ONE;
    } else {
      return false;
    }
  }
}

/**
 * Normal rules:
 *   - No more actions possible
 * 
 * Last piece rules:
 *   - Non-overcharge actions are possible in phase 1, transition to phase 2
 *   - You can never overcharge after an overcharge
 */
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

  canRotate(): boolean {
    if (this.stateMachine.lastPiece) {
      return this.stateMachine.phase == Phase.ONE;
    } else {
      return false;
    }
  }
}