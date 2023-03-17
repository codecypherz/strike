import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Board } from 'src/model/board';
import { GameService } from 'src/model/game.service';
import { GameService } from 'src/model/game.service';
import { TurnService } from 'src/model/turn.service';
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
        Board,
        GameService,
        TurnService,
        GameService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
