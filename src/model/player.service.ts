import { Injectable } from "@angular/core";
import { Player } from "./player";

/**
 * Provides the data for each player.
 */
@Injectable({ providedIn: 'root' })
export class PlayerService {

  readonly player1: Player;
  readonly player2: Player;

  constructor() {
    this.player1 = new Player('Player 1');
    this.player2 = new Player('Player 2');
  }
}
