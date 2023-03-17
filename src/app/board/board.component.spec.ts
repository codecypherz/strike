import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Board } from 'src/model/board';
import { GameService } from 'src/model/game.service';
import { GameService } from 'src/model/game.service';
import { TurnService } from 'src/model/turn.service';
import { CellComponent } from '../cell/cell.component';
import { PieceComponent } from '../piece/piece.component';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
        CellComponent,
        PieceComponent
      ],
      providers: [
        Board,
        GameService,
        TurnService,
        GameService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
