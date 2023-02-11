import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Cell } from "./cell";
import { GameService } from "./game.service";

/**
 * Provides behavior and simple extractions of intent.
 */
@Injectable()
export class BoardService {

  private selectedCell: Cell | null = null;

  constructor(
    private board: Board,
    private gameService: GameService,
    @Optional() @SkipSelf() service?: BoardService) {
    if (service) {
      throw new Error('Singleton violation: BoardService');
    }
  }

  public reset(): void {
    this.selectedCell = null;
    this.board.reset();
  }

  public selectCell(cell: Cell): void {
    if (this.selectedCell) {
      // A cell was already selected.
      if (this.selectedCell != cell) {
        // The target cell wasn't the same.
        if (this.selectedCell.hasPiece()) {
          // There is a source piece; try to take action.
          this.gameService.takeAction(
            this.selectedCell.position, cell.position);
          // Deselect everything after trying to do something.
          this.selectedCell.setSelected(false);
          cell.setSelected(false);
          this.selectedCell = null;
        } else {
          // No piece, so just change the selection.
          this.selectedCell.setSelected(false);
          cell.setSelected(true);
          this.selectedCell = cell;
        }
      } // Do nothing if same cell clicked.
    } else {
      // There was no cell selected before.
      cell.setSelected(true);
      this.selectedCell = cell;
    }
  }

  public getSelectedCell(): Cell | null {
    return this.selectedCell;
  }
}
