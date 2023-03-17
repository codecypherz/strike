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
    this.getGames();
  }
  
  getGames(): Array<Game> {
    return this.gameCollection.getGames();
  }
}
