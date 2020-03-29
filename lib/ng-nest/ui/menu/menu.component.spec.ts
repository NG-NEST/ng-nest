import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XMenuComponent } from './menu.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XMenuModule } from './menu.module';
import { XMenuPrefix } from './menu.type';

describe(XMenuPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XMenuModule],
      declarations: [TestXMenuComponent]
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
      <x-menu [data]="dataLeaf" layout="column"> </x-menu>
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
  nodeClick($event) {
    console.log($event);
  }
}
