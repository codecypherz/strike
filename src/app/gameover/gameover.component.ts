import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from 'src/model/board.service';
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
    private boardService: BoardService,
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
    this.boardService.setGame(null);
    this.router.navigate(['game-selection']);
  }
}
