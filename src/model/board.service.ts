import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Cell } from "./cell";
import { GameService } from "./game.service";
import { Piece } from "./piece/piece";

/**
 * Provides behavior and simple extractions of intent.
 */
@Injectable()
export class BoardService {

  private selectedCell: Cell | null = null;
  private selectedPiece: Piece | null = null;

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

  public onCellClicked(cell: Cell): void {
    // Nothing was selected before, so just select this cell.
    if (!this.selectedCell) {
      this.selectCell(cell);
      return;
    }

    // If the selected cell was clicked, then select the piece.
    if (this.selectedCell == cell) {
      if (this.selectedCell.hasPiece()) {
        this.selectPiece(this.selectedCell.getPiece()!);
      }
      // Just do nothing if the selected cell was clicked without a piece.
      // If terrain was selected and clicked again, do nothing.
      return;
    }

    // If a different cell was clicked, it now depends if we had
    // a selected piece.
    if (!this.selectedPiece) {
      // Just select a different cell.
      this.selectCell(cell);
      return;
    }

    // TODO: Keep implementing!
  }

  public getSelectedCell(): Cell | null {
    return this.selectedCell;
  }

  public selectCell(cell: Cell): void {
    console.info('selecting cell', cell);
    if (this.selectedCell) {
      this.selectedCell.setSelected(false);
      this.selectedCell = null;
    }
    if (cell) {
      this.selectedCell = cell;
      this.selectedCell.setSelected(true);
    }
    this.showAvailableActions();
  }

  public selectPiece(piece: Piece | null): void {
    console.info('selecting piece', piece);
    if (this.selectedPiece) {
      this.selectedPiece.setSelected(false);
      this.selectedPiece = null;
    }
    if (piece) {
      this.selectedPiece = piece;
      this.selectedPiece.setSelected(true);
    }
    this.showAvailableActions();
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
