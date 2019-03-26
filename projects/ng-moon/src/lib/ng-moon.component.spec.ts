import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMoonComponent } from './ng-moon.component';

describe('NgMoonComponent', () => {
  let component: NgMoonComponent;
  let fixture: ComponentFixture<NgMoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
