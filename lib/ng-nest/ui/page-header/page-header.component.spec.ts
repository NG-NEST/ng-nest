import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XPageHeaderComponent } from './page-header.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPageHeaderModule } from './page-header.module';
import { XPageHeaderPrefix } from './page-header.type';

describe(XPageHeaderPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XPageHeaderModule],
      declarations: [TestXPageHeaderComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXPageHeaderComponent>;
    let pageheader: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXPageHeaderComponent);
      fixture.detectChanges();
      pageheader = fixture.debugElement.query(By.directive(XPageHeaderComponent));
    });
    it('should create.', () => {
      expect(pageheader).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-page-header title="标题" sub-title="小标题"> </x-page-header>
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXPageHeaderComponent {}
