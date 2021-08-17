import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAnalysisComponent } from './leave-analysis.component';

describe('LeaveAnalysisComponent', () => {
  let component: LeaveAnalysisComponent;
  let fixture: ComponentFixture<LeaveAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
