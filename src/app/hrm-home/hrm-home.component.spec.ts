import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmHomeComponent } from './hrm-home.component';

describe('HrmHomeComponent', () => {
  let component: HrmHomeComponent;
  let fixture: ComponentFixture<HrmHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrmHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
