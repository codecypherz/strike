import { Component, Input } from '@angular/core';
import { Game } from 'src/model/game';

@Component({
  selector: 'app-gamechoice',
  templateUrl: './gamechoice.component.html',
  styleUrls: ['./gamechoice.component.scss']
})
export class GameChoiceComponent {

  @Input() game!: Game;
}
