import { Position } from "../position";
import { Piece } from "./piece";

export class AttackResults {

  private attackedPieces = new Array<AttackedPiece>();

  addAttackedPiece(piece: Piece, originalPosition: Position) {
    this.attackedPieces.push(new AttackedPiece(piece, originalPosition));
  }

  getAttackedPieces(): Array<AttackedPiece> {
    return this.attackedPieces;
  }
}

export class AttackedPiece {

  constructor(
    public piece: Piece,
    public originalPosition: Position) { }
}