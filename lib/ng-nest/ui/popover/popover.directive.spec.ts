import { XButtonComponent } from '@ng-nest/ui/button';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectorRef, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPopoverDirective } from '@ng-nest/ui/popover';
import { XPopoverPrefix } from './popover.property';
import { interval } from 'rxjs';
import { XIconComponent } from '@ng-nest/ui/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XPopoverPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXPopoverComponent],
      imports: [BrowserAnimationsModule,  XPopoverDirective, XButtonComponent, XIconComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXPopoverComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXPopoverComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XPopoverDirective));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-popover',
  template: `
    
    <div class="box">
      <div class="top">
        <x-button x-popover content="上左上左上左上左上左上左上左上左上左上左" placement="top-start">上左</x-button>
        <x-button x-popover content="上中上中上中上中上中上中上中上中上中上中" placement="top">上中</x-button>
        <x-button x-popover content="上右上右上右上右上右上右上右上右上右上右" placement="top-end">上右</x-button>
      </div>
      <div class="left">
        <x-button x-popover content="左上左上左上左上左上左上左上左上左上左上" placement="left-start">左上</x-button
        ><x-button x-popover content="左中左中左中左中左中左中左中左中左中左中" placement="left">左中</x-button
        ><x-button x-popover content="左下左下左下左下左下左下左下左下左下左下" placement="left-end">左下</x-button>
      </div>
      <div class="right">
        <x-button x-popover content="右上右上右上右上右上右上右上右上右上右上" placement="right-start">右上</x-button
        ><x-button x-popover content="右中右中右中右中右中右中右中右中右中右中" placement="right">右中</x-button
        ><x-button x-popover content="右下右下右下右下右下右下右下右下右下右下" placement="right-end">右下</x-button>
      </div>
      <div class="bottom">
        <x-button x-popover content="下左下左下左下左下左下左下左下左下左下左" placement="bottom-start">下左</x-button
        ><x-button x-popover content="下中下中下中下中下中下中下中下中下中下中" placement="bottom">下中</x-button
        ><x-button x-popover content="下右下右下右下右下右下右下右下右下右下右" placement="bottom-end">下右</x-button>
      </div>
    </div>
    <div class="box">
      <x-button x-popover content="天将降大任于是人也" trigger="click">click 激活</x-button>
      <x-popover title="标题" content="天将降大任于是人也" trigger="click">
        <x-button>激活</x-button>
      </x-popover>
      <x-popover [title]="titleTemp" [content]="contentTemp" trigger="click">
        <x-button>激活</x-button>
      </x-popover>
      <ng-template #titleTemp> <x-icon type="fto-user"></x-icon><span>用户信息</span> </ng-template>
      <ng-template #contentTemp>
        <ul>
          <li>姓名：李永奇</li>
          <li>邮箱：ng-nest&#64;ng-nest.com</li>
        </ul>
      </ng-template>
    </div>
    <div class="box"></div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .box {
        padding: 5rem 10rem;
        width: 45rem;
      }
      .box .top {
        text-align: center;
      }
      .box .left {
        float: left;
        width: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .box .right {
        float: right;
        width: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .box .bottom {
        clear: both;
        text-align: center;
      }
    `
  ]
})
class TestXPopoverComponent {
  constructor(public cdr: ChangeDetectorRef) {
    interval(1).subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}
