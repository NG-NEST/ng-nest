import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XNotificationPrefix } from './notification.property';
import { XNotificationService } from './notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XCorner } from '@ng-nest/ui/core';
import { XThemeComponent } from '@ng-nest/ui/theme';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { XNotificationComponent } from '@ng-nest/ui/notification';

describe(XNotificationPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, XThemeComponent, XButtonComponent],
      declarations: [TestXNotificationComponent, TestXNotificationTypeComponent]
    }).compileComponents();
  });
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
    <x-theme showDark></x-theme>
    <div class="row">
      <x-button (click)="open('top-start', '上左')">上左</x-button>
      <x-button (click)="open('top-end', '上右')">上右(默认)</x-button>
      <x-button (click)="open('bottom-start', '下左')">下左</x-button>
      <x-button (click)="open('bottom-end', '下右')">下右</x-button>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row {
        width: 16rem;
        height: 10rem;
        padding: 0.5rem;
        background-color: rgba(0, 0, 0, 0.03);
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
      content:
        '天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。',
      placement: place
    });
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
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
  content =
    '天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。';
  constructor() {}
}
