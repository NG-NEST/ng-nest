import { XIconModule } from "@ng-nest/ui/icon";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XCardComponent } from "./card.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XFenceModule } from "@ng-nest/ui/fence";
import { XCardModule } from "./card.module";
import { FormsModule } from "@angular/forms";
import { XCardPrefix } from "./card.type";
import { XButtonModule } from "@ng-nest/ui/button";
import { XContainerModule } from "@ng-nest/ui/container";

describe(XCardPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XCardModule, XButtonModule, XContainerModule, XFenceModule, XIconModule],
      declarations: [TestXCardComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXCardComponent>;
    let card: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCardComponent);
      fixture.detectChanges();
      card = fixture.debugElement.query(By.directive(XCardComponent));
    });
    it("should create.", () => {
      expect(card).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-card width="20rem">
        <ul>
          <li *ngFor="let item of list">{{ "列表内容 " + item }}</li>
        </ul>
      </x-card>
    </div>
    <div class="row">
      <x-card width="20rem" [header]="header">
        <ng-template #header>
          <span>卡片名称</span>
          <x-button type="text" label="操作按钮"></x-button>
        </ng-template>
        <ul>
          <li *ngFor="let item of list">{{ "列表内容 " + item }}</li>
        </ul>
      </x-card>
    </div>
    <div class="row">
      <x-card width="16rem" class="card" [bodyStyle]="{ padding: 0 }">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
        <div class="bottom">
          <p>好吃的汉堡</p>
          <div class="time">
            <span>2019-10-11 22:10</span>
            <x-button type="text" label="操作按钮"></x-button>
          </div>
        </div>
      </x-card>
    </div>
    <div class="row ">
      <x-row space="1">
        <x-col span="8">
          <x-card shadow="always">
            总是显示
          </x-card>
        </x-col>
        <x-col span="8">
          <x-card shadow="hover">
            鼠标悬浮时显示
          </x-card>
        </x-col>
        <x-col span="8">
          <x-card shadow="never">
            从不显示
          </x-card>
        </x-col>
      </x-row>
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .row x-card:not(:first-child) {
        margin-left: 2rem;
      }
      .row .card img {
        width: 100%;
        display: block;
      }
      .row .card .bottom {
        padding: 0.625rem;
      }
      .row .card .bottom > p {
        margin: 0;
        font-size: 1rem;
      }
      .row .card .bottom > .time {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .row .card .bottom > .time > span {
        color: gray;
      }
    `
  ]
})
class TestXCardComponent {
  list = [1, 2, 3, 4, 5, 6];
}
