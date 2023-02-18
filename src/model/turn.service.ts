import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Player } from "./player";

/**
 * Provides the data for each player.
 */
@Injectable()
export class TurnService extends EventTarget {

  static END_TURN_EVENT = 'end_turn';

  readonly player1: Player;
  readonly player2: Player;

  constructor(private board: Board, @Optional() @SkipSelf() service?: TurnService) {
    super();

    if (service) {
      throw new Error('Singleton violation: TurnService');
    }

    this.player1 = new Player('player1', 'Player 1');
    this.player2 = new Player('player2', 'Player 2');

    this.reset();
  }

  reset(): void {
    this.player1.reset();
    this.player2.reset();

    this.player1.setActive(true);
  }

  endTurn(): void {
    for (let cell of this.board.getCells().flat()) {
      if (cell.hasPiece()) {
        cell.getPiece()!.clearTurnData();
      }
    }
    this.player1.toggleActive();
    this.player2.toggleActive();
    console.info('dispatching event');
    this.dispatchEvent(new Event(TurnService.END_TURN_EVENT));
  }

  getActivePlayer(): Player {
    if (this.player1.isActive()) {
      return this.player1;
    }
    return this.player2;
  }
}
