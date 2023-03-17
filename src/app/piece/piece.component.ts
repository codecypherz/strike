import { Component, Input } from '@angular/core';
import { GameService } from 'src/model/game.service';
import { Piece } from 'src/model/piece/piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent {

  @Input() piece!: Piece;

  constructor(private gameService: GameService) {}

  isPieceSelected() {
    return this.piece && this.piece.selected;
  }

  getPieceRotationTransform(): string {
    return 'rotate(' + this.piece.getDirection().degrees + 'deg)';
  }

  getKnockbackRotationTransform(): string {
    const kbDirection = this.piece.getKnockbackDirection();
    if (kbDirection == null) {
      return '';
    }
    return 'rotate(' + kbDirection.degrees + 'deg)';
  }

  getPullRotationTransform(): string {
    const pullDirection = this.piece.getPullDirection();
    if (pullDirection == null) {
      return '';
    }
    return 'rotate(' + pullDirection.degrees + 'deg)';
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
    this.gameService.exitStaging();
  }

  confirmMove(event: Event): void {
    event.stopPropagation();
    this.gameService.confirmMove();
  }

  confirmAttack(event: Event): void {
    event.stopPropagation();
    this.gameService.confirmAttack();
  }

  rotateClockwise(event: Event): void {
    event.stopPropagation();
    this.piece.rotateClockwise();
    this.gameService.showSelectedActions();
  }

  rotateCounterClockwise(event: Event): void {
    event.stopPropagation();
    this.piece.rotateCounterClockwise();
    this.gameService.showSelectedActions();
  }

  overcharge(event: Event): void {
    event.stopPropagation();
    this.piece.overcharge();
    this.gameService.showSelectedActions();
  }
}
