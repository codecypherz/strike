import { Component, Input } from '@angular/core';
import { GameService } from 'src/model/game.service';
import { Cell } from 'src/model/cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {

  @Input() cell!: Cell;

  constructor(private gameService: GameService) { }

  onCellClicked(): void {
    if (this.gameService.isGameSet()) {
      this.gameService.onCellClicked(this.cell);
    }
  }

  showAvailableMove(): boolean {
    return this.cell.availableMove
      && !this.cell.availableMoveStarting
      && !this.cell.whereAttackWillEnd;
  }

  showAvailableMoveStarting(): boolean {
    return this.cell.availableMoveStarting;
  }

  showAvailableSprint(): boolean {
    return this.cell.availableSprint
      && !this.cell.availableMoveStarting
      && !this.cell.whereAttackWillEnd;
  }

  showAttackInRange(): boolean {
    return this.cell.inAttackRange
      && !this.cell.availableMoveStarting
      && !this.cell.whereAttackWillEnd;
  }
}
