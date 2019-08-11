import { Menu } from "./routes";
export const menus: Menu[] = [
  {
    "id": "2-2",
    "parentId": "2",
    "name": "introduction",
    "router": "./docs/ui/introduction",
    "order": 1,
    "label": "简介"
  },
  {
    "id": "2-1",
    "parentId": "2",
    "name": "course",
    "router": "./docs/ui/course",
    "order": 2,
    "label": "教程",
    "type": "router"
  },
  {
    "id": "2-0",
    "parentId": "2",
    "name": "components",
    "router": "./docs/ui/components",
    "order": 3,
    "label": "组件",
    "type": "router"
  },
  {
    "id": "2-0-0",
    "parentId": "2-0",
    "name": "basic",
    "router": "./docs/ui/components/basic",
    "order": 1,
    "label": "基本",
    "type": "router"
  },
  {
    "id": "2-0-1",
    "parentId": "2-0",
    "name": "combination",
    "router": "./docs/ui/components/combination",
    "order": 2,
    "label": "组合",
    "type": "router"
  },
  {
    "id": "2-0-2",
    "parentId": "2-0",
    "name": "senior",
    "router": "./docs/ui/components/senior",
    "order": 3,
    "label": "高级",
    "type": "router"
  },
  {
    "id": "2-0-0-0",
    "parentId": "2-0-0",
    "name": "highlight",
    "router": "./docs/ui/components/basic/highlight",
    "label": "代码高亮"
  },
  {
    "id": "2-0-0-1",
    "parentId": "2-0-0",
    "name": "icon",
    "router": "./docs/ui/components/basic/icon",
    "label": "图标"
  },
  {
    "id": "2-0-0-3",
    "parentId": "2-0-0",
    "name": "slider",
    "router": "./docs/ui/components/basic/slider",
    "label": "滑块"
  },
  {
    "id": "2-0-1-0",
    "parentId": "2-0-1",
    "name": "anchor",
    "router": "./docs/ui/components/combination/anchor",
    "label": "锚点"
  },
  {
    "id": "2-0-1-1",
    "parentId": "2-0-1",
    "name": "input",
    "router": "./docs/ui/components/combination/input",
    "label": "输入框"
  },
  {
    "id": "2-0-1-3",
    "parentId": "2-0-1",
    "name": "tabs",
    "router": "./docs/ui/components/combination/tabs",
    "label": "标签页"
  },
  {
    "id": "2-0-2-0",
    "parentId": "2-0-2",
    "name": "doc",
    "router": "./docs/ui/components/senior/doc",
    "label": "文档"
  },
  {
    "id": "2-0-2-1",
    "parentId": "2-0-2",
    "name": "exmaples",
    "router": "./docs/ui/components/senior/exmaples",
    "label": "示例"
  },
  {
    "id": "2-1-0",
    "parentId": "2-1",
    "name": "guide",
    "router": "./docs/ui/course/guide",
    "order": 1,
    "label": "指南"
  },
  {
    "id": "2",
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
    "id": "4",
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
    "id": "3",
    "parentId": null,
    "name": "user-lib",
    "router": "./docs/user-lib",
    "order": 5,
    "label": "用户模块",
    "icon": "adt-fire",
    "type": "router"
  }
]