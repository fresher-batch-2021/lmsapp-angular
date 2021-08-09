import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingLeaveComponent } from './upcoming-leave.component';

describe('UpcomingLeaveComponent', () => {
  let component: UpcomingLeaveComponent;
  let fixture: ComponentFixture<UpcomingLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
