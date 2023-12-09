import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectorRef, NgModule } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XMenuComponent } from '@ng-nest/ui/menu';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XMenuPrefix, XMenuNode } from './menu.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeComponent } from '@ng-nest/ui/theme';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { interval } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XMenuPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        XThemeComponent,
        XMenuComponent,
        XButtonComponent,
        TestMenuRoutesModule
      ],
      declarations: [
        TestXMenuComponent,
        TestXMenuExpandedComponent,
        TestXMenuCollapsedComponent,
        TestXMenuTestOneCollapsedComponent,
        TestXMenuTestTwoCollapsedComponent,
        TestXMenuTestThreeCollapsedComponent,
        TestXMenuWindowsComponent
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  });
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
  describe(`collapsed.`, () => {
    let fixture: ComponentFixture<TestXMenuCollapsedComponent>;
    let menu: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXMenuCollapsedComponent);
      fixture.detectChanges();
      menu = fixture.debugElement.query(By.directive(XMenuComponent));
    });
    it('should create.', () => {
      expect(menu).toBeDefined();
    });
  });
  describe(`windows.`, () => {
    let fixture: ComponentFixture<TestXMenuWindowsComponent>;
    let menu: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXMenuWindowsComponent);
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
    <x-theme showDark></x-theme>
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
      <x-menu [data]="dataLeaf" layout="column" expandedLevel="2"> </x-menu>
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
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
class TestXMenuComponent {
  data = ['最新活动', '产品', '解决方案', '帮助和支持'];
  dataIcon = [
    '最新活动',
    { label: '产品', icon: 'fto-package' },
    '解决方案',
    { label: '帮助和支持', icon: 'fto-phone' }
  ];
  dataLeaf = [
    {
      id: '1-8',
      pid: null,
      name: 'border',
      router: 'docs/zh_CN/components/border',
      lang: 'zh_CN',
      label: 'Border 边框',
      category: 'Basic',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-9',
      pid: null,
      name: 'button',
      router: 'docs/zh_CN/components/button',
      lang: 'zh_CN',
      label: 'Button 按钮',
      category: 'Basic',
      default: true,
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-16',
      pid: null,
      name: 'color',
      router: 'docs/zh_CN/components/color',
      lang: 'zh_CN',
      label: 'Color 色彩',
      category: 'Basic',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-19',
      pid: null,
      name: 'container',
      router: 'docs/zh_CN/components/container',
      lang: 'zh_CN',
      label: 'Container 布局容器',
      category: 'Basic',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-34',
      pid: null,
      name: 'icon',
      router: 'docs/zh_CN/components/icon',
      lang: 'zh_CN',
      label: 'Icon 图标',
      category: 'Basic',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-40',
      pid: null,
      name: 'layout',
      router: 'docs/zh_CN/components/layout',
      lang: 'zh_CN',
      label: 'Layout 栅格布局',
      category: 'Basic',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-41',
      pid: null,
      name: 'link',
      router: 'docs/zh_CN/components/link',
      lang: 'zh_CN',
      label: 'Link 文字链接',
      category: 'Basic',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-77',
      pid: null,
      name: 'theme',
      router: 'docs/zh_CN/components/theme',
      lang: 'zh_CN',
      label: 'Theme 主题',
      category: 'Basic',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-91',
      pid: null,
      name: 'typography',
      router: 'docs/zh_CN/components/typography',
      lang: 'zh_CN',
      label: 'Typography 字体',
      category: 'Basic',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-5',
      pid: null,
      name: 'avatar',
      router: 'docs/zh_CN/components/avatar',
      lang: 'zh_CN',
      label: 'Avatar 头像',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-7',
      pid: null,
      name: 'badge',
      router: 'docs/zh_CN/components/badge',
      lang: 'zh_CN',
      label: 'Badge 标记',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-10',
      pid: null,
      name: 'calendar',
      router: 'docs/zh_CN/components/calendar',
      lang: 'zh_CN',
      label: 'Calendar 日历',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-11',
      pid: null,
      name: 'card',
      router: 'docs/zh_CN/components/card',
      lang: 'zh_CN',
      label: 'Card 卡片',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-12',
      pid: null,
      name: 'carousel',
      router: 'docs/zh_CN/components/carousel',
      lang: 'zh_CN',
      label: 'Carousel 走马灯',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-15',
      pid: null,
      name: 'collapse',
      router: 'docs/zh_CN/components/collapse',
      lang: 'zh_CN',
      label: 'Collapse 折叠面板',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-18',
      pid: null,
      name: 'comment',
      router: 'docs/zh_CN/components/comment',
      lang: 'zh_CN',
      label: 'Comment 评论',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-28',
      pid: null,
      name: 'empty',
      router: 'docs/zh_CN/components/empty',
      lang: 'zh_CN',
      label: 'Empty 空状态',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-49',
      pid: null,
      name: 'outlet',
      router: 'docs/zh_CN/components/outlet',
      lang: 'zh_CN',
      label: 'Outlet 自定义模板',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-52',
      pid: null,
      name: 'pagination',
      router: 'docs/zh_CN/components/pagination',
      lang: 'zh_CN',
      label: 'Pagination 分页',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-57',
      pid: null,
      name: 'progress',
      router: 'docs/zh_CN/components/progress',
      lang: 'zh_CN',
      label: 'Progress 进度条',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-67',
      pid: null,
      name: 'statistic',
      router: 'docs/zh_CN/components/statistic',
      lang: 'zh_CN',
      label: 'Statistic 统计',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-71',
      pid: null,
      name: 'table',
      router: 'docs/zh_CN/components/table',
      lang: 'zh_CN',
      label: 'Table 表格',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-73',
      pid: null,
      name: 'tag',
      router: 'docs/zh_CN/components/tag',
      lang: 'zh_CN',
      label: 'Tag 标签',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-75',
      pid: null,
      name: 'text-retract',
      router: 'docs/zh_CN/components/text-retract',
      lang: 'zh_CN',
      label: 'Text Retract 文字收起',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-78',
      pid: null,
      name: 'time-ago',
      router: 'docs/zh_CN/components/time-ago',
      lang: 'zh_CN',
      label: 'Time Ago 时间之前',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-80',
      pid: null,
      name: 'time-range',
      router: 'docs/zh_CN/components/time-range',
      lang: 'zh_CN',
      label: 'Time Range 时间间隔 ',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-81',
      pid: null,
      name: 'timeline',
      router: 'docs/zh_CN/components/timeline',
      lang: 'zh_CN',
      label: 'Timeline 时间线',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-84',
      pid: null,
      name: 'tree',
      router: 'docs/zh_CN/components/tree',
      lang: 'zh_CN',
      label: 'Tree 树形控件',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-85',
      pid: null,
      name: 'tree-file',
      router: 'docs/zh_CN/components/tree-file',
      lang: 'zh_CN',
      label: 'TreeFile 树形文件',
      category: 'Data',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-1',
      pid: null,
      name: 'alert',
      router: 'docs/zh_CN/components/alert',
      lang: 'zh_CN',
      label: 'Alert 警告提示',
      category: 'Feedback',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-23',
      pid: null,
      name: 'dialog',
      router: 'docs/zh_CN/components/dialog',
      lang: 'zh_CN',
      label: 'Dialog 对话框',
      category: 'Feedback',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-26',
      pid: null,
      name: 'drawer',
      router: 'docs/zh_CN/components/drawer',
      lang: 'zh_CN',
      label: 'Drawer 抽屉',
      category: 'Feedback',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-43',
      pid: null,
      name: 'loading',
      router: 'docs/zh_CN/components/loading',
      lang: 'zh_CN',
      label: 'Loading 加载中',
      category: 'Feedback',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-45',
      pid: null,
      name: 'message',
      router: 'docs/zh_CN/components/message',
      lang: 'zh_CN',
      label: 'Message 全局提示',
      category: 'Feedback',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-46',
      pid: null,
      name: 'message-box',
      router: 'docs/zh_CN/components/message-box',
      lang: 'zh_CN',
      label: 'MessageBox 弹框',
      category: 'Feedback',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-48',
      pid: null,
      name: 'notification',
      router: 'docs/zh_CN/components/notification',
      lang: 'zh_CN',
      label: 'Notification 通知提醒框',
      category: 'Feedback',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-54',
      pid: null,
      name: 'popconfirm',
      router: 'docs/zh_CN/components/popconfirm',
      lang: 'zh_CN',
      label: 'Popconfirm 气泡确认框',
      category: 'Feedback',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-55',
      pid: null,
      name: 'popover',
      router: 'docs/zh_CN/components/popover',
      lang: 'zh_CN',
      label: 'Popover 气泡卡片',
      category: 'Feedback',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-61',
      pid: null,
      name: 'result',
      router: 'docs/zh_CN/components/result',
      lang: 'zh_CN',
      label: 'Result 结果',
      category: 'Feedback',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-64',
      pid: null,
      name: 'skeleton',
      router: 'docs/zh_CN/components/skeleton',
      lang: 'zh_CN',
      label: 'Skeleton 骨架屏',
      category: 'Feedback',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-82',
      pid: null,
      name: 'tooltip',
      router: 'docs/zh_CN/components/tooltip',
      lang: 'zh_CN',
      label: 'Tooltip 文字提示',
      category: 'Feedback',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-4',
      pid: null,
      name: 'auto-complete',
      router: 'docs/zh_CN/components/auto-complete',
      lang: 'zh_CN',
      label: 'AutoComplete 自动完成',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-13',
      pid: null,
      name: 'cascade',
      router: 'docs/zh_CN/components/cascade',
      lang: 'zh_CN',
      label: 'Cascade 级联选择器',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-14',
      pid: null,
      name: 'checkbox',
      router: 'docs/zh_CN/components/checkbox',
      lang: 'zh_CN',
      label: 'Checkbox 多选框',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-17',
      pid: null,
      name: 'color-picker',
      router: 'docs/zh_CN/components/color-picker',
      lang: 'zh_CN',
      label: 'ColorPicker 颜色选择器',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-22',
      pid: null,
      name: 'date-picker',
      router: 'docs/zh_CN/components/date-picker',
      lang: 'zh_CN',
      label: 'DatePicker 日期选择器',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-30',
      pid: null,
      name: 'find',
      router: 'docs/zh_CN/components/find',
      lang: 'zh_CN',
      label: 'Find 查找带回',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-31',
      pid: null,
      name: 'form',
      router: 'docs/zh_CN/components/form',
      lang: 'zh_CN',
      label: 'Form 表单',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-37',
      pid: null,
      name: 'input',
      router: 'docs/zh_CN/components/input',
      lang: 'zh_CN',
      label: 'Input 输入框',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-38',
      pid: null,
      name: 'input-number',
      router: 'docs/zh_CN/components/input-number',
      lang: 'zh_CN',
      label: 'InputNumber 计数器',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-42',
      pid: null,
      name: 'list',
      router: 'docs/zh_CN/components/list',
      lang: 'zh_CN',
      label: 'List 列表组件',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-58',
      pid: null,
      name: 'radio',
      router: 'docs/zh_CN/components/radio',
      lang: 'zh_CN',
      label: 'Radio 单选框',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-59',
      pid: null,
      name: 'rate',
      router: 'docs/zh_CN/components/rate',
      lang: 'zh_CN',
      label: 'Rate 评分',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-63',
      pid: null,
      name: 'select',
      router: 'docs/zh_CN/components/select',
      lang: 'zh_CN',
      label: 'Select 选择器',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-66',
      pid: null,
      name: 'slider-select',
      router: 'docs/zh_CN/components/slider-select',
      lang: 'zh_CN',
      label: 'SliderSelect 滑动选择',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-70',
      pid: null,
      name: 'switch',
      router: 'docs/zh_CN/components/switch',
      lang: 'zh_CN',
      label: 'Switch 开关',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-76',
      pid: null,
      name: 'textarea',
      router: 'docs/zh_CN/components/textarea',
      lang: 'zh_CN',
      label: 'Textarea 多行输入框',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-79',
      pid: null,
      name: 'time-picker',
      router: 'docs/zh_CN/components/time-picker',
      lang: 'zh_CN',
      label: 'TimePicker 时间选择器',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-83',
      pid: null,
      name: 'transfer',
      router: 'docs/zh_CN/components/transfer',
      lang: 'zh_CN',
      label: 'Transfer 穿梭框',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-92',
      pid: null,
      name: 'upload',
      router: 'docs/zh_CN/components/upload',
      lang: 'zh_CN',
      label: 'Upload 上传',
      category: 'Form',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-0',
      pid: null,
      name: 'affix',
      router: 'docs/zh_CN/components/affix',
      lang: 'zh_CN',
      label: 'Affix 固钉',
      category: 'Navigation',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-2',
      pid: null,
      name: 'anchor',
      router: 'docs/zh_CN/components/anchor',
      lang: 'zh_CN',
      label: 'Anchor 锚点',
      category: 'Navigation',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-6',
      pid: null,
      name: 'back-top',
      router: 'docs/zh_CN/components/back-top',
      lang: 'zh_CN',
      label: 'BackTop 回到顶部',
      category: 'Navigation',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-21',
      pid: null,
      name: 'crumb',
      router: 'docs/zh_CN/components/crumb',
      lang: 'zh_CN',
      label: 'Crumb 面包屑',
      category: 'Navigation',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-27',
      pid: null,
      name: 'dropdown',
      router: 'docs/zh_CN/components/dropdown',
      lang: 'zh_CN',
      label: 'Dropdown 下拉菜单',
      category: 'Navigation',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-44',
      pid: null,
      name: 'menu',
      router: 'docs/zh_CN/components/menu',
      lang: 'zh_CN',
      label: 'Menu 导航菜单',
      category: 'Navigation',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-51',
      pid: null,
      name: 'page-header',
      router: 'docs/zh_CN/components/page-header',
      lang: 'zh_CN',
      label: 'PageHeader 页头',
      category: 'Navigation',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-65',
      pid: null,
      name: 'slider',
      router: 'docs/zh_CN/components/slider',
      lang: 'zh_CN',
      label: 'Slider 滑动菜单',
      category: 'Navigation',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-68',
      pid: null,
      name: 'steps',
      router: 'docs/zh_CN/components/steps',
      lang: 'zh_CN',
      label: 'Steps 步骤条',
      category: 'Navigation',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-72',
      pid: null,
      name: 'tabs',
      router: 'docs/zh_CN/components/tabs',
      lang: 'zh_CN',
      label: 'Tabs 标签页',
      category: 'Navigation',
      level: 0,
      children: [],
      leaf: false
    },
    {
      id: '1-32',
      pid: null,
      name: 'highlight',
      router: 'docs/zh_CN/components/highlight',
      lang: 'zh_CN',
      label: 'Highlight 代码高亮',
      level: 0,
      children: [],
      leaf: false
    }
  ];
  nodeClick($event: XMenuNode) {
    console.log($event);
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row" #scroll>
      <x-menu [data]="dataLeaf" layout="column" activatedId="48" [target]="scroll"> </x-menu>
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

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="layout">
      <div class="nav">
        <x-button (click)="onCollapsed()" icon="fto-list" type="primary"></x-button>
        <x-menu [data]="dataLeaf" layout="column" [collapsed]="collapsed"> </x-menu>
      </div>
      <div class="main"><router-outlet> </router-outlet></div>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .layout {
        display: flex;
      }
      .main {
        padding: 1rem;
      }
      .nav x-menu:not(:first-child) {
        margin-top: 1rem;
      }
      .nav:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXMenuCollapsedComponent {
  dataLeaf: XMenuNode[] = [
    { id: 1, label: '最新活动', icon: 'fto-gift', routerLink: '/test-one' },
    { id: 2, label: '产品', icon: 'fto-package' },
    { id: 3, label: '解决方案', icon: 'fto-layers' },
    { id: 4, label: '帮助和支持', icon: 'fto-phone' },
    { id: 5, pid: 2, label: '云基础', routerLink: '/test-two' },
    { id: 6, pid: 2, label: '智能大数据', routerLink: '/test-three' },
    { id: 7, pid: 2, label: '行业应用' },
    { id: 8, pid: 2, label: '区块链' },
    { id: 9, pid: 2, label: '专有云' },
    { id: 33, pid: 3, label: '云基础', category: '123' },
    { id: 34, pid: 3, label: '智能大数据', category: '123' },
    { id: 35, pid: 3, label: '行业应用', category: '123' },
    { id: 36, pid: 3, label: '区块链', category: '123' },
    { id: 37, pid: 3, label: '专有云', category: '123' }
  ];

  collapsed = false;

  constructor(private cdr: ChangeDetectorRef) {}

  nodeClick($event: XMenuNode) {
    console.log($event);
  }

  onCollapsed() {
    this.collapsed = !this.collapsed;
    this.cdr.detectChanges();
  }
}

@Component({
  template: ` <h1>test-one</h1> `
})
class TestXMenuTestOneCollapsedComponent {
  constructor() {}
}

@Component({
  template: ` <h1>test-two</h1> `
})
class TestXMenuTestTwoCollapsedComponent {
  constructor() {}
}

@Component({
  template: ` <h1>test-three</h1> `
})
class TestXMenuTestThreeCollapsedComponent {
  constructor() {}
}

const mainRoutes: Routes = [
  { path: '', redirectTo: 'test-one', pathMatch: 'full' },
  {
    path: 'test-one',
    component: TestXMenuTestOneCollapsedComponent
  },
  {
    path: 'test-two',
    component: TestXMenuTestTwoCollapsedComponent
  },
  {
    path: 'test-three',
    component: TestXMenuTestThreeCollapsedComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(mainRoutes, {
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class TestMenuRoutesModule {}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-menu [data]="data" (nodeClick)="nodeClick($event)" [(activatedId)]="activatedId" [portalMinWidth]="'10rem'">
      </x-menu>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
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
class TestXMenuWindowsComponent {
  data = [
    {
      id: '1',
      pid: null,
      label: '文件(F)'
    },
    {
      id: '1-1',
      pid: '1',
      label: '新建文件'
    },
    {
      id: '1-2',
      pid: '1',
      label: '新建窗口'
    },
    {
      id: '2',
      pid: null,
      label: '编辑(E)'
    },
    {
      id: '3',
      pid: null,
      label: '选择(S)'
    },
    {
      id: '4',
      pid: null,
      label: '查看(V)'
    },
    {
      id: '5',
      pid: null,
      label: '转到(G)'
    },
    {
      id: '6',
      pid: null,
      label: '运行(R)'
    },
    {
      id: '7',
      pid: null,
      label: '终端(T)'
    },
    {
      id: '8',
      pid: null,
      label: '帮助(H)'
    }
  ];
  activatedId = '2';
  nodeClick($event: XMenuNode) {
    console.log($event);
  }

  constructor(private cdr: ChangeDetectorRef) {
    interval().subscribe(() => this.cdr.detectChanges());
    setTimeout(() => (this.activatedId = '8'), 2000);
    setTimeout(() => (this.activatedId = '7'), 3000);
  }
}
