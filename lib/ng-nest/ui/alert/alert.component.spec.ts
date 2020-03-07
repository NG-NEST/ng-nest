import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XAlertComponent } from './alert.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XAlertModule } from './alert.module';
import { FormsModule } from '@angular/forms';
import { XAlertPrefix } from './alert.type';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';

describe(XAlertPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        XAlertModule,
        XButtonModule,
        XContainerModule,
        XFenceModule,
        XIconModule
      ],
      declarations: [TestXAlertComponent]
    }).compileComponents();
  }));
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
    <div class="row">
      <x-alert label="成功提示" type="success"> </x-alert>
      <x-alert label="消息提示" type="info"> </x-alert>
      <x-alert label="警告提示" type="warning"> </x-alert>
      <x-alert label="错误提示" type="error"> </x-alert>
    </div>
    <div class="row">
      <x-alert label="成功提示" type="success" effect="dark"> </x-alert>
      <x-alert label="消息提示" type="info" effect="dark"> </x-alert>
      <x-alert label="警告提示" type="warning" effect="dark"> </x-alert>
      <x-alert label="错误提示" type="error" effect="dark"> </x-alert>
    </div>
    <div class="row">
      <x-alert label="不可关闭" type="success" hide-close> </x-alert>
      <x-alert label="自定义关闭内容" type="info" close-text="知道了"> </x-alert>
      <x-alert label="关闭回调" type="warning" (close)="close()"> </x-alert>
    </div>
    <div class="row">
      <x-alert label="成功提示" type="success" show-icon> </x-alert>
      <x-alert label="消息提示" type="info" show-icon> </x-alert>
      <x-alert label="警告提示" type="warning" show-icon> </x-alert>
      <x-alert label="错误提示" type="error" show-icon> </x-alert>
    </div>
    <div class="row">
      <x-alert label="提示信息" type="success" [description]="description"> </x-alert>
    </div>
    <div class="row">
      <x-alert label="成功提示" type="success" [description]="description" show-icon> </x-alert>
      <x-alert label="消息提示" type="info" [description]="description" show-icon> </x-alert>
      <x-alert label="警告提示" type="warning" [description]="description" show-icon> </x-alert>
      <x-alert label="错误提示" type="error" [description]="description" show-icon> </x-alert>
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .row x-alert:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXAlertComponent {
  description =
    '天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。';
  close() {
    console.log('关闭回调');
  }
}
