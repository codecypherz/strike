import { Component, Input } from '@angular/core';
import { Board } from 'src/app/model/board';
import { CustomGameService } from 'src/custom-game/custom-game.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent {

  @Input() board!: Board;

  constructor(private customGameService: CustomGameService) { }

  selectBoard(): void {
    this.customGameService.setBoard(this.board);
  }
}
