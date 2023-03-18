import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/model/game';
import { GameCollection } from 'src/model/gamecollection';

@Component({
  selector: 'app-gamechoice',
  templateUrl: './gamechoice.component.html',
  styleUrls: ['./gamechoice.component.scss']
})
export class GameChoiceComponent {

  @Input() game!: Game;

  constructor(
    private gameCollection: GameCollection,
    private router: Router) {
  }

  selectGame(): void {
    this.gameCollection.addCreatedGame(this.game);
    this.router.navigate(['game', this.game.getId()]);
  }
}
