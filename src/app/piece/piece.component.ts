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

  representAsPlayer1(): boolean {
    if (!this.piece.hasPlayer()) {
      return true;
    }
    return this.piece.getPlayer().isPlayer1();
  }
  
  representAsPlayer2(): boolean {
    if (!this.piece.hasPlayer()) {
      return false; // Default is player 1
    }
    return this.piece.getPlayer().isPlayer2();
  }

  isPieceSelected() {
    return this.piece.selected;
  }

  showAttackPower(): boolean {
    return this.piece.isOnBoard() && this.piece.getPlayer().isActive();
  }

  showDefensePower(): boolean {
    return this.piece.isOnBoard() && !this.piece.getPlayer().isActive();
  }

  showHealth(): boolean {
    return this.piece.isOnBoard();
  }
  
  showHealthDrop(): boolean {
    if (!this.piece.isOnBoard()) {
      return false;
    }
    // Show if the piece is hurt, but let points override.
    return this.getHealthDropAmount() > 0 && !this.showPointsAwarded();
  }

  getHealthDropAmount(): number {
    return this.piece.getUnstagedHealth() - this.piece.getHealth();
  }

  showPointsAwarded(): boolean {
    return this.piece.isOnBoard() && this.piece.getHealth() <= 0;
  }

  getPointsAwarded(): string {
    if (this.piece.getPlayer().isActive()) {
      return '-' + this.piece.points;
    } else {
      return '+' + this.piece.points;
    }
  }

  getPieceRotationTransform(): string {
    return 'rotate(' + this.piece.getDirection().degrees + 'deg)';
  }

  showKnockbackOrPullIndicators(): boolean {
    return this.piece.isOnBoard();
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

  showBoardActionButtons(): boolean {
    return this.piece.isOnBoard() && this.piece.selected;
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
