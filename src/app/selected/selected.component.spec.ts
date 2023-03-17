import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Board } from 'src/model/board';
import { GameService } from 'src/model/game.service';
import { GameService } from 'src/model/game.service';
import { TurnService } from 'src/model/turn.service';

import { SelectedComponent } from './selected.component';

describe('SelectedComponent', () => {
  let component: SelectedComponent;
  let fixture: ComponentFixture<SelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedComponent ],
      providers: [
        Board,
        GameService,
        TurnService,
        GameService
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
