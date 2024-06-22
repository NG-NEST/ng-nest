import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XMessageComponent } from './message.component';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XMessagePrefix } from './message.property';
import { XMessageService } from './message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XConfig, XPlace, X_CONFIG } from '@ng-nest/ui/core';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XMessagePrefix, () => {
  let config: XConfig = {
    components: {
      message: {
        placement: 'center'
      }
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXMessageComponent, TestXMessageTypeComponent, TestXMessageDisplayTypeComponent],
      imports: [BrowserAnimationsModule,  XButtonComponent],
      providers: [
        {
          provide: X_CONFIG,
          useValue: config
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
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
  describe(`type.`, () => {
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
  describe(`displayYype.`, () => {
    let fixture: ComponentFixture<TestXMessageDisplayTypeComponent>;
    let message: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXMessageDisplayTypeComponent);
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
    
    <div class="box">
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
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .box {
        width: 16rem;
        height: 10rem;
        padding: 0.5rem;
        background-color: rgba(0, 0, 0, 0.03);
      }
      .row {
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .box .row:first-child {
        align-items: flex-start;
      }
      .box .row:last-child {
        align-items: flex-end;
      }
    `
  ]
})
class TestXMessageComponent {
  constructor(private message: XMessageService) {}
  open(place: XPlace, title: string) {
    this.message.info({ title: `${title} 消息`, placement: place });
  }
}

@Component({
  template: `
    
    <div class="row">
      <x-button (click)="message.success('成功提示')">成功提示</x-button>
      <x-button (click)="message.info('消息提示')">消息提示</x-button>
      <x-button (click)="message.warning('警告提示')">警告提示</x-button>
      <x-button (click)="message.error('错误提示')">错误提示</x-button>
    </div>
    <div class="row">
      <x-button type="success" plain (click)="message.success({ title: '成功提示', effect: 'light' })"
        >成功提示</x-button
      >
      <x-button type="info" plain (click)="message.info({ title: '消息提示', effect: 'light' })">消息提示</x-button>
      <x-button type="warning" plain (click)="message.warning({ title: '警告提示', effect: 'light' })"
        >警告提示</x-button
      >
      <x-button type="danger" plain (click)="message.error({ title: '错误提示', effect: 'light' })">错误提示</x-button>
    </div>
    <div class="row">
      <x-button type="success" (click)="message.success({ title: '成功提示', effect: 'dark' })">成功提示</x-button>
      <x-button type="info" (click)="message.info({ title: '消息提示', effect: 'dark' })">消息提示</x-button>
      <x-button type="warning" (click)="message.warning({ title: '警告提示', effect: 'dark' })">警告提示</x-button>
      <x-button type="danger" (click)="message.error({ title: '错误提示', effect: 'dark' })">错误提示</x-button>
    </div>
    <div class="row">
      <x-button type="success" plain (click)="message.success({ title: '成功提示', hideClose: false })"
        >成功提示，包含关闭按钮</x-button
      >
      <x-button type="success" (click)="message.success({ title: '成功提示', hideClose: false, effect: 'dark' })"
        >成功提示，包含关闭按钮</x-button
      >
    </div>
    <div class="row">
      <x-button type="success" (click)="customClick()">自定义关闭1</x-button>
    </div>
    <div class="row">
      <x-button type="success" (click)="customClick()">自定义关闭2</x-button>
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
class TestXMessageTypeComponent {
  i = 1;
  constructor(private message: XMessageService) {}

  customClick() {
    this.message.success({
      title: this.i++,
      content: '214',
      displayType: 'single'
    });
  }
}

@Component({
  template: `
    
    <div class="box">
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
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .box {
        width: 16rem;
        height: 10rem;
        padding: 0.5rem;
        background-color: rgba(0, 0, 0, 0.03);
      }
      .row {
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .box .row:first-child {
        align-items: flex-start;
      }
      .box .row:last-child {
        align-items: flex-end;
      }
    `
  ]
})
class TestXMessageDisplayTypeComponent {
  i = 1;
  constructor(private message: XMessageService) {}

  open(place: XPlace, title: string) {
    this.message.info({ title: `${this.i++} ${title} 单一模式`, placement: place, displayType: 'single' });
  }
}
