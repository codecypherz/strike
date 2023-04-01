import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGameComponent } from './custom-game.component';

describe('CustomGameComponent', () => {
  let component: CustomGameComponent;
  let fixture: ComponentFixture<CustomGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
