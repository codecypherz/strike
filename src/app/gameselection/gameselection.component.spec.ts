import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { BoardCollection } from 'src/model/boardcollection';
import { GameService } from 'src/model/game.service';
import { GameCollection } from 'src/model/gamecollection';
import { BoardComponent } from '../board/board.component';
import { CellComponent } from '../cell/cell.component';
import { GameChoiceComponent } from '../gamechoice/gamechoice.component';
import { PieceComponent } from '../piece/piece.component';

import { GameSelectionComponent } from './gameselection.component';

describe('GameSelectionComponent', () => {
  let component: GameSelectionComponent;
  let fixture: ComponentFixture<GameSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
        CellComponent,
        GameChoiceComponent,
        GameSelectionComponent,
        PieceComponent
      ],
      imports: [
        LoggerModule.forRoot({
          level: NgxLoggerLevel.INFO,
        })
      ],
      providers: [
        BoardCollection,
        GameCollection,
        GameService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
