import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameService } from 'src/model/game.service';

import { PieceComponent } from './piece.component';

describe('PieceComponent', () => {
  let component: PieceComponent;
  let fixture: ComponentFixture<PieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieceComponent],
      providers: [
        GameService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
