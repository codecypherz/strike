import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/model/game.service';
import { Game } from 'src/model/game';
import { Player } from 'src/model/player';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})
export class GameOverComponent implements OnInit {

  @Input() game!: Game;

  winningPlayer!: Player;

  constructor(
    private gameService: GameService,
    private router: Router) { }

  ngOnInit(): void {
    this.isGameOver();
  }

  isGameOver(): boolean {
    let gameOver = this.game.isGameOver();
    if (gameOver) {
      this.winningPlayer = this.game.getWinningPlayer()!;
    }
    return gameOver;
  }

  newGame(): void {
    this.gameService.setGame(null);
    this.router.navigate(['game-selection']);
  }
}
