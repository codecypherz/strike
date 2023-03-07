import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Board } from 'src/model/board';
import { BoardService } from 'src/model/board.service';
import { Direction } from 'src/model/direction';
import { GameService } from 'src/model/game.service';
import { Player } from 'src/model/player';
import { TurnService } from 'src/model/turn.service';

import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let player = new Player('player-id', 'Test Player', Direction.RIGHT);
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerComponent],
      providers: [
        Board,
        GameService,
        TurnService,
        BoardService
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
