import { Injectable, Optional, SkipSelf } from "@angular/core";
import { SelectService } from "../app/service/select.service";
import { Game } from "src/app/model/game";
import { PieceSet } from "src/app/model/piece-set";
import { Terrain } from "src/app/model/terrain";
import { Board, CellClickedEvent } from "src/app/model/board";
import { Piece } from "src/app/model/piece/piece";
import { Cell } from "src/app/model/cell";
import { Direction } from "src/app/model/direction";
import { GameService } from "src/app/service/game.service";

export enum Step {
  BOARD_SETUP,
  PIECE_SELECTION,
  PIECE_PLACEMENT
}

@Injectable()
export class CustomGameService {

  private game: Game | null = null;
  private pieceSet = new PieceSet();
  private placementMap: Map<string, string[]> = new Map<string, string[]>();
  private selectedTerrain: Terrain = Terrain.GRASSLAND;
  private step = Step.BOARD_SETUP;

  private cellClickedCallback = this.onCellClicked.bind(this);

  constructor(
    private selectService: SelectService,
    private gameService: GameService,
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
    this.game.getBoard().addEventListener(Board.CELL_CLICKED_EVENT, this.cellClickedCallback);

    // Empty piece set.
    this.pieceSet = new PieceSet();
    this.placementMap = new Map<string, string[]>();

    // Default for board setup.
    this.selectedTerrain = Terrain.GRASSLAND;
    this.step = Step.BOARD_SETUP;
  }

  startGame(): boolean {
    if (!this.isSetupActive()) {
      throw new Error('Custom game not set up.');
    }

    // Validate the game.
    const game = this.getGame();
    if (!this.isGameValid()) {
      return false;
    }

    // Start the game.
    game.getBoard().setSetupMode(false);
    this.gameService.startGame(game);
    return true;
  }

  isGameValid(): boolean {
    return this.isPieceSelectionValid() && this.isPiecePlacementValid();
  }

  isPieceSelectionValid(): boolean {
    const points = this.pieceSet.getPoints();
    return points <= 10 && points >= 7;
  }

  isPiecePlacementValid(): boolean {
    for (let piece of this.pieceSet.getSet()) {
      if (!this.hasBeenPlaced(piece)) {
        return false;
      }
    }
    return true;
  }

  exitSetup(): void {
    this.game!.getBoard().removeEventListener(Board.CELL_CLICKED_EVENT, this.cellClickedCallback);
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
    if (!this.isSetupActive()) {
      throw new Error('Custom game not set up.');
    }
    const game = this.getGame();
    this.selectService.deselect();
    board.setSetupMode(true);

    // Take all pieces that were on the old board and transfer them.
    for (let piece of this.pieceSet.getSet()) {
      if (this.hasBeenPlaced(piece)) {
        const pieceIds = this.placementMap.get(piece.getId())!;

        const piece1 = game.findPiece(pieceIds[0]);
        piece1.setBoard(board);
        board.getCell(piece1.position).setPiece(piece1);

        const piece2 = game.findPiece(pieceIds[1]);
        piece2.setBoard(board);
        board.getCell(piece2.position).setPiece(piece2);
      }
    }

    // Set the new board on the game.
    game.setBoard(board);
  }

  setPieceSet(pieceSet: PieceSet): void {
    if (!this.isSetupActive()) {
      throw new Error('Custom game not set up.');
    }
    const game = this.getGame();

    // Remove all previously placed pieces.
    for (let piece of this.pieceSet.getSet()) {
      if (this.hasBeenPlaced(piece)) {
        const pieceIds = this.placementMap.get(piece.getId())!;
        this.getGame().removePiece(pieceIds[0]);
        this.getGame().removePiece(pieceIds[1]);
      }
    }

    // Now set the new piece set.
    this.pieceSet = pieceSet;
  }

  getPieceSet(): PieceSet {
    if (!this.isSetupActive()) {
      throw new Error('Custom game not set up.');
    }
    return this.pieceSet;
  }

  canAddPiece(): boolean {
    if (!this.isSetupActive()) {
      throw new Error('Custom game not set up.');
    }
    return this.pieceSet.size() < 10;
  }

  addPiece(piece: Piece): void {
    if (!this.canAddPiece()) {
      // This is a silent fail because there's a delay on button disablement.
      return;
    }
    this.pieceSet.add(piece);
  }

  removePiece(piece: Piece): void {
    if (!this.isSetupActive()) {
      throw new Error('Custom game not set up.');
    }
    // Remove the piece from the set.
    this.pieceSet.remove(piece);

    // Also check the board to see if the piece should be removed.
    if (this.hasBeenPlaced(piece)) {
      const pieceIds = this.placementMap.get(piece.getId())!;
      this.getGame().removePiece(pieceIds[0]);
      this.getGame().removePiece(pieceIds[1]);
    }
  }

  hasBeenPlaced(piece: Piece): boolean {
    if (!this.isSetupActive()) {
      throw new Error('Custom game not set up.');
    }
    return this.placementMap.has(piece.getId());
  }

  setStep(step: Step) {
    if (!this.isSetupActive()) {
      throw new Error('Custom game not set up.');
    }
    this.selectService.deselect();
    this.step = step;

    if (this.step == Step.PIECE_PLACEMENT) {
      this.selectService.setNotSelectedText('Select a piece and place it.');
      // Make sure all pieces are pointed down.
      for (let piece of this.pieceSet.getSet()) {
        piece.setDirection(Direction.DOWN);
      }
    } else if (this.step == Step.PIECE_SELECTION) {
      this.selectService.setNotSelectedText('Select a piece.');
    }
  }

  selectTerrain(terrain: Terrain): void {
    if (!this.isSetupActive()) {
      throw new Error('Custom game not set up.');
    }
    this.selectedTerrain = terrain;
  }

  getSelectedTerrain(): Terrain {
    if (!this.isSetupActive()) {
      throw new Error('Custom game not set up.');
    }
    return this.selectedTerrain;
  }

  private onCellClicked(event: Event): void {
    const cell = (event as CellClickedEvent).cell;

    if (!this.isSetupActive()) {
      throw new Error('Custom game not set up.');
    }
    if (this.step == Step.BOARD_SETUP) {
      this.setTerrain(cell);
    } else if (this.step == Step.PIECE_PLACEMENT) {
      this.selectOrMovePiece(cell);
      this.showAvailablePlacement();
    }
  }

  showAvailablePlacement(): void {
    if (!this.isSetupActive()) {
      throw new Error('Custom game not set up.');
    }
    for (let cell of this.getGame().getBoard().getCells().flat()) {
      if (cell.position.row > 1) {
        break;
      }
      cell.clearIndicators();

      if (this.selectService.isPieceSelected() && !cell.hasPiece()) {
        const piece = this.selectService.getSelectedPiece()!;
        if (!this.hasBeenPlaced(piece)) {
          cell.availableMove = true;
        }
      }
    }
  }

  private setTerrain(cell: Cell): void {
    cell.terrain = this.selectedTerrain;

    // Mirror the tile on the other side.
    const mirroredCell = this.getGame().getBoard().getCell(cell.position.mirror());
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
        const player1Piece = piece;

        // The piece is on the board, so must the mirrored piece.
        const player2Piece = this.lookupPlayer2Piece(player1Piece);

        // Update player 1 piece.
        player1Piece.getCell().clearPiece();
        player1Piece.position = cell.position;

        // // Update player 2 piece.
        player2Piece.getCell().clearPiece();
        const newPlayer2Cell = game.getBoard().getCell(player1Piece.position.mirror());
        player2Piece.position = newPlayer2Cell.position;
        newPlayer2Cell.setPiece(player2Piece);
      } else {
        if (this.hasBeenPlaced(piece)) {
          // This piece has already been place, so just select the cell.
          this.selectService.selectCell(cell);
          return;
        }

        // Piece not yet on the board, so create a copy from it and place it.
        const player1Piece = Piece.newFrom(piece);
        player1Piece.position = cell.position;
        game.initializePiece(player1Piece, game.getPlayer1());

        // Create the player 2 piece and mirror it.
        const player2Piece = Piece.newFrom(piece);
        player2Piece.position = player1Piece.position.mirror();
        game.initializePiece(player2Piece, game.getPlayer2());

        // Do some book keeping in case of set modification.
        this.placementMap.set(piece.getId(), [player1Piece.getId(), player2Piece.getId()]);
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

  private lookupPlayer2Piece(player1Piece: Piece): Piece {
    const player2Cell = this.getGame().getBoard().getCell(player1Piece.position.mirror());
    if (!player2Cell.hasPiece()) {
      throw new Error('Expected a mirrored piece to be found.');
    }
    return player2Cell.getPiece()!;
  }
}
