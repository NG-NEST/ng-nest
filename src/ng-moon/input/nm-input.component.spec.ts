import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NmInputComponent } from './nm-input.component';

describe('NmInputComponent', () => {
  let component: NmInputComponent;
  let fixture: ComponentFixture<NmInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NmInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NmInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
