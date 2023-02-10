import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/model/board.service';
import { GameService } from 'src/model/game.service';
import { Player } from 'src/model/player';
import { PlayerService } from 'src/model/player.service';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})
export class GameoverComponent implements OnInit {

  winningPlayer: Player;

  constructor(
    private gameService: GameService,
    private boardService: BoardService,
    private playerService: PlayerService) { }

  ngOnInit(): void {
    this.isGameOver();
  }

  isGameOver(): boolean {
    let gameOver = this.gameService.isGameOver();
    if (gameOver) {
      this.winningPlayer = this.playerService.getActivePlayer();
    }
    return gameOver;
  }

  newGame(): void {
    this.boardService.reset();
    this.playerService.reset();
    this.gameService.reset();
  }
}
