// import {} from 'jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { XDrawerComponent } from './drawer.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { XDrawerModule } from './drawer.module';
import { XDrawerPrefix } from './drawer.type';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XButtonModule } from '@ng-nest/ui/button';
import { XIconModule } from '@ng-nest/ui/icon';
import { XInputModule } from '@ng-nest/ui/input';

describe(XDrawerPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        XDrawerModule,
        FormsModule,
        XInputModule,
        XIconModule,
        XRadioModule,
        XButtonModule
      ],
      declarations: [
        TestXDrawerComponent,
        TestXDrawerTitleComponent,
        TestXDrawerCustomComponent,
        TestXDrawerMultipleComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXDrawerComponent>;
    let drawer: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDrawerComponent);
      fixture.detectChanges();
      drawer = fixture.debugElement.query(By.directive(XDrawerComponent));
    });
    it('should create.', () => {
      expect(drawer).toBeDefined();
    });
  });
  describe(`title.`, () => {
    let fixture: ComponentFixture<TestXDrawerTitleComponent>;
    let drawer: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDrawerTitleComponent);
      fixture.detectChanges();
      drawer = fixture.debugElement.query(By.directive(XDrawerComponent));
    });
    it('should create.', () => {
      expect(drawer).toBeDefined();
    });
  });
  describe(`custom.`, () => {
    let fixture: ComponentFixture<TestXDrawerCustomComponent>;
    let drawer: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDrawerCustomComponent);
      fixture.detectChanges();
      drawer = fixture.debugElement.query(By.directive(XDrawerComponent));
    });
    it('should create.', () => {
      expect(drawer).toBeDefined();
    });
  });
  describe(`multiple.`, () => {
    let fixture: ComponentFixture<TestXDrawerMultipleComponent>;
    let drawer: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDrawerMultipleComponent);
      fixture.detectChanges();
      drawer = fixture.debugElement.query(By.directive(XDrawerComponent));
    });
    it('should create.', () => {
      expect(drawer).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-radio [data]="data" [(ngModel)]="value"></x-radio>
      <x-button (click)="open()">打开</x-button>
      <x-drawer title="标题" [visible]="visible" [position]="value" (close)="close()">
        <span>内容区域</span>
      </x-drawer>
    </div>
  `,
  styles: [
    `
      .row {
        display: flex;
        align-items: center;
      }
      .row x-button {
        margin-left: 1rem;
      }
    `
  ]
})
class TestXDrawerComponent {
  value: string = 'right';
  data = [
    { id: 'left', label: '左边' },
    { id: 'right', label: '右边' },
    { id: 'top', label: '上边' },
    { id: 'bottom', label: '下边' }
  ];
  visible: boolean;

  constructor(private cdr: ChangeDetectorRef) {}

  open() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  close() {
    this.visible = false;
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <div class="row">
      <x-button (click)="open()">不包含标题</x-button>
      <x-drawer [visible]="visible" (close)="close()">
        <span>内容区域</span>
      </x-drawer>
    </div>
  `
})
class TestXDrawerTitleComponent {
  visible: boolean;

  constructor(private cdr: ChangeDetectorRef) {}

  open() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  close() {
    this.visible = false;
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <div class="row">
      <x-button (click)="open()">自定义标题</x-button>
      <x-button (click)="openTable()">表格内容</x-button>
      <x-button (click)="openForm()">表单内容</x-button>

      <x-drawer [title]="titleTpl" [visible]="visible" (close)="close()">
        <span>内容区域</span>
      </x-drawer>

      <ng-template #titleTpl>
        <x-icon type="fto-user"></x-icon>
        <span>用户信息</span>
      </ng-template>

      <x-drawer title="表格" size="50%" [visible]="visibleTable" (close)="closeTable()">
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
      </x-drawer>

      <x-drawer title="表单" [visible]="visibleForm" position="left" (close)="closeForm()">
        <ul class="custom-form">
          <li><x-input label="账号" direction="row"></x-input></li>
          <li><x-input label="邮箱" direction="row"></x-input></li>
          <li><x-radio [data]="['启用', '禁用']" [ngModel]="'启用'"></x-radio></li>
          <li>
            <x-buttons space="1">
              <x-button>取消</x-button>
              <x-button type="primary">提交</x-button>
            </x-buttons>
          </li>
        </ul>
      </x-drawer>
    </div>
  `,
  styles: [
    `
      .row {
        display: flex;
        align-items: center;
      }
      .row x-button:not(:first-child) {
        margin-left: 1rem;
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

      .custom-form li:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXDrawerCustomComponent {
  visible: boolean;
  visibleTable: boolean;
  visibleForm: boolean;

  constructor(private cdr: ChangeDetectorRef) {}

  open() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  close() {
    this.visible = false;
    this.cdr.detectChanges();
  }

  openTable() {
    this.visibleTable = true;
    this.cdr.detectChanges();
  }

  closeTable() {
    this.visibleTable = false;
    this.cdr.detectChanges();
  }

  openForm() {
    this.visibleForm = true;
    this.cdr.detectChanges();
  }

  closeForm() {
    this.visibleForm = false;
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <div class="row">
      <x-button (click)="open()">嵌套多个</x-button>

      <x-drawer title="第一个" size="50%" [visible]="visible" (close)="close()">
        <x-button (click)="openOne()">再打开一个</x-button>
      </x-drawer>

      <x-drawer title="第二个" size="40%" [visible]="visibleOne" (close)="closeOne()">
        <x-button (click)="openTwo()">再打开一个</x-button>
      </x-drawer>

      <x-drawer title="第三个" size="30%" [visible]="visibleTwo" (close)="closeTwo()">
        <span>这是第三个</span>
      </x-drawer>
    </div>
  `
})
class TestXDrawerMultipleComponent {
  visible: boolean;
  visibleOne: boolean;
  visibleTwo: boolean;

  constructor(private cdr: ChangeDetectorRef) {}

  open() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  close() {
    this.visible = false;
    this.cdr.detectChanges();
  }

  openOne() {
    this.visibleOne = true;
    this.cdr.detectChanges();
  }

  closeOne() {
    this.visibleOne = false;
    this.cdr.detectChanges();
  }

  openTwo() {
    this.visibleTwo = true;
    this.cdr.detectChanges();
  }

  closeTwo() {
    this.visibleTwo = false;
    this.cdr.detectChanges();
  }
}
