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