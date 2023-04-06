import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Cell } from "./cell";
import { Direction } from "./direction";
import { Game } from "./game";
import { Fireclaw } from "./machine/fireclaw";
import { Glinthawk } from "./machine/glinthawk";
import { PieceSet } from "./piece-set";
import { Piece, PieceCtor } from "./piece/piece";
import { Player } from "./player";
import { Position } from "./position";
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

    // Make sure all pieces are pointed down.
    if (this.step == Step.PIECE_PLACEMENT) {
      for (let piece of this.pieceSet.getSet()) {
        piece.setDirection(Direction.DOWN);
      }
    }
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
      this.showAvailablePlacement();
    }
  }

  showAvailablePlacement(): void {
    for (let cell of this.getGame().getBoard().getCells().flat()) {
      if (cell.position.row > 1) {
        break;
      }
      cell.clearIndicators();

      if (this.selectService.isPieceSelected() && !cell.hasPiece()) {
        cell.availableMove = true;
      }
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
    // Neither a piece or a cell was selected, so just select this cell.
    if (!this.selectService.isCellSelected()
      && !this.selectService.isPieceSelected()) {
      this.selectService.selectCell(cell);
      return;
    }

    // A piece was selected (could be on or off the board).
    if (this.selectService.isPieceSelected()) {

      if (cell.hasPiece()) {
        // The cell clicked had a piece, so can't move or place here.
        // Select the cell instead.
        this.selectService.selectCell(cell);
        return;
      }

      if (cell.position.row > 1) {
        // Invalid placement cell, so just select the cell.
        this.selectService.selectCell(cell);
        return;
      }

      const game = this.getGame();
      const piece = this.selectService.getSelectedPiece()!;

      // Valid placement, put the piece on the board or move it.
      if (piece.isOnBoard()) {

        // The piece is on the board, so must the mirrored piece.
        const player2Cell = game.getBoard().getByRowCol(
          7 - piece.position.row, 7 - piece.position.col);
        if (!player2Cell.hasPiece()) {
          throw new Error('Expected a mirrored piece to be found.');
        }
        const player2Piece = player2Cell.getPiece()!;

        // Update player 1 piece.
        piece.getCell().clearPiece();
        piece.position = cell.position;

        // // Update player 2 piece.
        player2Cell.clearPiece();
        const newPlayer2Cell = game.getBoard().getByRowCol(
          7 - piece.position.row, 7 - piece.position.col);
        player2Piece.position = newPlayer2Cell.position;
        newPlayer2Cell.setPiece(player2Piece);
      } else {
        // Piece not yet on the board, so put it on the board.
        this.pieceSet.remove(piece);
        piece.position = cell.position;
        game.initializePiece(piece, game.getPlayer1());

        // Create the player 2 piece and mirror it.
        const player2Piece = Piece.newFrom(piece);
        player2Piece.position = new Position(
          7 - piece.position.row, 7 - piece.position.col);
        game.initializePiece(player2Piece, game.getPlayer2());
      }

      // Whether on the board or not, finish deselecting everything.
      this.selectService.deselect();
      return;
    }

    // No piece selected.
    // Do nothing if you select the same cell.
    if (this.selectService.getSelectedCell()!.equals(cell)) {
      return;
    }

    // If a different cell was clicked, so just select that one.
    this.selectService.selectCell(cell);
  }
}

export enum Step {
  BOARD_SETUP,
  PIECE_SELECTION,
  PIECE_PLACEMENT
}