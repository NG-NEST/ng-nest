import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XNotificationComponent } from './notification.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XNotificationModule } from './notification.module';
import { XButtonModule } from '@ng-nest/ui/button';
import { XNotificationPrefix } from './notification.type';
import { XNotificationService } from './notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XCorner } from '@ng-nest/ui/core';

describe(XNotificationPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XNotificationModule, XButtonModule],
      declarations: [TestXNotificationComponent, TestXNotificationTypeComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXNotificationComponent>;
    let notification: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXNotificationComponent);
      fixture.detectChanges();
      notification = fixture.debugElement.query(By.directive(XNotificationComponent));
    });
    it('should create.', () => {
      expect(notification).toBeDefined();
    });
  });
  describe(`type.`, () => {
    let fixture: ComponentFixture<TestXNotificationTypeComponent>;
    let notification: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXNotificationTypeComponent);
      fixture.detectChanges();
      notification = fixture.debugElement.query(By.directive(XNotificationComponent));
    });
    it('should create.', () => {
      expect(notification).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-button (click)="open('top-start', '上左')">上左</x-button>
      <x-button (click)="open('top-end', '上右')">上右</x-button>
      <x-button (click)="open('bottom-start', '下左')">下左</x-button>
      <x-button (click)="open('bottom-end', '下右')">下右</x-button>
    </div>
  `,
  styles: [
    `
      .row {
        width: 16rem;
        height: 10rem;
        padding: 0.5rem;
        background-color: rgba(0, 0, 0, 0.1);
        position: relative;
      }
      .row x-button {
        position: absolute;
      }
      .row x-button:nth-child(2) {
        right: 0.5rem;
      }
      .row x-button:nth-child(3) {
        left: 0.5rem;
        bottom: 0.5rem;
      }
      .row x-button:nth-child(4) {
        right: 0.5rem;
        bottom: 0.5rem;
      }
    `
  ]
})
class TestXNotificationComponent {
  constructor(private notification: XNotificationService) {}
  open(place: XCorner, title: string) {
    this.notification.info({
      title: `${title} 消息`,
      content: '这个是内容信息这个是内容信息这个是内容信息这个是内容信息这个是内容信息这个是内容信息',
      placement: place
    });
  }
}

@Component({
  template: `
    <div class="row">
      <x-button (click)="notification.success({ title: '成功提示', content: content })">成功提示</x-button>
      <x-button (click)="notification.info({ title: '消息提示', content: content })">消息提示</x-button>
      <x-button (click)="notification.warning({ title: '警告提示', content: content })">警告提示</x-button>
      <x-button (click)="notification.error({ title: '错误提示', content: content })">错误提示</x-button>
    </div>
    <div class="row">
      <x-button
        type="success"
        plain
        (click)="notification.success({ title: '成功提示', content: content, effect: 'light' })"
        >成功提示</x-button
      >
      <x-button type="info" plain (click)="notification.info({ title: '消息提示', content: content, effect: 'light' })"
        >消息提示</x-button
      >
      <x-button
        type="warning"
        plain
        (click)="notification.warning({ title: '警告提示', content: content, effect: 'light' })"
        >警告提示</x-button
      >
      <x-button
        type="danger"
        plain
        (click)="notification.error({ title: '错误提示', content: content, effect: 'light' })"
        >错误提示</x-button
      >
    </div>
    <div class="row">
      <x-button type="success" (click)="notification.success({ title: '成功提示', content: content, effect: 'dark' })"
        >成功提示</x-button
      >
      <x-button type="info" (click)="notification.info({ title: '消息提示', content: content, effect: 'dark' })"
        >消息提示</x-button
      >
      <x-button type="warning" (click)="notification.warning({ title: '警告提示', content: content, effect: 'dark' })"
        >警告提示</x-button
      >
      <x-button type="danger" (click)="notification.error({ title: '错误提示', content: content, effect: 'dark' })"
        >错误提示</x-button
      >
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .row x-button:not(:first-child) {
        margin-left: 1rem;
      }
    `
  ]
})
class TestXNotificationTypeComponent {
  content = '这个是内容信息这个是内容信息这个是内容信息这个是内容信息这个是内容信息这个是内容信息';
  constructor(private notification: XNotificationService) {}
}
