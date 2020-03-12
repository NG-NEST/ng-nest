import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XMessageBoxComponent } from './message-box.component';
import { Component, DebugElement, ViewChild, TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XMessageBoxModule } from './message-box.module';
import { XButtonModule } from '@ng-nest/ui/button';
import { XMessageBoxPrefix, XMessageBoxAction } from './message-box.type';
import { XMessageBoxService } from './message-box.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XPlace } from '@ng-nest/ui/core';
import { XMessageModule, XMessageService } from '@ng-nest/ui/message';

describe(XMessageBoxPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XMessageBoxModule, XButtonModule, XMessageModule],
      declarations: [TestXMessageBoxComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXMessageBoxComponent>;
    let messageBox: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXMessageBoxComponent);
      fixture.detectChanges();
      messageBox = fixture.debugElement.query(By.directive(XMessageBoxComponent));
    });
    it('should create.', () => {
      expect(messageBox).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-button (click)="alert('top-start', '上左')">上左</x-button>
      <x-button (click)="alert('top', '上')">上</x-button>
      <x-button (click)="alert('top-end', '上右')">上右</x-button>
    </div>
    <div class="row">
      <x-button (click)="alert('left', '左')">左</x-button>
      <x-button (click)="alert('center', '中')">中(默认)</x-button>
      <x-button (click)="alert('right', '右')">右</x-button>
    </div>
    <div class="row">
      <x-button (click)="alert('bottom-start', '下左')">下左</x-button>
      <x-button (click)="alert('bottom', '下')">下</x-button>
      <x-button (click)="alert('bottom-end', '下右')">下右</x-button>
    </div>

    <div class="row">
      <x-button (click)="confirm()">消息确认</x-button>
    </div>

    <div class="row">
      <x-button (click)="prompt()">提交内容</x-button>
    </div>

    <div class="row">
      <x-button (click)="alertCustom()">自定义弹框内容</x-button>
      <ng-template #contentTpl>
        <table class="custom-table">
          <tr>
            <th>用户</th>
            <th>邮箱</th>
            <th>状态</th>
          </tr>
          <tr>
            <td>admin</td>
            <td>admin@admin.com</td>
            <td>启用</td>
          </tr>
          <tr>
            <td>john</td>
            <td>john@john.com</td>
            <td>禁用</td>
          </tr>
          <tr>
            <td>jack</td>
            <td>jack@jack.com</td>
            <td>启用</td>
          </tr>
        </table>
      </ng-template>
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
      .custom-table {
        border-collapse: collapse;
        width: 100%;
      }
      .custom-table tr {
        border-bottom: 0.0625rem solid var(--x-border);
      }
      .custom-table tr th,
      .custom-table tr td {
        padding: 0.25rem 0.325rem;
        text-align: left;
      }
    `
  ]
})
class TestXMessageBoxComponent {
  @ViewChild('contentTpl', { static: true }) contentTpl: TemplateRef<void>;
  constructor(private msgBox: XMessageBoxService, private message: XMessageService) {}
  alert(place: XPlace, title: string) {
    this.msgBox.alert({
      title: '弹框 ' + title,
      content: '这是一段内容',
      placement: place,
      callback: (action: XMessageBoxAction) => this.message.info('action: ' + action)
    });
  }
  confirm() {
    this.msgBox.confirm({
      title: '提示',
      content: '此操作将永久删除此条数据, 是否继续？',
      type: 'warning',
      callback: (action: XMessageBoxAction) => {
        if (action === 'confirm') {
          // 业务处理......
          this.message.success('删除成功！');
        } else {
          this.message.info('已取消删除！');
        }
      }
    });
  }
  prompt() {
    this.msgBox.prompt({
      title: '提交内容',
      content: '请输入邮箱',
      inputValue: 'ngnest@163',
      inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputErrorMessage: '邮箱格式不正确',
      callback: (action: XMessageBoxAction, msg) => {
        if (action === 'confirm') {
          // 业务处理......
          this.message.success('邮箱：' + msg);
        } else {
          this.message.info('已取消提交内容！');
        }
      }
    });
  }
  alertCustom() {
    this.msgBox.alert({
      title: '自定义内容',
      content: this.contentTpl,
      backdropClose: true,
      callback: (action: XMessageBoxAction) => this.message.info('action: ' + action)
    });
  }
}
