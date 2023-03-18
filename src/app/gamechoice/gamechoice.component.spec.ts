import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { Board } from 'src/model/board';
import { BoardCollection } from 'src/model/boardcollection';
import { Game } from 'src/model/game';
import { GameService } from 'src/model/game.service';
import { GameCollection } from 'src/model/gamecollection';
import { BoardComponent } from '../board/board.component';
import { CellComponent } from '../cell/cell.component';
import { PieceComponent } from '../piece/piece.component';

import { GameChoiceComponent } from './gamechoice.component';

describe('GameChoiceComponent', () => {
  let component: GameChoiceComponent;
  let fixture: ComponentFixture<GameChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
        CellComponent,
        GameChoiceComponent,
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
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameChoiceComponent);
    component = fixture.componentInstance;
    component.game = new Game(new Board());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
