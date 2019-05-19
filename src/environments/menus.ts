import { Menu } from "./routes";
export const menus: Menu[] = [
  {
    "id": "0",
    "parentId": null,
    "name": "code-generator",
    "router": "./docs/code-generator",
    "label": "代码生成",
    "icon": "adt-fire",
    "type": "router"
  },
  {
    "id": "1",
    "parentId": null,
    "name": "form-design",
    "router": "./docs/form-design",
    "label": "表单设计器",
    "icon": "adt-fire",
    "type": "router"
  },
  {
    "id": "2",
    "parentId": null,
    "name": "ui",
    "router": "./docs/ui",
    "label": "UI库",
    "icon": "adt-fire",
    "type": "router"
  },
  {
    "id": "2-0",
    "parentId": "2",
    "name": "course",
    "router": "./docs/ui/course",
    "label": "教程",
    "type": "router"
  },
  {
    "id": "2-0-0",
    "parentId": "2-0",
    "name": "guide",
    "router": "./docs/ui/course/guide",
    "label": "指南"
  },
  {
    "id": "2-1",
    "parentId": "2",
    "name": "introduction",
    "router": "./docs/ui/introduction",
    "label": "简介"
  },
  {
    "id": "3",
    "parentId": null,
    "name": "user-lib",
    "router": "./docs/user-lib",
    "label": "用户模块",
    "icon": "adt-fire",
    "type": "router"
  },
  {
    "id": "4",
    "parentId": null,
    "name": "workflow-design",
    "router": "./docs/workflow-design",
    "label": "工作流设计",
    "icon": "adt-fire",
    "type": "router"
  }
]