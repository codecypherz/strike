import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Cell } from "./cell";
import { GameService } from "./game.service";

/**
 * Provides behavior and simple extractions of intent.
 */
@Injectable()
export class BoardService {

  private selectedCell: Cell | null;

  constructor(
    private board: Board,
    private gameService: GameService,
    @Optional() @SkipSelf() service?: BoardService) {
    if (service) {
      throw new Error('Singleton violation: BoardService');
    }
  }

  selectCell(cell: Cell): void {
    if (this.selectedCell) {
      // A cell was already selected.
      if (this.selectedCell != cell) {
        // Let's determine if this is a piece move.
        if (this.selectedCell.hasPiece()) {
          this.gameService.movePiece(
            this.selectedCell.position, cell.position);
          // Deselect everything after move attempt
          this.selectedCell.setSelected(false);
          cell.setSelected(false);
          this.selectedCell = null;
        } else {
          // No piece, so just change selection.
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

  getSelectedCell(): Cell | null {
    return this.selectedCell;
  }
}
