import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPatternComponent } from '@ng-nest/ui/pattern';
import { PatternPrefix } from './pattern.property';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(PatternPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [TestXPatternComponent],
    imports: [XPatternComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXPatternComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXPatternComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XPatternComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
    it('should className.', () => {
      fixture.detectChanges();
      expect(element.classList).toContain(PatternPrefix);
    });
  });
});

@Component({
  selector: 'test-x-Pattern',
  template: ` <x-pattern>x-pattern</x-pattern> `
})
class TestXPatternComponent {}
