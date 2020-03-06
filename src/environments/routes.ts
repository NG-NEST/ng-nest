import { Routes } from '@angular/router';
import { environment } from './environment';

export const shareRoutes: Routes = [
  {
    path: 'no-auth',
    loadChildren: 'src/main/no-auth/no-auth.module#NoAuthModule'
  },
  {
    path: '**',
    loadChildren: 'src/main/exception/404.module#Exception404Module'
  }
];

export const mainRoutes: Routes = [
  {
    path: environment.layout,
    loadChildren: 'src/main/layout/layout.module#LayoutModule'
  },
  { path: '', redirectTo: environment.layout, pathMatch: 'full' },

  ...shareRoutes
];

export const layoutRoutes: Routes = [
  { path: '', redirectTo: environment.defaultPage, pathMatch: 'full' },
  { path: 'home', loadChildren: 'src/main/home/home.module#HomeModule' },
  { path: 'demo', loadChildren: 'src/main/demo/demo.module#DemoModule' },
  { path: 'docs', loadChildren: 'src/main/docs/docs.module#NsDocsModule' },
  { path: 'news', loadChildren: 'src/main/news/news.module#NewsModule' },

  ...shareRoutes
];

export interface Menu {
  id?: string;
  parentId?: string;
  label?: string;
  name?: string;
  enLabel?: string;
  router?: string;
  icon?: string;
  type?: string;
  order?: number;
  category?: string;
  [prop: string]: any;
}

export const menus: Menu[] = [
  { id: '1', parentId: null, name: 'ui', label: 'UI库', icon: 'icon-ui' },
  {
    id: '1-1',
    parentId: '1',
    name: 'introduction',
    label: '简介',
    router: './docs/ui/introduction'
  },
  { id: '1-10', parentId: '1', name: 'course', label: '教程' },
  {
    id: '1-10-1',
    parentId: '1-10',
    name: 'guide',
    label: '指南',
    router: './docs/ui/course/guide'
  },
  { id: '1-2', parentId: '1', name: 'basecom', label: '基本组件' },
  {
    id: '1-2-20',
    parentId: '1-2',
    name: 'icon',
    label: '图标',
    enLabel: 'Icon',
    router: './docs/ui/basecom/icon'
  },
  {
    id: '1-2-1',
    parentId: '1-2',
    name: 'input',
    label: '输入框',
    enLabel: 'Input',
    router: './docs/ui/basecom/input'
  },
  {
    id: '1-2-2',
    parentId: '1-2',
    name: 'button',
    label: '按钮',
    enLabel: 'Button',
    router: './docs/ui/basecom/button'
  },
  {
    id: '1-2-3',
    parentId: '1-2',
    name: 'radio',
    label: '单选框',
    enLabel: 'Radio',
    router: './docs/ui/basecom/radio'
  },
  {
    id: '1-2-4',
    parentId: '1-2',
    name: 'checkbox',
    label: '多选框',
    enLabel: 'CheckBox',
    router: './docs/ui/basecom/checkbox'
  },
  {
    id: '1-2-5',
    parentId: '1-2',
    name: 'select',
    label: '下拉选择框',
    enLabel: 'Select',
    router: './docs/ui/basecom/select'
  },
  {
    id: '1-2-6',
    parentId: '1-2',
    name: 'datetime',
    label: '日期选择框',
    enLabel: 'DateTime',
    router: './docs/ui/basecom/datetime'
  },
  { id: '1-3', parentId: '1', name: 'popup', label: '弹出层' },
  {
    id: '1-3-1',
    parentId: '1-3',
    name: 'alert',
    label: '警告提示',
    enLabel: 'Alert',
    router: './docs/ui/popup/alert'
  },
  {
    id: '1-3-2',
    parentId: '1-3',
    name: 'message',
    label: '全局提示',
    enLabel: 'Message',
    router: './docs/ui/popup/message'
  },
  {
    id: '1-3-3',
    parentId: '1-3',
    name: 'modal',
    label: '模态框',
    enLabel: 'Modal',
    router: './docs/ui/popup/modal'
  },
  {
    id: '1-3-4',
    parentId: '1-3',
    name: 'notification',
    label: '通知提醒框',
    enLabel: 'Notification',
    router: './docs/ui/popup/notification'
  },
  {
    id: '1-3-5',
    parentId: '1-3',
    name: 'loading',
    label: '加载中',
    enLabel: 'Loading',
    router: './docs/ui/popup/loading'
  },
  {
    id: '1-3-6',
    parentId: '1-3',
    name: 'popconfirm',
    label: '气泡确认框',
    enLabel: 'PopConfirm',
    router: './docs/ui/popup/popconfirm'
  },
  {
    id: '1-4',
    parentId: '1',
    name: 'table',
    label: '表格',
    enLabel: 'Table',
    router: './docs/ui/table'
  },
  {
    id: '1-6',
    parentId: '1',
    name: 'tree',
    label: '树',
    enLabel: 'Tree',
    router: './docs/ui/tree'
  },
  {
    id: '1-5',
    parentId: '1',
    name: 'form',
    label: '表单',
    enLabel: 'Form',
    router: './docs/ui/form'
  },
  {
    id: '2',
    parentId: null,
    name: 'user-lib',
    label: '用户模块',
    icon: 'icon-module'
  },
  {
    id: '3',
    parentId: null,
    name: 'form-design',
    label: '表单设计器',
    icon: 'icon-form'
  },
  {
    id: '4',
    parentId: null,
    name: 'workflow-design',
    label: '工作流设计',
    icon: 'icon-workflow'
  },
  {
    id: '5',
    parentId: null,
    name: 'code-generator',
    label: '代码生成',
    icon: 'icon-code'
  }
];
