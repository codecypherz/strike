import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameCollection } from 'src/app/collection/game-collection';
import { Game } from 'src/app/model/game';

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss']
})
export class GameSelectionComponent {

  constructor(
    private gameCollection: GameCollection,
    private router: Router) {
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

  startCustomGameSetup(): void {
    this.router.navigate(['/custom-game/board-setup']);
  }
}
