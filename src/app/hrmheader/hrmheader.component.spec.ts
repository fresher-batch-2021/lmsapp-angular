import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmheaderComponent } from './hrmheader.component';

describe('HrmheaderComponent', () => {
  let component: HrmheaderComponent;
  let fixture: ComponentFixture<HrmheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrmheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
