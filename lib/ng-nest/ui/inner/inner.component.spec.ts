import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XInnerComponent } from '@ng-nest/ui/inner';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XInnerPrefix } from './inner.property';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XInnerPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXInnerComponent],
      imports: [XInnerComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXInnerComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInnerComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XInnerComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
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
