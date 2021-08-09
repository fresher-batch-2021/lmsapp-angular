import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrpageComponent } from './hrpage.component';

describe('HrpageComponent', () => {
  let component: HrpageComponent;
  let fixture: ComponentFixture<HrpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
