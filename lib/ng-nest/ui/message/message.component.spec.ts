import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XMessageComponent } from './message.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XMessageModule } from './message.module';
import { XButtonModule } from '@ng-nest/ui/button';
import { XMessagePrefix } from './message.type';
import { XMessageService } from './message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XPlace } from '@ng-nest/ui/core';

describe(XMessagePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XMessageModule, XButtonModule],
      declarations: [TestXMessageComponent, TestXMessageTypeComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXMessageComponent>;
    let message: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXMessageComponent);
      fixture.detectChanges();
      message = fixture.debugElement.query(By.directive(XMessageComponent));
    });
    it('should create.', () => {
      expect(message).toBeDefined();
    });
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXMessageTypeComponent>;
    let message: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXMessageTypeComponent);
      fixture.detectChanges();
      message = fixture.debugElement.query(By.directive(XMessageComponent));
    });
    it('should create.', () => {
      expect(message).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-button (click)="open('top-start', '上左')">上左</x-button>
      <x-button (click)="open('top', '上')">上(默认)</x-button>
      <x-button (click)="open('top-end', '上右')">上右</x-button>
    </div>
    <div class="row">
      <x-button (click)="open('left', '左')">左</x-button>
      <x-button (click)="open('center', '中')">中</x-button>
      <x-button (click)="open('right', '右')">右</x-button>
    </div>
    <div class="row">
      <x-button (click)="open('bottom-start', '下左')">下左</x-button>
      <x-button (click)="open('bottom', '下')">下</x-button>
      <x-button (click)="open('bottom-end', '下右')">下右</x-button>
    </div>
  `,
  styles: [
    `
      .row {
        width: 20rem;
        display: flex;
        justify-content: space-between;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .row x-button:not(:first-child) {
      }
    `
  ]
})
class TestXMessageComponent {
  constructor(private message: XMessageService) {}
  open(place: XPlace, label: string) {
    this.message.info({ label: `${label} 消息`, placement: place });
  }
}

@Component({
  template: `
    <div class="row">
      <x-button type="success" plain (click)="message.success('成功提示')">成功提示</x-button>
      <x-button type="info" plain (click)="message.info('消息提示')">消息提示</x-button>
      <x-button type="warning" plain (click)="message.warning('警告提示')">警告提示</x-button>
      <x-button type="danger" plain (click)="message.error('错误提示')">错误提示</x-button>
    </div>
    <div class="row">
      <x-button type="success" (click)="message.success({ label: '成功提示', effect: 'dark' })">成功提示</x-button>
      <x-button type="info" (click)="message.info({ label: '消息提示', effect: 'dark' })">消息提示</x-button>
      <x-button type="warning" (click)="message.warning({ label: '警告提示', effect: 'dark' })">警告提示</x-button>
      <x-button type="danger" (click)="message.error({ label: '错误提示', effect: 'dark' })">错误提示</x-button>
    </div>
    <div class="row">
      <x-button type="success" plain (click)="message.success({ label: '成功提示', hideClose: false })"
        >成功提示，包含关闭按钮</x-button
      >
      <x-button type="success" (click)="message.success({ label: '成功提示', hideClose: false, effect: 'dark' })"
        >成功提示，包含关闭按钮</x-button
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
class TestXMessageTypeComponent {
  constructor(private message: XMessageService) {}
}
