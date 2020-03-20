import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XAffixComponent } from './affix.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XAffixModule } from './affix.module';
import { FormsModule } from '@angular/forms';
import { XAffixPrefix } from './affix.type';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';

describe(XAffixPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XAffixModule, XButtonModule, XContainerModule, XFenceModule, XIconModule],
      declarations: [TestXAffixComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXAffixComponent>;
    let affix: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAffixComponent);
      fixture.detectChanges();
      affix = fixture.debugElement.query(By.directive(XAffixComponent));
    });
    it('should create.', () => {
      expect(affix).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-affix>
        <x-button>滚动条下滑，我将固定到顶部</x-button>
      </x-affix>
      <x-affix offset-top="5rem">
        <x-button>滚动条下滑，我与顶部距离5rem</x-button>
      </x-affix>
    </div>
    <div class="row scroll">
      <div class="box">
        <br />
        <br />
        <br />
        <x-affix>
          <x-button>范围内固定</x-button>
        </x-affix>
      </div>
    </div>
  `,
  styles: [
    `
      .row {
        height: 50rem;
      }
      .row.scroll {
        height: 15rem;
        width: 10rem;
        background-color: rgba(0, 0, 0, 0.1);
        overflow: auto;
      }
      .row .box {
        height: 40rem;
      }
      .row x-affix:not(:first-child) {
        margin-left: 1rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAffixComponent {}
