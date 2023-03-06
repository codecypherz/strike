import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Board } from 'src/model/board';
import { BoardService } from 'src/model/board.service';
import { GameService } from 'src/model/game.service';
import { TurnService } from 'src/model/turn.service';

import { PieceComponent } from './piece.component';

describe('PieceComponent', () => {
  let component: PieceComponent;
  let fixture: ComponentFixture<PieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieceComponent],
      providers: [
        Board,
        GameService,
        TurnService,
        BoardService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
