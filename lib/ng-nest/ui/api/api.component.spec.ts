import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XApiComponent } from '@ng-nest/ui/api';
import { XApiPrefix } from './api.property';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XApiPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, XApiComponent],
      declarations: [TestXApiComponent]
    }).compileComponents();
  });
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
