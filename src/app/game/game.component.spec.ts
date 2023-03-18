import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Board } from 'src/model/board';
import { Game } from 'src/model/game';
import { GameService } from 'src/model/game.service';
import { BoardComponent } from '../board/board.component';
import { CellComponent } from '../cell/cell.component';
import { GameOverComponent } from '../gameover/gameover.component';
import { PieceComponent } from '../piece/piece.component';
import { PlayerComponent } from '../player/player.component';
import { PlayersComponent } from '../players/players.component';
import { AppRoutingModule } from '../routing/approuting.module';
import { SelectedComponent } from '../selected/selected.component';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
        CellComponent,
        GameComponent,
        GameOverComponent,
        PlayerComponent,
        PlayersComponent,
        PieceComponent,
        SelectedComponent
      ],
      imports: [
        AppRoutingModule
      ],
      providers: [
        GameService
      ],
    }).compileComponents();

    let activatedRoute = TestBed.inject(ActivatedRoute);
    let game = new Game(new Board());
    activatedRoute.data = of({'game': game});
    
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});