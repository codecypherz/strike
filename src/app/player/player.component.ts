import { Component, Input } from '@angular/core';
import { Player } from 'src/model/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  @Input() player: Player;
}
