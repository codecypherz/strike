import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/model/game';
import { GameService } from 'src/model/game.service';

@Component({
  selector: 'app-game-choice',
  templateUrl: './game-choice.component.html',
  styleUrls: ['./game-choice.component.scss']
})
export class GameChoiceComponent {

  @Input() game!: Game;

  constructor(
    private gameService: GameService,
    private router: Router) {
  }

  selectGame(): void {
    this.gameService.startGame(this.game);
    this.router.navigate(['game', this.game.getId()]);
  }

  getPieceDescriptors(): Array<string> {
    const pieces = this.game.getPlayer1().getPieces();
    const pieceMap = new Map<string, number>();
    for (let piece of pieces.getSet()) {
      const name = piece.name;
      let count = pieceMap.get(name) || 0;
      count++;
      pieceMap.set(name, count);
    }
    const descriptors = new Array<string>();
    for (let name of pieceMap.keys()) {
      const count = pieceMap.get(name);
      descriptors.push(count + ' ' + name);
    }
    return descriptors;
  }
}
