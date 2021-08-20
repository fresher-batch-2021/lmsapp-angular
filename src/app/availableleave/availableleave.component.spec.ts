import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableleaveComponent } from './availableleave.component';

describe('AvailableleaveComponent', () => {
  let component: AvailableleaveComponent;
  let fixture: ComponentFixture<AvailableleaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableleaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
