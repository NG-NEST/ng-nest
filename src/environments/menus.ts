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
    "id": "3-0-10",
    "parentId": "3-0",
    "name": "grid",
    "router": "./docs/ui/components/grid",
    "label": "Grid 栅格分栏",
    "category": "Basic",
    "order": 1
  },
  {
    "id": "3-0-4",
    "parentId": "3-0",
    "name": "container",
    "router": "./docs/ui/components/container",
    "label": "Container 布局容器",
    "category": "Basic",
    "order": 2
  },
  {
    "id": "3-0-12",
    "parentId": "3-0",
    "name": "icon",
    "router": "./docs/ui/components/icon",
    "label": "Icon 图标",
    "category": "Basic",
    "order": 6
  },
  {
    "id": "3-0-2",
    "parentId": "3-0",
    "name": "button",
    "router": "./docs/ui/components/button",
    "label": "Button 按钮",
    "category": "Basic",
    "order": 7
  },
  {
    "id": "3-0-25",
    "parentId": "3-0",
    "name": "table",
    "router": "./docs/ui/components/table",
    "label": "Table 表格",
    "category": "Data",
    "order": 1
  },
  {
    "id": "3-0-19",
    "parentId": "3-0",
    "name": "pagination",
    "router": "./docs/ui/components/pagination",
    "label": "Pagination 分页",
    "category": "Data",
    "order": 2
  },
  {
    "id": "3-0-14",
    "parentId": "3-0",
    "name": "input",
    "router": "./docs/ui/components/input",
    "label": "Input 输入框",
    "category": "Form",
    "order": 1
  },
  {
    "id": "3-0-9",
    "parentId": "3-0",
    "name": "form",
    "router": "./docs/ui/components/form",
    "label": "Form 表单",
    "category": "Form",
    "order": 2
  },
  {
    "id": "3-0-6",
    "parentId": "3-0",
    "name": "crumb",
    "router": "./docs/ui/components/crumb",
    "label": "Crumb 面包屑",
    "category": "Navigation",
    "order": 1
  },
  {
    "id": "3-0-26",
    "parentId": "3-0",
    "name": "tabs",
    "router": "./docs/ui/components/tabs",
    "label": "Tabs 标签页",
    "category": "Navigation",
    "order": 2
  },
  {
    "id": "3-0-0",
    "parentId": "3-0",
    "name": "anchor",
    "router": "./docs/ui/components/anchor",
    "label": "Anchor 锚点",
    "category": "Navigation",
    "order": 3
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
    "name": "color",
    "router": "./docs/ui/components/color",
    "label": "文档"
  },
  {
    "id": "3-0-7",
    "parentId": "3-0",
    "name": "doc",
    "router": "./docs/ui/components/doc",
    "label": "文档"
  },
  {
    "id": "3-0-8",
    "parentId": "3-0",
    "name": "examples",
    "router": "./docs/ui/components/examples",
    "label": "示例"
  },
  {
    "id": "3-0-11",
    "parentId": "3-0",
    "name": "highlight",
    "router": "./docs/ui/components/highlight",
    "label": "代码高亮"
  },
  {
    "id": "3-0-13",
    "parentId": "3-0",
    "name": "inner",
    "router": "./docs/ui/components/inner",
    "label": "内部"
  },
  {
    "id": "3-0-20",
    "parentId": "3-0",
    "name": "pattern",
    "router": "./docs/ui/components/pattern",
    "label": "样式参数"
  },
  {
    "id": "3-0-21",
    "parentId": "3-0",
    "name": "portal",
    "router": "./docs/ui/components/portal",
    "label": "动态组件"
  },
  {
    "id": "3-0-23",
    "parentId": "3-0",
    "name": "slider",
    "router": "./docs/ui/components/slider",
    "label": "滑块"
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
    "type": "router"
  },
  {
    "id": "0",
    "parentId": null,
    "name": "code-generator",
    "router": "./docs/code-generator",
    "order": 4,
    "label": "代码生成",
    "type": "router"
  },
  {
    "id": "4",
    "parentId": null,
    "name": "user-lib",
    "router": "./docs/user-lib",
    "order": 5,
    "label": "用户模块",
    "type": "router"
  }
]