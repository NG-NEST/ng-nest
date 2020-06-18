import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XDialogComponent } from './dialog.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { XButtonModule } from '@ng-nest/ui/button';
import { XDialogPrefix } from './dialog.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XPlace } from '@ng-nest/ui/core';
import { XMessageBoxService, XMessageBoxModule, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { FormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XIconModule } from '@ng-nest/ui/icon';
import { XLinkModule } from '@ng-nest/ui/link';
import { interval } from 'rxjs';

describe(XDialogPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        XInputModule,
        XRadioModule,
        XDialogModule,
        XButtonModule,
        XIconModule,
        XLinkModule,
        XMessageBoxModule
      ],
      declarations: [TestXDialogComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXDialogComponent>;
    let dialog: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDialogComponent);
      fixture.detectChanges();
      dialog = fixture.debugElement.query(By.directive(XDialogComponent));
    });
    it('should create.', () => {
      expect(dialog).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="box">
      <div class="row">
        <x-button (click)="dialog('top-start')">上左</x-button>
        <x-button (click)="dialog('top')">上</x-button>
        <x-button (click)="dialog('top-end')">上右</x-button>
      </div>
      <div class="row">
        <x-button (click)="dialog('left')">左</x-button>
        <x-button (click)="dialog('center')">中(默认)</x-button>
        <x-button (click)="dialog('right')">右</x-button>
      </div>
      <div class="row">
        <x-button (click)="dialog('bottom-start')">下左</x-button>
        <x-button (click)="dialog('bottom')">下</x-button>
        <x-button (click)="dialog('bottom-end')">下右</x-button>
      </div>
    </div>

    <x-dialog
      title="标题"
      [(visible)]="visible"
      [placement]="placement"
      [beforeClose]="beforeClose"
      (cancel)="refresh()"
      (confirm)="refresh()"
    >
      <span>天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。</span>
    </x-dialog>

    <div class="row">
      <x-button (click)="customTable()">自定义表格</x-button>
      <x-dialog
        title="表格"
        width="80%"
        height="80%"
        [(visible)]="visibleTable"
        (close)="refresh()"
        (cancel)="refresh()"
        (confirm)="refresh()"
      >
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
      </x-dialog>
    </div>

    <div class="row">
      <x-button (click)="customForm()">自定义表单</x-button>
      <x-dialog title="表单" [(visible)]="visibleForm" (close)="refresh()" (cancel)="refresh()" (confirm)="refresh()" buttonsCenter>
        <ul class="custom-form">
          <li><x-input label="账号" direction="row"></x-input></li>
          <li><x-input label="邮箱" direction="row"></x-input></li>
          <li><x-radio [data]="['启用', '禁用']" [ngModel]="'启用'"></x-radio></li>
        </ul>
      </x-dialog>
    </div>

    <div class="row">
      <x-button (click)="custom()">自定义标题以及底部按钮</x-button>
      <x-dialog
        [title]="titleTpl"
        [footer]="footerTpl"
        [(visible)]="visibleCustom"
        (close)="refresh()"
        (cancel)="refresh()"
        (confirm)="refresh()"
      >
        <span>天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。</span>
        <ng-template #titleTpl>
          <x-icon type="fto-user"></x-icon>
        </ng-template>
        <ng-template #footerTpl>
          <div class="custom-footer">
            <x-link type="success" (click)="customClose()">知道了</x-link>
          </div>
        </ng-template>
      </x-dialog>
    </div>
  `,
  styles: [
    `
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
      .custom-form li {
        margin-top: 1rem;
      }
      .custom-footer {
        margin-top: 1rem;
        text-align: center;
      }
    `
  ]
})
class TestXDialogComponent {
  visible: boolean;
  placement: XPlace;
  visibleTable: boolean;
  visibleForm: boolean;
  visibleCustom: boolean;

  constructor(private cdr: ChangeDetectorRef, private msgBox: XMessageBoxService) {
    // interval(1000).subscribe((x) => {
    //   console.log(this.visibleForm);
    //   this.cdr.detectChanges();
    // });
  }

  dialog(place: XPlace) {
    this.placement = place;
    this.visible = true;
    this.cdr.detectChanges();
  }

  refresh() {
    this.cdr.detectChanges();
  }

  beforeClose = () => {
    this.msgBox.confirm({
      title: '提示',
      content: '有未保存的数据，确认关闭吗？',
      type: 'warning',
      callback: (action: XMessageBoxAction) => {
        if (action === 'confirm') {
          this.visible = false;
          this.cdr.detectChanges();
        }
      }
    });
  };

  customTable() {
    this.visibleTable = true;
    this.cdr.detectChanges();
  }

  customForm() {
    this.visibleForm = true;
    this.cdr.detectChanges();
  }

  custom() {
    this.visibleCustom = true;
    this.cdr.detectChanges();
  }

  customClose() {
    this.visibleCustom = false;
    this.cdr.detectChanges();
  }
}
