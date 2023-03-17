import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/model/player';
import { TurnService } from 'src/model/turn.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  @Input() player1!: Player;
  @Input() player2!: Player;

  ngOnInit(): void {
    this.getPlayer1();
    this.getPlayer2();
  }

  getPlayer1(): Player {
    return this.player1;
  }

  getPlayer2(): Player {
    return this.player2;
  }
}
