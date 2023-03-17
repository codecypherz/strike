import { Component, Input } from '@angular/core';
import { GameService } from 'src/model/game.service';
import { Player } from 'src/model/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  @Input() player!: Player;

  constructor(private gameService: GameService) { }

  endTurn() {
    this.gameService.getGame()!.endTurn();
  }
}
