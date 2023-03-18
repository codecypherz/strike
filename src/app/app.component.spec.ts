import { TestBed } from '@angular/core/testing';
import { GameService } from 'src/model/game.service';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GameOverComponent } from './gameover/gameover.component';
import { PlayerComponent } from './player/player.component';
import { PlayersComponent } from './players/players.component';
import { AppRoutingModule } from './routing/approuting.module';
import { SelectedComponent } from './selected/selected.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GameOverComponent,
        SelectedComponent,
        PlayersComponent,
        PlayerComponent,
        BoardComponent
      ],
      imports: [
        AppRoutingModule
      ],
      providers: [
        GameService
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
