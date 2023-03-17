import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Board } from 'src/model/board';
import { BoardService } from 'src/model/board.service';
import { GameService } from 'src/model/game.service';
import { TurnService } from 'src/model/turn.service';

import { GameOverComponent } from './gameover.component';

describe('GameOverComponent', () => {
  let component: GameOverComponent;
  let fixture: ComponentFixture<GameOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameOverComponent],
      providers: [
        Board,
        GameService,
        TurnService,
        BoardService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
