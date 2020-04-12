import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XApiComponent } from './api.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XApiModule } from './api.module';
import { XApiPrefix } from './api.property';

describe(XApiPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XApiModule],
      declarations: [TestXApiComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXApiComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXApiComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XApiComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
    it('should className.', () => {
      fixture.detectChanges();
      expect(element.classList).toContain(XApiPrefix);
    });
  });
});

@Component({
  selector: 'test-x-api',
  template: ` <x-api>x-api</x-api> `
})
class TestXApiComponent {}
