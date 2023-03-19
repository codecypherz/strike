import { Component } from '@angular/core';
import { Game } from 'src/model/game';
import { GameCollection } from 'src/model/game-collection';

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss']
})
export class GameSelectionComponent {

  constructor(private gameCollection: GameCollection) {}

  ngOnInit(): void {
    this.getGame1();
    this.getGame2();
    this.getGame3();
  }

  getGame1(): Game {
    return this.gameCollection.createGame1();
  }

  getGame2(): Game {
    return this.gameCollection.createGame2();
  }

  getGame3(): Game {
    return this.gameCollection.createGame3();
  }
}
