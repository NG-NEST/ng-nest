import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XInnerComponent } from '@ng-nest/ui/inner';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XInnerPrefix } from './inner.property';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XInnerPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [TestXInnerComponent],
    imports: [XInnerComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXInnerComponent>;
    let testComponent: TestXInnerComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInnerComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XInnerComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
    it('should className.', () => {
      fixture.detectChanges();
      expect(element.classList).toContain(XInnerPrefix);
    });
    it('change padding.', () => {
      testComponent.padding = '1rem 0';
      fixture.detectChanges();
      expect(element.classList).toContain(XInnerPrefix);
    });
  });
});

@Component({
  selector: 'test-x-inner',
  template: ` <x-inner [padding]="padding">x-inner</x-inner> `
})
class TestXInnerComponent {
  padding: string = '1rem';
}
