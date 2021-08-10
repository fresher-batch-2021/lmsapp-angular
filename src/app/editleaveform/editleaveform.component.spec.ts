import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditleaveformComponent } from './editleaveform.component';

describe('EditleaveformComponent', () => {
  let component: EditleaveformComponent;
  let fixture: ComponentFixture<EditleaveformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditleaveformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditleaveformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
