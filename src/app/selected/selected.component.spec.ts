import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedComponent } from './selected.component';

describe('SelectedComponent', () => {
  let component: SelectedComponent;
  let fixture: ComponentFixture<SelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedComponent ]
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
