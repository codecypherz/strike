import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Cell } from "./cell";
import { Game } from "./game";
import { Fireclaw } from "./machine/fireclaw";
import { Glinthawk } from "./machine/glinthawk";
import { PieceSet } from "./piece-set";
import { SelectService } from "./select.service";
import { Terrain } from "./terrain";

@Injectable()
export class CustomGameService {

  private game: Game | null = null;
  private pieceSet = new PieceSet();
  private selectedTerrain: Terrain = Terrain.GRASSLAND;
  private step = Step.BOARD_SETUP;

  constructor(
    private selectService: SelectService,
    @Optional() @SkipSelf() service: CustomGameService) {
    if (service) {
      throw new Error('Singleton violation: CustomGameService');
    }
  }

  startSetup(): void {
    this.selectService.deselect();
    
    // Default game.
    this.game = new Game(new Board());

    // Makes the "mirrored" overlay show up.
    this.game.getBoard().setSetupMode(true);

    // Default piece set.
    this.pieceSet.add(new Fireclaw());
    this.pieceSet.add(new Glinthawk());

    // Default for board setup.
    this.selectedTerrain = Terrain.GRASSLAND;
    this.step = Step.BOARD_SETUP;
  }

  exitSetup(): void {
    this.game = null;
  }

  isSetupActive(): boolean {
    return this.game != null;
  }

  getGame(): Game {
    // Throws if game hasn't been set.
    return this.game!;
  }

  setBoard(board: Board): void {
    this.selectService.deselect();
    board.setSetupMode(true);
    this.getGame().setBoard(board);
  }

  setPieceSet(pieceSet: PieceSet): void {
    this.pieceSet = pieceSet;
  }

  getPieceSet(): PieceSet {
    return this.pieceSet;
  }

  setStep(step: Step) {
    this.selectService.deselect();
    this.step = step;
  }

  selectTerrain(terrain: Terrain): void {
    this.selectedTerrain = terrain;
  }

  getSelectedTerrain(): Terrain {
    return this.selectedTerrain;
  }

  onCellClicked(cell: Cell): void {
    if (this.step == Step.BOARD_SETUP) {
      this.setTerrain(cell);
    } else if (this.step == Step.PIECE_PLACEMENT) {
      this.selectOrMovePiece(cell);
    }
  }

  private setTerrain(cell: Cell): void {
    cell.terrain = this.selectedTerrain;

    // Mirror the tile on the other side.
    const mirroredCell = this.getGame().getBoard()
      .getByRowCol(7 - cell.position.row, 7 - cell.position.col);
    mirroredCell.terrain = this.selectedTerrain;
  }

  private selectOrMovePiece(cell: Cell): void {
    // Nothing was selected before, so just select this cell.
    if (!this.selectService.isCellSelected()) {
      this.selectService.selectCell(cell);
      return;
    }

    // Do nothing if you select the same cell.
    if (this.selectService.getSelectedCell()!.equals(cell)) {
      return;
    }

    // If a different cell was clicked, it now depends if we had
    // a selected piece.
    if (!this.selectService.isPieceSelected()) {
      this.selectService.selectCell(cell);
      return;
    }

    // TODO Maybe move piece.
  }
}

export enum Step {
  BOARD_SETUP,
  PIECE_SELECTION,
  PIECE_PLACEMENT
}