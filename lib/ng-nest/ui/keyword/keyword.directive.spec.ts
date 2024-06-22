import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XKeywordPrefix } from './keyword.property';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XKeywordDirective } from '@ng-nest/ui/keyword';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XKeywordPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXKeywordComponent],
      imports: [XKeywordDirective, XButtonComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXKeywordComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXKeywordComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XKeywordDirective));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-keyword',
  template: `
    <div class="row">
      <span x-keyword></span>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 1rem;
      }
      .row > x-button:not(:first-child) {
        margin-left: 1rem;
      }
    `
  ]
})
class TestXKeywordComponent {}
