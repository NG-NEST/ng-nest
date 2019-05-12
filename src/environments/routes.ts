import { Routes } from "@angular/router";
import { environment } from "./environment";

export const shareRoutes: Routes = [
  {
    path: "no-auth",
    loadChildren: "src/main/no-auth/no-auth.module#NoAuthModule"
  },
  {
    path: "**",
    loadChildren: "src/main/exception/404.module#Exception404Module"
  }
];

export const mainRoutes: Routes = [
  {
    path: environment.layout,
    loadChildren: "src/main/layout/layout.module#LayoutModule"
  },
  { path: "", redirectTo: environment.layout, pathMatch: "full" },

  ...shareRoutes
];

export const layoutRoutes: Routes = [
  { path: "", redirectTo: environment.defaultPage, pathMatch: "full" },
  { path: "home", loadChildren: "src/main/home/home.module#HomeModule" },
  { path: "demo", loadChildren: "src/main/demo/demo.module#DemoModule" },
  { path: "docs", loadChildren: "src/main/docs/docs.module#DocsModule" },
  { path: "news", loadChildren: "src/main/news/news.module#NewsModule" },

  ...shareRoutes
];

export interface Menu {
  id?: string;
  parentId?: string;
  label?: string;
  enLabel?: string;
  router?: string;
  icon?: string;
}

export const menus: Menu[] = [
  { id: "1", parentId: null, label: "UI库", icon: "icon-ui" },
  {
    id: "1-1",
    parentId: "1",
    label: "简介",
    router: "./docs/ui/introduction"
  },
  { id: "1-10", parentId: "1", label: "教程" },
  {
    id: "1-10-1",
    parentId: "1-10",
    label: "指南",
    router: "./docs/ui/course/guide"
  },
  { id: "1-2", parentId: "1", label: "基本组件" },
  {
    id: "1-2-20",
    parentId: "1-2",
    label: "图标",
    enLabel: "Icon",
    router: "./docs/ui/components/icon"
  },
  {
    id: "1-2-1",
    parentId: "1-2",
    label: "输入框",
    enLabel: "Input",
    router: "./docs/ui/components/input"
  },
  {
    id: "1-2-2",
    parentId: "1-2",
    label: "按钮",
    enLabel: "Button",
    router: "./docs/ui/components/input-bak"
  },
  {
    id: "1-2-3",
    parentId: "1-2",
    label: "单选框",
    enLabel: "Radio",
    router: ""
  },
  {
    id: "1-2-4",
    parentId: "1-2",
    label: "多选框",
    enLabel: "CheckBox",
    router: ""
  },
  {
    id: "1-2-5",
    parentId: "1-2",
    label: "下拉选择框",
    enLabel: "Select",
    router: ""
  },
  {
    id: "1-2-6",
    parentId: "1-2",
    label: "日期选择框",
    enLabel: "DateTime",
    router: ""
  },
  { id: "1-3", parentId: "1", label: "弹出层", router: "" },
  {
    id: "1-3-1",
    parentId: "1-3",
    label: "警告提示",
    enLabel: "Alert",
    router: ""
  },
  {
    id: "1-3-2",
    parentId: "1-3",
    label: "全局提示",
    enLabel: "Message",
    router: ""
  },
  {
    id: "1-3-3",
    parentId: "1-3",
    label: "模态框",
    enLabel: "Modal",
    router: ""
  },
  {
    id: "1-3-4",
    parentId: "1-3",
    label: "通知提醒框",
    enLabel: "Notification",
    router: ""
  },
  {
    id: "1-3-5",
    parentId: "1-3",
    label: "加载中",
    enLabel: "Loading",
    router: ""
  },
  {
    id: "1-3-6",
    parentId: "1-3",
    label: "气泡确认框",
    enLabel: "PopConfirm",
    router: ""
  },
  { id: "1-4", parentId: "1", label: "表格", enLabel: "Table", router: "" },
  { id: "1-6", parentId: "1", label: "树", enLabel: "Tree", router: "" },
  { id: "1-5", parentId: "1", label: "表单", enLabel: "Form", router: "" },
  {
    id: "2",
    parentId: null,
    label: "用户模块",
    router: "",
    icon: "icon-module"
  },
  {
    id: "3",
    parentId: null,
    label: "表单设计器",
    router: "",
    icon: "icon-form"
  },
  {
    id: "4",
    parentId: null,
    label: "工作流设计",
    router: "",
    icon: "icon-workflow"
  },
  {
    id: "5",
    parentId: null,
    label: "代码生成",
    router: "",
    icon: "icon-code"
  }
];
