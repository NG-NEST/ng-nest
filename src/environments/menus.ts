import { Menu } from "./routes";
export const menus: Menu[] = [
  {
    "id": "3-2",
    "parentId": "3",
    "name": "introduction",
    "router": "./docs/ui/introduction",
    "order": 1,
    "label": "简介"
  },
  {
    "id": "3-1",
    "parentId": "3",
    "name": "course",
    "router": "./docs/ui/course",
    "order": 2,
    "label": "教程",
    "type": "router"
  },
  {
    "id": "3-0",
    "parentId": "3",
    "name": "components",
    "router": "./docs/ui/components",
    "order": 3,
    "label": "组件",
    "type": "router"
  },
  {
    "id": "3-0-0",
    "parentId": "3-0",
    "name": "anchor",
    "router": "./docs/ui/components/anchor",
    "label": "锚点"
  },
  {
    "id": "3-0-1",
    "parentId": "3-0",
    "name": "api",
    "router": "./docs/ui/components/api",
    "label": "API 参数"
  },
  {
    "id": "3-0-3",
    "parentId": "3-0",
    "name": "doc",
    "router": "./docs/ui/components/doc",
    "label": "文档"
  },
  {
    "id": "3-0-4",
    "parentId": "3-0",
    "name": "examples",
    "router": "./docs/ui/components/examples",
    "label": "示例"
  },
  {
    "id": "3-0-5",
    "parentId": "3-0",
    "name": "form",
    "router": "./docs/ui/components/form",
    "label": "表单"
  },
  {
    "id": "3-0-6",
    "parentId": "3-0",
    "name": "grid",
    "router": "./docs/ui/components/grid",
    "label": "栅格"
  },
  {
    "id": "3-0-7",
    "parentId": "3-0",
    "name": "highlight",
    "router": "./docs/ui/components/highlight",
    "label": "代码高亮"
  },
  {
    "id": "3-0-8",
    "parentId": "3-0",
    "name": "icon",
    "router": "./docs/ui/components/icon",
    "label": "图标"
  },
  {
    "id": "3-0-9",
    "parentId": "3-0",
    "name": "input",
    "router": "./docs/ui/components/input",
    "label": "输入框"
  },
  {
    "id": "3-0-14",
    "parentId": "3-0",
    "name": "pattern",
    "router": "./docs/ui/components/pattern",
    "label": "样式参数"
  },
  {
    "id": "3-0-16",
    "parentId": "3-0",
    "name": "slider",
    "router": "./docs/ui/components/slider",
    "label": "滑块"
  },
  {
    "id": "3-0-18",
    "parentId": "3-0",
    "name": "tabs",
    "router": "./docs/ui/components/tabs",
    "label": "标签页"
  },
  {
    "id": "3-1-0",
    "parentId": "3-1",
    "name": "guide",
    "router": "./docs/ui/course/guide",
    "order": 1,
    "label": "指南"
  },
  {
    "id": "2",
    "parentId": null,
    "name": "ng-nest",
    "router": "./docs/ng-nest",
    "order": 0,
    "label": "NG-NEST"
  },
  {
    "id": "3",
    "parentId": null,
    "name": "ui",
    "router": "./docs/ui",
    "order": 1,
    "label": "UI库",
    "icon": "adt-fire",
    "type": "router"
  },
  {
    "id": "1",
    "parentId": null,
    "name": "form-design",
    "router": "./docs/form-design",
    "order": 2,
    "label": "表单设计器",
    "icon": "adt-fire",
    "type": "router"
  },
  {
    "id": "5",
    "parentId": null,
    "name": "workflow-design",
    "router": "./docs/workflow-design",
    "order": 3,
    "label": "工作流设计",
    "icon": "adt-fire",
    "type": "router"
  },
  {
    "id": "0",
    "parentId": null,
    "name": "code-generator",
    "router": "./docs/code-generator",
    "order": 4,
    "label": "代码生成",
    "icon": "adt-fire",
    "type": "router"
  },
  {
    "id": "4",
    "parentId": null,
    "name": "user-lib",
    "router": "./docs/user-lib",
    "order": 5,
    "label": "用户模块",
    "icon": "adt-fire",
    "type": "router"
  }
]