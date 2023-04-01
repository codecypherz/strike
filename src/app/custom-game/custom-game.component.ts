import { Component, OnInit } from '@angular/core';
import { Board } from 'src/model/board';
import { Game } from 'src/model/game';

@Component({
  selector: 'app-custom-game',
  templateUrl: './custom-game.component.html',
  styleUrls: ['./custom-game.component.scss']
})
export class CustomGameComponent {

  game = new Game(new Board());
}
