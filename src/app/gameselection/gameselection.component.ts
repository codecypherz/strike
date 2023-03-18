import { Component } from '@angular/core';
import { Game } from 'src/model/game';
import { GameCollection } from 'src/model/gamecollection';

@Component({
  selector: 'app-gameselection',
  templateUrl: './gameselection.component.html',
  styleUrls: ['./gameselection.component.scss']
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
