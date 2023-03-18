import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/model/game';
import { GameService } from 'src/model/game.service';
import { GameCollection } from 'src/model/gamecollection';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-gamechoice',
  templateUrl: './gamechoice.component.html',
  styleUrls: ['./gamechoice.component.scss']
})
export class GameChoiceComponent {

  @Input() game!: Game;

  constructor(
    private logger: NGXLogger,
    private gameCollection: GameCollection,
    private gameService: GameService,
    private router: Router) {
  }

  selectGame(): void {
    this.gameCollection.addCreatedGame(this.game);

    // This is now the active game.
    this.logger.info(`Starting game: ${this.game.getId()}`);
    this.gameService.setGame(this.game);
    this.game.start();

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
