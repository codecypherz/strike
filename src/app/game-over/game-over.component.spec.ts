import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Board } from 'src/model/board';
import { Game } from 'src/model/game';
import { GameService } from 'src/model/game.service';

import { GameOverComponent } from './game-over.component';

describe('GameOverComponent', () => {
  let component: GameOverComponent;
  let fixture: ComponentFixture<GameOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameOverComponent],
      providers: [
        GameService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameOverComponent);
    component = fixture.componentInstance;
    component.game = new Game(new Board());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
