import { Component } from '@angular/core';
import { Game } from 'src/model/game';
import { GameCollection } from 'src/model/game-collection';

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss']
})
export class GameSelectionComponent {

  constructor(
    private gameCollection: GameCollection) {
    }

  getPreMadeGames(): Array<Game> {
    const games = new Array<Game>();
    games.push(this.gameCollection.createGame1());
    games.push(this.gameCollection.createGame2());
    games.push(this.gameCollection.createGame3());
    games.push(this.gameCollection.createGame4());
    games.push(this.gameCollection.createGame5());
    games.push(this.gameCollection.createGame6());
    games.push(this.gameCollection.createGame7());
    games.push(this.gameCollection.createGame8());
    return games;
  }
}
