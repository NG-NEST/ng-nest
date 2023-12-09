import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XAlertComponent } from '@ng-nest/ui/alert';
import { FormsModule } from '@angular/forms';
import { XAlertPrefix } from './alert.property';
import { XCountdownComponent } from '@ng-nest/ui/statistic';
import { XAddSeconds } from '@ng-nest/ui/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XThemeComponent } from '@ng-nest/ui/theme';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XAlertPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        FormsModule,
        BrowserAnimationsModule,
        XButtonComponent,
        XAlertComponent,
        XCountdownComponent,
        XThemeComponent
      ],
      declarations: [TestXAlertComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXAlertComponent>;
    let alert: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAlertComponent);
      fixture.detectChanges();
      alert = fixture.debugElement.query(By.directive(XAlertComponent));
    });
    it('should create.', () => {
      expect(alert).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-alert title="成功提示" type="success"> </x-alert>
      <x-alert title="消息提示" type="info"> </x-alert>
      <x-alert title="警告提示" type="warning"> </x-alert>
      <x-alert title="错误提示" type="error"> </x-alert>
    </div>
    <div class="row">
      <x-alert title="成功提示" type="success" effect="dark"> </x-alert>
      <x-alert title="消息提示" type="info" effect="dark"> </x-alert>
      <x-alert title="警告提示" type="warning" effect="dark"> </x-alert>
      <x-alert title="错误提示" type="error" effect="dark"> </x-alert>
    </div>
    <div class="row">
      <x-alert title="成功提示" type="success" effect="white" showIcon> </x-alert>
      <x-alert title="消息提示" type="info" effect="white" showIcon> </x-alert>
      <x-alert title="警告提示" type="warning" effect="white" showIcon> </x-alert>
      <x-alert title="错误提示" type="error" effect="white" showIcon> </x-alert>
    </div>
    <div class="row">
      <x-alert title="不可关闭" type="success" hideClose> </x-alert>
      <x-alert title="自定义关闭内容" type="info" closeText="知道了"> </x-alert>
      <x-alert title="关闭事件" type="warning" (close)="close()"> </x-alert>
      <x-alert
        [title]="titleTpl"
        type="success"
        showIcon
        duration="10000"
        content="秒后关闭"
      ></x-alert>
      <ng-template #titleTpl>
        <x-countdown [value]="deadline" format="ss:SSS"></x-countdown
      ></ng-template>
    </div>
    <div class="row">
      <x-alert title="成功提示" type="success" showIcon> </x-alert>
      <x-alert title="消息提示" type="info" showIcon> </x-alert>
      <x-alert title="警告提示" type="warning" showIcon> </x-alert>
      <x-alert title="错误提示" type="error" showIcon> </x-alert>
    </div>
    <div class="row">
      <x-alert title="提示信息" type="success" [content]="content"> </x-alert>
    </div>
    <div class="row">
      <x-alert title="成功提示" type="success" [content]="content" showIcon> </x-alert>
      <x-alert title="消息提示" type="info" [content]="content" showIcon> </x-alert>
      <x-alert title="警告提示" type="warning" [content]="content" showIcon> </x-alert>
      <x-alert title="错误提示" type="error" [content]="content" showIcon> </x-alert>
    </div>
    <div class="row">
      <x-alert title="控制关闭" type="success" [hide]="hide" (close)="close()" manual showIcon>
      </x-alert>
      <x-button (click)="toggle()">{{ hide ? '显示' : '隐藏' }}</x-button>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .row x-alert:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAlertComponent {
  hide = false;
  content =
    '天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。';

  deadline = XAddSeconds(new Date(), 10).getTime();
  constructor(private cdr: ChangeDetectorRef) {}

  close() {
    this.hide = true;
    // this.cdr.detectChanges();
  }

  toggle() {
    this.hide = !this.hide;
    this.cdr.detectChanges();
  }
}
