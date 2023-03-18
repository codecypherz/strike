import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Direction } from 'src/model/direction';
import { GameService } from 'src/model/game.service';
import { Player } from 'src/model/player';
import { PlayerComponent } from '../player/player.component';

import { PlayersComponent } from './players.component';

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PlayerComponent,
        PlayersComponent
      ],
      providers: [
        GameService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    component.player1 = new Player(true, 'Player 1', Direction.DOWN);
    component.player2 = new Player(false, 'Player 2', Direction.UP);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
