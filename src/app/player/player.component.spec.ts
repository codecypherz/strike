import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Board } from 'src/model/board';
import { Direction } from 'src/model/direction';
import { GameService } from 'src/model/game.service';
import { Player } from 'src/model/player';

import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let player = new Player(true, 'Test Player', Direction.RIGHT);
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerComponent],
      providers: [
        GameService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    component.player = player;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
