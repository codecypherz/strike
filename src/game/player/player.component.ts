import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player';
import { GameService } from 'src/app/service/game.service';

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
