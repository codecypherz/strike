import { Injectable } from "@angular/core";
import { Board } from "./board";
import { Cell } from "./cell";
import { GameService } from "./game.service";
import { Burrower } from "./piece/burrower";

/**
 * Provides behavior and simple extractions of intent.
 */
@Injectable({ providedIn: 'root' })
export class BoardService {

  readonly board: Board;
  private selectedCell: Cell | null;

  constructor(private gameService: GameService) {
    this.board = new Board();

    // TODO: Remove this hard-coded data.
    this.board.getByRowCol(0, 3).setPiece(new Burrower());
    this.board.getByRowCol(7, 4).setPiece(new Burrower());
  }

  selectCell(cell: Cell): void {
    if (this.selectedCell) {
      // A cell was already selected.
      if (this.selectedCell != cell) {
        // Let's determine if this is a piece move.
        if (this.selectedCell.hasPiece()) {
          let moved = this.gameService.movePiece(
              this.selectedCell.position, cell.position);
          // Keep the cell selected if the move failed.
          this.selectedCell.setSelected(!moved);
          cell.setSelected(moved);
        } else {
          // No piece, so just change selection.
          this.selectedCell.setSelected(false);
          cell.setSelected(true);
        }
      } // Do nothing if same cell clicked.
    } else {
      // There was no cell selected before.
      cell.setSelected(true);
    }

    this.selectedCell = cell;
    console.info(cell);
  }

  getSelectedCell(): Cell | null {
    return this.selectedCell;
  }
}
