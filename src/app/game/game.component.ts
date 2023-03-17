import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/model/game.service';
import { Game } from 'src/model/game';
import { GameCollection } from 'src/model/gamecollection';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  game!: Game;

  constructor(
    private gameCollection: GameCollection,
    private route: ActivatedRoute,
    private gameService: GameService) {
  }

  ngOnInit() {
    // First, get the game id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const gameIdFromRoute = String(routeParams.get('gameId'));

    // Find the game that corresponded with the id from the route.
    const result = this.gameCollection.findById(gameIdFromRoute);
    if (result == null) {
      throw new Error(`Unable to find game: ${gameIdFromRoute}`);
    }
    this.game = result;

    // This is now the active game.
    this.gameService.setGame(this.game);
    this.game.start();
  }
}
