import { Component, Input } from '@angular/core';
import { BoardService } from 'src/model/board.service';
import { Piece } from 'src/model/piece/piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent {

  @Input() piece!: Piece;

  constructor(private boardService: BoardService) {}

  getPieceRotationTransform() {
    return 'rotate(' + this.piece.getDirection().degrees + 'deg)';
  }

  getKnockbackRotationTransform() {
    const kbDirection = this.piece.getKnockbackDirection();
    if (kbDirection == null) {
      return '';
    }
    return 'rotate(' + kbDirection.degrees + 'deg)';
  }

  getAttack(): number {
    const cell = this.piece.getCell();
    return this.piece.getAttackPower(cell);
  }

  getDefense(): number {
    const cell = this.piece.getCell();
    return this.piece.getDefense(cell);
  }

  getFrontStrength(): string {
    return 'strength-' + this.piece.getFrontStrength();
  }
  getLeftStrength(): string {
    return 'strength-' + this.piece.getLeftStrength();
  }
  getRightStrength(): string {
    return 'strength-' + this.piece.getRightStrength();
  }
  getBackStrength(): string {
    return 'strength-' + this.piece.getBackStrength();
  }

  cancel(event: Event): void {
    event.stopPropagation();
    this.boardService.exitStaging();
  }

  confirmMove(event: Event): void {
    event.stopPropagation();
    this.boardService.confirmMove();
  }

  confirmAttack(event: Event): void {
    event.stopPropagation();
    this.boardService.confirmAttack();
  }

  rotateClockwise(event: Event): void {
    event.stopPropagation();
    this.piece.rotateClockwise();
    this.boardService.showSelectedActions();
  }

  rotateCounterClockwise(event: Event): void {
    event.stopPropagation();
    this.piece.rotateCounterClockwise();
    this.boardService.showSelectedActions();
  }
}
