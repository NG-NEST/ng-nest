import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XMenuComponent } from './menu.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XMenuModule } from '@ng-nest/ui/menu';
import { XMenuPrefix, XMenuNode } from './menu.property';

describe(XMenuPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XMenuModule],
      declarations: [TestXMenuComponent, TestXMenuExpandedComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXMenuComponent>;
    let menu: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXMenuComponent);
      fixture.detectChanges();
      menu = fixture.debugElement.query(By.directive(XMenuComponent));
    });
    it('should create.', () => {
      expect(menu).toBeDefined();
    });
  });
  describe(`expanded.`, () => {
    let fixture: ComponentFixture<TestXMenuExpandedComponent>;
    let menu: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXMenuExpandedComponent);
      fixture.detectChanges();
      menu = fixture.debugElement.query(By.directive(XMenuComponent));
    });
    it('should create.', () => {
      expect(menu).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-menu [data]="data"> </x-menu>
    </div>
    <div class="row">
      <x-menu [data]="dataIcon"> </x-menu>
    </div>
    <div class="row">
      <x-menu [data]="dataLeaf" (nodeClick)="nodeClick($event)"> </x-menu>
    </div>
    <div class="row">
      <x-menu [data]="dataLeaf" layout="column" expanded-level="2"> </x-menu>
    </div>
    <div class="row">
      <x-menu [data]="dataLeaf" layout="column" size="big"> </x-menu>
      <x-menu [data]="dataLeaf" layout="column" size="large"> </x-menu>
      <x-menu [data]="dataLeaf" layout="column" size="medium"> </x-menu>
      <x-menu [data]="dataLeaf" layout="column" size="small"> </x-menu>
      <x-menu [data]="dataLeaf" layout="column" size="mini"> </x-menu>
    </div>
  `,
  styles: [
    `
      .row x-menu:not(:first-child) {
        margin-top: 1rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXMenuComponent {
  data = ['最新活动', '产品', '解决方案', '帮助和支持'];
  dataIcon = ['最新活动', { label: '产品', icon: 'fto-package' }, '解决方案', { label: '帮助和支持', icon: 'fto-phone' }];
  dataLeaf = [
    { id: 1, label: '最新活动', icon: 'fto-gift' },
    { id: 2, label: '产品', icon: 'fto-package' },
    { id: 3, label: '解决方案', icon: 'fto-layers' },
    { id: 4, label: '帮助和支持', icon: 'fto-phone' },
    { id: 5, pid: 2, label: '云基础' },
    { id: 6, pid: 2, label: '智能大数据' },
    { id: 7, pid: 2, label: '行业应用' },
    { id: 8, pid: 2, label: '区块链' },
    { id: 9, pid: 2, label: '专有云' },
    { id: 10, pid: 5, label: '计算' },
    { id: 11, pid: 5, label: '网络' },
    { id: 12, pid: 5, label: '存储' },
    { id: 13, pid: 5, label: '数据库' }
  ];
  nodeClick($event: XMenuNode) {
    console.log($event);
  }
}

@Component({
  template: `
    <div class="row" #scroll>
      <x-menu [data]="dataLeaf" layout="column" activated-id="48" [target]="scroll"> </x-menu>
    </div>
  `,
  styles: [
    `
      .row {
        height: 30rem;
        overflow: hidden;
      }
      .row:hover {
        overflow-y: auto;
      }
      .row x-menu:not(:first-child) {
        margin-top: 1rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXMenuExpandedComponent {
  dataLeaf: XMenuNode[] = [
    { id: 1, label: '最新活动', icon: 'fto-gift' },
    { id: 2, label: '产品', icon: 'fto-package' },
    { id: 3, label: '解决方案', icon: 'fto-layers' },
    { id: 4, label: '帮助和支持', icon: 'fto-phone' },
    { id: 5, pid: 2, label: '云基础' },
    { id: 6, pid: 2, label: '智能大数据' },
    { id: 7, pid: 2, label: '行业应用' },
    { id: 8, pid: 2, label: '区块链' },
    { id: 9, pid: 2, label: '专有云' },
    { id: 10, pid: 2, label: '云基础' },
    { id: 11, pid: 2, label: '智能大数据' },
    { id: 12, pid: 2, label: '行业应用' },
    { id: 13, pid: 2, label: '区块链' },
    { id: 14, pid: 2, label: '专有云' },
    { id: 23, pid: 2, label: '云基础' },
    { id: 24, pid: 2, label: '智能大数据' },
    { id: 25, pid: 2, label: '行业应用' },
    { id: 26, pid: 2, label: '区块链' },
    { id: 27, pid: 2, label: '专有云' },
    { id: 28, pid: 2, label: '云基础' },
    { id: 29, pid: 2, label: '智能大数据' },
    { id: 30, pid: 2, label: '行业应用' },
    { id: 31, pid: 2, label: '区块链' },
    { id: 32, pid: 2, label: '专有云' },
    { id: 15, pid: 5, label: '计算' },
    { id: 16, pid: 5, label: '网络' },
    { id: 17, pid: 5, label: '存储' },
    { id: 18, pid: 5, label: '数据库' },
    { id: 19, pid: 5, label: '计算' },
    { id: 20, pid: 5, label: '网络' },
    { id: 21, pid: 5, label: '存储' },
    { id: 22, pid: 5, label: '数据库' },
    { id: 33, pid: 3, label: '云基础', category: '123' },
    { id: 34, pid: 3, label: '智能大数据', category: '123' },
    { id: 35, pid: 3, label: '行业应用', category: '123' },
    { id: 36, pid: 3, label: '区块链', category: '123' },
    { id: 37, pid: 3, label: '专有云', category: '123' },
    { id: 38, pid: 3, label: '云基础', category: '123' },
    { id: 39, pid: 3, label: '智能大数据', category: '123' },
    { id: 40, pid: 3, label: '行业应用', category: '123' },
    { id: 41, pid: 3, label: '区块链', category: '123' },
    { id: 42, pid: 3, label: '专有云', category: '456' },
    { id: 43, pid: 3, label: '云基础', category: '456' },
    { id: 44, pid: 3, label: '智能大数据', category: '456' },
    { id: 45, pid: 3, label: '行业应用', category: '456' },
    { id: 46, pid: 3, label: '区块链', category: '456' },
    { id: 47, pid: 3, label: '专有云', category: '456' },
    { id: 48, pid: 3, label: '计算', category: '456' },
    { id: 49, pid: 3, label: '网络', category: '456' },
    { id: 50, pid: 3, label: '存储', category: '789' },
    { id: 51, pid: 3, label: '数据库', category: '789' },
    { id: 52, pid: 3, label: '计算', category: '789' },
    { id: 53, pid: 3, label: '网络', category: '789' },
    { id: 54, pid: 3, label: '存储' },
    { id: 55, pid: 3, label: '数据库', category: '789' }
  ];
  nodeClick($event: XMenuNode) {
    console.log($event);
  }
}
