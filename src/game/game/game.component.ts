import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/guard/can-deactivate.guard';
import { DialogService } from 'src/app/service/dialog.service';
import { Game } from 'src/app/model/game';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements CanComponentDeactivate, OnDestroy {

  game!: Game;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private gameService: GameService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const game: Game = data['game'];
      this.game = game;
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.game.isGameOver()) {
      return true;
    }
    return this.dialogService.confirm('Quit game?');
  }

  ngOnDestroy(): void {
    this.gameService.endGame();
  }
}
