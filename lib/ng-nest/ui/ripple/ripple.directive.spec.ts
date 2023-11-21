import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XRippleDirective } from '@ng-nest/ui/ripple';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRipplePrefix } from './ripple.property';
import { XButtonComponent } from '@ng-nest/ui/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XRipplePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, XRippleDirective, XButtonComponent],
      declarations: [TestXRippleDirective]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXRippleDirective>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRippleDirective);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRippleDirective));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-ripple',
  template: `
    <div class="row">
      <x-button>默认按钮</x-button>
      <x-button type="primary">主要按钮</x-button>
      <x-button type="success">成功按钮</x-button>
      <x-button type="warning">警告按钮</x-button>
      <x-button type="danger">危险按钮</x-button>
      <x-button type="info">信息按钮</x-button>
    </div>
    <div class="row">
      <x-button plain>朴素按钮</x-button>
      <x-button type="primary" plain>主要按钮</x-button>
      <x-button type="success" plain>成功按钮</x-button>
      <x-button type="warning" plain>警告按钮</x-button>
      <x-button type="danger" plain>危险按钮</x-button>
      <x-button type="info" plain>信息按钮</x-button>
    </div>
    <div class="row">
      <x-button round>圆角按钮</x-button>
      <x-button type="primary" round>主要按钮</x-button>
      <x-button type="success" round>成功按钮</x-button>
      <x-button type="warning" round>警告按钮</x-button>
      <x-button type="danger" round>危险按钮</x-button>
      <x-button type="info" round>信息按钮</x-button>
    </div>
    <div class="row">
      <x-button icon="fto-search" circle></x-button>
      <x-button icon="fto-edit-3" type="primary" circle></x-button>
      <x-button icon="fto-check" type="success" circle></x-button>
      <x-button icon="fto-star" type="warning" circle></x-button>
      <x-button icon="fto-trash-2" type="danger" circle></x-button>
      <x-button icon="fto-trash" type="info" circle></x-button>
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
class TestXRippleDirective {}
