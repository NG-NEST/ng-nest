import { XButtonModule } from "@ng-nest/ui/button";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XPopoverDirective } from "./popover.directive";
import { Component, DebugElement, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XPopoverModule } from "./popover.module";
import { XPopoverPrefix } from "./popover.type";
import { interval } from "rxjs";
import { XIconModule } from "@ng-nest/ui/icon";

describe(XPopoverPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XPopoverModule, XButtonModule, XIconModule],
      declarations: [TestXPopoverComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXPopoverComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXPopoverComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XPopoverDirective));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-x-popover",
  template: `
    <div class="box">
      <div class="top">
        <x-button
          x-popover
          content="上左上左上左上左上左上左上左上左上左上左"
          placement="top-start"
          label="上左"
        ></x-button>
        <x-button x-popover content="上中上中上中上中上中上中上中上中上中上中" placement="top" label="上中"></x-button>
        <x-button
          x-popover
          content="上右上右上右上右上右上右上右上右上右上右"
          placement="top-end"
          label="上右"
        ></x-button>
      </div>
      <div class="left">
        <x-button
          x-popover
          content="左上左上左上左上左上左上左上左上左上左上"
          placement="left-start"
          label="左上"
        ></x-button
        ><x-button x-popover content="左中左中左中左中左中左中左中左中左中左中" placement="left" label="左中"></x-button
        ><x-button
          x-popover
          content="左下左下左下左下左下左下左下左下左下左下"
          placement="left-end"
          label="左下"
        ></x-button>
      </div>
      <div class="right">
        <x-button
          x-popover
          content="右上右上右上右上右上右上右上右上右上右上"
          placement="right-start"
          label="右上"
        ></x-button
        ><x-button
          x-popover
          content="右中右中右中右中右中右中右中右中右中右中"
          placement="right"
          label="右中"
        ></x-button
        ><x-button
          x-popover
          content="右下右下右下右下右下右下右下右下右下右下"
          placement="right-end"
          label="右下"
        ></x-button>
      </div>
      <div class="bottom">
        <x-button
          x-popover
          content="下左下左下左下左下左下左下左下左下左下左"
          placement="bottom-start"
          label="下左"
        ></x-button
        ><x-button
          x-popover
          content="下中下中下中下中下中下中下中下中下中下中"
          placement="bottom"
          label="下中"
        ></x-button
        ><x-button
          x-popover
          content="下右下右下右下右下右下右下右下右下右下右"
          placement="bottom-end"
          label="下右"
        ></x-button>
      </div>
    </div>
    <div class="box">
      <x-button x-popover content="天将降大任于斯人也" label="click 激活" trigger="click"></x-button>
      <x-popover title="标题" content="天将降大任于斯人也" trigger="click">
        <x-button label="激活"></x-button>
      </x-popover>
      <x-popover [title]="titleTemp" [content]="contentTemp" trigger="click">
        <x-button label="激活"></x-button>
      </x-popover>
      <ng-template #titleTemp> <x-icon type="fto-user"></x-icon><span>用户信息</span> </ng-template>
      <ng-template #contentTemp>
        <ul>
          <li>姓名：李永奇</li>
          <li>邮箱：ng-nest@ng-nest.com</li>
        </ul>
      </ng-template>
    </div>
    <div class="box"></div>
  `,
  styles: [
    `
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
    interval(1).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}
