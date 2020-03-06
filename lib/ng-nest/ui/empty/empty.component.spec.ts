import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XEmptyComponent } from './empty.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XEmptyModule } from './empty.module';
import { FormsModule } from '@angular/forms';
import { XEmptyPrefix } from './empty.type';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';

describe(XEmptyPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XEmptyModule, XButtonModule, XContainerModule, XFenceModule, XIconModule],
      declarations: [TestXEmptyComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXEmptyComponent>;
    let empty: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXEmptyComponent);
      fixture.detectChanges();
      empty = fixture.debugElement.query(By.directive(XEmptyComponent));
    });
    it('should create.', () => {
      expect(empty).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-empty></x-empty>
    </div>
    <div class="row">
      <x-empty
        img="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      ></x-empty>
    </div>
    <div class="row">
      <x-empty content="没有数据了"></x-empty>
    </div>
    <div class="row">
      <x-empty [img]="imgTemp">
        <ng-template #imgTemp><x-icon type="fto-user"></x-icon></ng-template>
      </x-empty>
    </div>
    <div class="row">
      <x-empty [content]="contentTemp">
        <ng-template #contentTemp>
          <span>没有数据</span>
          <x-button type="primary">重新请求</x-button>
        </ng-template>
      </x-empty>
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 2rem;
      }
      .row x-empty .x-button {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXEmptyComponent {}
