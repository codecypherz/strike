import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameChoiceComponent } from './gamechoice.component';

describe('GameChoiceComponent', () => {
  let component: GameChoiceComponent;
  let fixture: ComponentFixture<GameChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
