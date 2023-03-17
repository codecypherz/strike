import { Component, Input } from '@angular/core';
import { BoardService } from 'src/model/board.service';
import { Player } from 'src/model/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  @Input() player!: Player;

  constructor(private boardService: BoardService) { }

  endTurn() {
    this.boardService.getGame()!.endTurn();
  }
}
