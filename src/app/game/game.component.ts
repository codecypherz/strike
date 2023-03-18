import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Game } from 'src/model/game';
import { CanComponentDeactivate } from '../guard/can-deactivate.guard';
import { DialogService } from '../service/dialog.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements CanComponentDeactivate {

  game!: Game;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService) {
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
}
