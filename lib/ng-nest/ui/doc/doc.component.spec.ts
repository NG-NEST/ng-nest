import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XDocComponent } from './doc.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDocModule } from '@ng-nest/ui/doc';
import { XDocPrefix } from './doc.property';

describe(XDocPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XDocModule],
      declarations: [TestXDocComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXDocComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDocComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XDocComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
    it('should className.', () => {
      fixture.detectChanges();
      expect(element.classList).toContain(XDocPrefix);
    });
  });
});

@Component({
  selector: 'test-x-doc',
  template: ` <x-doc>x-doc</x-doc> `
})
class TestXDocComponent {}
