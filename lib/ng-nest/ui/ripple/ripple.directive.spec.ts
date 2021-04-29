import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XRippleDirective } from './ripple.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRipplePrefix } from './ripple.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XRippleModule } from './ripple.module';

describe(XRipplePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XRippleModule, XButtonModule],
      declarations: [TestXRippleComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXRippleComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRippleComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRippleDirective));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-ripple',
  template: ` <x-button size="large" x-ripple>hello world</x-button> `
})
class TestXRippleComponent {}
