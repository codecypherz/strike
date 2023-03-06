import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Board } from 'src/model/board';
import { BoardService } from 'src/model/board.service';
import { Cell } from 'src/model/cell';
import { GameService } from 'src/model/game.service';
import { TurnService } from 'src/model/turn.service';
import { PieceComponent } from '../piece/piece.component';

import { CellComponent } from './cell.component';

describe('CellComponent', () => {
  let cell = new Cell(0, 0);
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellComponent, PieceComponent],
      providers: [
        Board,
        GameService,
        TurnService,
        BoardService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    component.cell = cell;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
