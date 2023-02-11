import { Component, Input } from '@angular/core';
import { Player } from 'src/model/player';
import { TurnService } from 'src/model/turn.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  @Input() player!: Player;

  constructor(private turnService: TurnService) { }

  endTurn() {
    this.turnService.endTurn();
  }
}
