import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameService } from 'src/model/game.service';

import { GameOverComponent } from './gameover.component';

describe('GameOverComponent', () => {
  let component: GameOverComponent;
  let fixture: ComponentFixture<GameOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameOverComponent],
      providers: [
        GameService
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
