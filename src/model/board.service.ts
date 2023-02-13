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
    (window as any).boardService = this;
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
          this.selectedCell.setSelected(false);
          cell.setSelected(true);
          this.selectedCell = cell;
        } else {
          // No piece, so just change the selection.
          this.selectedCell.setSelected(false);
          cell.setSelected(true);
          this.selectedCell = cell;
        }
      } else {
        // Same cell selected, so de-select.
        this.selectedCell.setSelected(false);
        this.selectedCell = null;
      }
    } else {
      // There was no cell selected before.
      cell.setSelected(true);
      this.selectedCell = cell;
    }

    // Always update this information.
    this.showAvailableActions();
  }

  public getSelectedCell(): Cell | null {
    return this.selectedCell;
  }

  // TODO: When a turn ends, refresh available actions.
  private showAvailableActions() {
    for (let cell of this.board.getCells().flat()) {
      if (!this.selectedCell) {
        // No cell selected, so clear movement indicator.
        cell.setAvailableMove(false);
        cell.setAvailableAttack(false);
      } else {
        cell.setAvailableMove(this.gameService.canMove(this.selectedCell, cell));
        cell.setAvailableAttack(this.gameService.canAttack(this.selectedCell, cell));
      }
    }
  }
}
