import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortLeaveFormComponent } from './sort-leave-form.component';

describe('SortLeaveFormComponent', () => {
  let component: SortLeaveFormComponent;
  let fixture: ComponentFixture<SortLeaveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortLeaveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortLeaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
