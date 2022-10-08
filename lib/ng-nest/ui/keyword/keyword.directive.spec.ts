import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XKeywordDirective } from './keyword.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XKeywordPrefix } from './keyword.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XKeywordModule } from './keyword.module';

describe(XKeywordPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XKeywordModule, XButtonModule],
      declarations: [TestXKeywordComponent]
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
