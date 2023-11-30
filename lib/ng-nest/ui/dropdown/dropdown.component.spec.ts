import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDropdownComponent } from '@ng-nest/ui/dropdown';
import { XDropdownPrefix, XDropdownNode } from './dropdown.property';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XDropdownPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeModule,
        XDropdownComponent,
        XButtonComponent,
        XLinkComponent,
        XRowComponent,
        XColComponent
      ],
      declarations: [TestXDropdownComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXDropdownComponent>;
    let dropdown: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDropdownComponent);
      fixture.detectChanges();
      dropdown = fixture.debugElement.query(By.directive(XDropdownComponent));
    });
    it('should create.', () => {
      expect(dropdown).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-dropdown [data]="data">
        <x-link type="primary" icon="fto-chevron-down" iconRight> 下拉菜单 </x-link>
      </x-dropdown>
      <x-dropdown [data]="data" trigger="click">
        <x-link type="primary" icon="fto-chevron-down" iconRight> 下拉菜单(点击触发) </x-link>
      </x-dropdown>
    </div>
    <div class="row">
      <x-dropdown [data]="data">
        <x-button type="primary" icon="fto-chevron-down" direction="row-reverse">
          下拉菜单
        </x-button>
      </x-dropdown>
    </div>
    <div class="row">
      <x-dropdown [data]="dataProp" trigger="click">
        <x-button type="primary" icon="fto-chevron-down" direction="row-reverse">
          下拉菜单
        </x-button>
      </x-dropdown>
    </div>
    <div class="row">
      <x-dropdown [data]="dataLeaf">
        <x-button type="primary" icon="fto-chevron-down" direction="row-reverse">
          下拉菜单
        </x-button>
      </x-dropdown>
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
      .row x-dropdown:not(:first-child) {
        margin-left: 1rem;
      }
    `
  ]
})
class TestXDropdownComponent {
  data = ['用户管理123456789', '角色管理', '组织管理', '模块管理', '日志管理'];
  dataProp = [
    { label: '用户管理', icon: 'fto-user' },
    { label: '角色管理', icon: 'fto-users' },
    '组织管理',
    { label: '模块管理', divided: true },
    { label: '日志管理', disabled: true }
  ];
  dataLeaf = [
    { id: 1, label: 'AAAAA' },
    { id: 2, label: 'BBBBB' },
    { id: 3, label: 'CCCCC' },
    { id: 4, label: 'DDDDD' },
    { id: 5, label: 'EEEEE' },
    { id: 6, pid: 2, label: 'BBBBB-1' },
    { id: 7, pid: 2, label: 'BBBBB-2' },
    { id: 8, pid: 2, label: 'BBBBB-3' },
    { id: 9, pid: 2, label: 'BBBBB-4' },
    { id: 10, pid: 7, label: 'BBBBB-2-1' },
    { id: 11, pid: 7, label: 'BBBBB-2-2' },
    { id: 12, pid: 8, label: 'BBBBB-3-1' },
    { id: 13, pid: 8, label: 'BBBBB-3-2' },
    { id: 14, pid: 3, label: 'CCCCC-1' },
    { id: 16, pid: 3, label: 'CCCCC-2' },
    { id: 17, pid: 3, label: 'CCCCC-3' },
    { id: 18, pid: 3, label: 'CCCCC-4' },
    { id: 19, pid: 16, label: 'CCCCC-2-1' },
    { id: 20, pid: 16, label: 'CCCCC-2-2' },
    { id: 21, pid: 17, label: 'CCCCC-3-1' },
    { id: 22, pid: 17, label: 'CCCCC-3-2' }
  ];
  nodeClick(node: XDropdownNode) {
    console.log(node);
  }
}
