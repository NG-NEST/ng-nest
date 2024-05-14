import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewChild, TemplateRef, ChangeDetectorRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XMessageBoxComponent } from '@ng-nest/ui/message-box';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XMessageBoxPrefix, XMessageBoxAction } from './message-box.property';
import { XMessageBoxService } from './message-box.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XPlace } from '@ng-nest/ui/core';
import { XMessageService } from '@ng-nest/ui/message';
import { XThemeComponent } from '@ng-nest/ui/theme';
import { XI18nService, en_US, zh_CN } from '@ng-nest/ui/i18n';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XMessageBoxPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        XThemeComponent,
        XMessageBoxComponent,
        XButtonComponent
      ],
      declarations: [TestXMessageBoxComponent]
    }).compileComponents();
  });
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
    <x-button (click)="english()">切换为英文</x-button>
    <x-button (click)="chinese()">切换为中文</x-button>
    <x-theme showDark></x-theme>
    <div class="box">
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
            <td>admin&#64;admin.com</td>
            <td>启用</td>
          </tr>
          <tr>
            <td>john</td>
            <td>john&#64;john.com</td>
            <td>禁用</td>
          </tr>
          <tr>
            <td>jack</td>
            <td>jack&#64;jack.com</td>
            <td>启用</td>
          </tr>
        </table>
      </ng-template>
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
  contentTpl = viewChild.required<TemplateRef<void>>('contentTpl');
  constructor(
    private msgBox: XMessageBoxService,
    private message: XMessageService,
    private i18nService: XI18nService,
    private cdr: ChangeDetectorRef
  ) {}
  alert(place: XPlace, title: string) {
    this.msgBox.alert({
      title: '弹框 ' + title,
      content:
        '天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。',
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
        } else if (action === 'close') {
          this.message.info('已关闭窗口！');
        } else if (action === 'cancel') {
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
      inputPattern:
        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputInvalidMessage: '邮箱格式不正确',
      callback: (action: XMessageBoxAction, msg) => {
        if (action === 'confirm') {
          // 业务处理......
          this.message.success('邮箱：' + msg);
        } else if (action === 'close') {
          this.message.info('已关闭窗口！');
        } else if (action === 'cancel') {
          this.message.info('已取消窗口！');
        }
      }
    });
  }
  alertCustom() {
    this.msgBox.alert({
      title: '自定义内容',
      content: this.contentTpl(),
      backdropClose: true,
      callback: (action: XMessageBoxAction) => this.message.info('action: ' + action)
    });
  }

  english() {
    this.i18nService.setLocale(en_US);
    this.cdr.detectChanges();
  }

  chinese() {
    this.i18nService.setLocale(zh_CN);
    this.cdr.detectChanges();
  }
}
