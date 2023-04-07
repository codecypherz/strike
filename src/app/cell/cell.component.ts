import { Component, Input } from '@angular/core';
import { GameService } from 'src/model/game.service';
import { Cell } from 'src/model/cell';
import { CustomGameService } from 'src/model/custom-game.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {

  @Input() cell!: Cell;

  constructor(
    private customGameService: CustomGameService,
    private gameService: GameService) {
  }

  onCellClicked(): void {
    if (this.customGameService.isSetupActive()) {
      this.customGameService.onCellClicked(this.cell);
    } else if (this.gameService.isGameActive()) {
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
