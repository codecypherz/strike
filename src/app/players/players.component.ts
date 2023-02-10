import { Component, OnInit } from '@angular/core';
import { Player } from 'src/model/player';
import { PlayerService } from 'src/model/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  player1: Player;
  player2: Player;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.player1 = this.playerService.player1;
    this.player2 = this.playerService.player2;
  }
}
