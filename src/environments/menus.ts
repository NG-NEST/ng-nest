import { Menu } from './routes';
export const menus: Menu[] = [
  {
    "id": "3-4",
    "parentId": "3",
    "name": "introduction",
    "router": "./docs/ui/introduction",
    "order": 1,
    "label": "简介"
  },
  {
    "id": "3-2",
    "parentId": "3",
    "name": "getting-started",
    "router": "./docs/ui/getting-started",
    "order": 2,
    "label": "快速上手 [待]"
  },
  {
    "id": "3-6",
    "parentId": "3",
    "name": "schematics",
    "router": "./docs/ui/schematics",
    "order": 3,
    "label": "脚手架 [待]"
  },
  {
    "id": "3-3",
    "parentId": "3",
    "name": "i18n",
    "router": "./docs/ui/i18n",
    "order": 4,
    "label": "国际化 [待]"
  },
  {
    "id": "3-1",
    "parentId": "3",
    "name": "course",
    "router": "./docs/ui/course",
    "order": 9,
    "label": "教程 [待]",
    "type": "router"
  },
  {
    "id": "3-0",
    "parentId": "3",
    "name": "components",
    "router": "./docs/ui/components",
    "order": 10,
    "label": "组件",
    "type": "router"
  },
  {
    "id": "3-0-7",
    "parentId": "3-0",
    "name": "border",
    "router": "./docs/ui/components/border",
    "label": "Border 边框",
    "category": "Basic"
  },
  {
    "id": "3-0-8",
    "parentId": "3-0",
    "name": "button",
    "router": "./docs/ui/components/button",
    "label": "Button 按钮",
    "category": "Basic"
  },
  {
    "id": "3-0-15",
    "parentId": "3-0",
    "name": "color",
    "router": "./docs/ui/components/color",
    "label": "Color 色彩",
    "category": "Basic"
  },
  {
    "id": "3-0-18",
    "parentId": "3-0",
    "name": "container",
    "router": "./docs/ui/components/container",
    "label": "Container 布局容器",
    "category": "Basic"
  },
  {
    "id": "3-0-29",
    "parentId": "3-0",
    "name": "fence",
    "router": "./docs/ui/components/fence",
    "label": "Layout 栅格布局",
    "category": "Basic"
  },
  {
    "id": "3-0-33",
    "parentId": "3-0",
    "name": "icon",
    "router": "./docs/ui/components/icon",
    "label": "Icon 图标",
    "category": "Basic"
  },
  {
    "id": "3-0-38",
    "parentId": "3-0",
    "name": "link",
    "router": "./docs/ui/components/link",
    "label": "Link 文字链接",
    "category": "Basic"
  },
  {
    "id": "3-0-85",
    "parentId": "3-0",
    "name": "typography",
    "router": "./docs/ui/components/typography",
    "label": "Typography 字体",
    "category": "Basic"
  },
  {
    "id": "3-0-4",
    "parentId": "3-0",
    "name": "avatar",
    "router": "./docs/ui/components/avatar",
    "label": "Avatar 头像",
    "category": "Data"
  },
  {
    "id": "3-0-6",
    "parentId": "3-0",
    "name": "badge",
    "router": "./docs/ui/components/badge",
    "label": "Badge 标记",
    "category": "Data"
  },
  {
    "id": "3-0-9",
    "parentId": "3-0",
    "name": "calendar",
    "router": "./docs/ui/components/calendar",
    "label": "Calendar 日历",
    "category": "Data"
  },
  {
    "id": "3-0-10",
    "parentId": "3-0",
    "name": "card",
    "router": "./docs/ui/components/card",
    "label": "Card 卡片",
    "category": "Data"
  },
  {
    "id": "3-0-11",
    "parentId": "3-0",
    "name": "carousel",
    "router": "./docs/ui/components/carousel",
    "label": "Carousel 走马灯",
    "category": "Data"
  },
  {
    "id": "3-0-14",
    "parentId": "3-0",
    "name": "collapse",
    "router": "./docs/ui/components/collapse",
    "label": "Collapse 折叠面板",
    "category": "Data"
  },
  {
    "id": "3-0-17",
    "parentId": "3-0",
    "name": "comment",
    "router": "./docs/ui/components/comment",
    "label": "Comment 评论",
    "category": "Data"
  },
  {
    "id": "3-0-22",
    "parentId": "3-0",
    "name": "descriptions",
    "router": "./docs/ui/components/descriptions",
    "label": "Descriptions 描述列表 [待]",
    "category": "Data"
  },
  {
    "id": "3-0-27",
    "parentId": "3-0",
    "name": "empty",
    "router": "./docs/ui/components/empty",
    "label": "Empty 空状态",
    "category": "Data"
  },
  {
    "id": "3-0-46",
    "parentId": "3-0",
    "name": "outlet",
    "router": "./docs/ui/components/outlet",
    "label": "Outlet 自定义模板",
    "category": "Data"
  },
  {
    "id": "3-0-49",
    "parentId": "3-0",
    "name": "pagination",
    "router": "./docs/ui/components/pagination",
    "label": "Pagination 分页",
    "category": "Data"
  },
  {
    "id": "3-0-54",
    "parentId": "3-0",
    "name": "progress",
    "router": "./docs/ui/components/progress",
    "label": "Progress 进度条",
    "category": "Data"
  },
  {
    "id": "3-0-64",
    "parentId": "3-0",
    "name": "statistic",
    "router": "./docs/ui/components/statistic",
    "label": "Statistic 统计",
    "category": "Data"
  },
  {
    "id": "3-0-68",
    "parentId": "3-0",
    "name": "table",
    "router": "./docs/ui/components/table",
    "label": "Table 表格",
    "category": "Data"
  },
  {
    "id": "3-0-70",
    "parentId": "3-0",
    "name": "tag",
    "router": "./docs/ui/components/tag",
    "label": "Tag 标签",
    "category": "Data"
  },
  {
    "id": "3-0-72",
    "parentId": "3-0",
    "name": "text-retract",
    "router": "./docs/ui/components/text-retract",
    "label": "Text Retract 文字收起",
    "category": "Data"
  },
  {
    "id": "3-0-73",
    "parentId": "3-0",
    "name": "time-ago",
    "router": "./docs/ui/components/time-ago",
    "label": "Time Ago 时间之前",
    "category": "Data"
  },
  {
    "id": "3-0-75",
    "parentId": "3-0",
    "name": "time-range",
    "router": "./docs/ui/components/time-range",
    "label": "Time Range 时间间隔 ",
    "category": "Data"
  },
  {
    "id": "3-0-76",
    "parentId": "3-0",
    "name": "timeline",
    "router": "./docs/ui/components/timeline",
    "label": "Timeline 时间线",
    "category": "Data"
  },
  {
    "id": "3-0-79",
    "parentId": "3-0",
    "name": "tree",
    "router": "./docs/ui/components/tree",
    "label": "Tree 树形控件",
    "category": "Data"
  },
  {
    "id": "3-0-1",
    "parentId": "3-0",
    "name": "alert",
    "router": "./docs/ui/components/alert",
    "label": "Alert 警告提示 [待]",
    "category": "Feedback"
  },
  {
    "id": "3-0-25",
    "parentId": "3-0",
    "name": "drawer",
    "router": "./docs/ui/components/drawer",
    "label": "Drawer 抽屉 [待]",
    "category": "Feedback"
  },
  {
    "id": "3-0-41",
    "parentId": "3-0",
    "name": "message",
    "router": "./docs/ui/components/message",
    "label": "Message 全局提示 [待]",
    "category": "Feedback"
  },
  {
    "id": "3-0-42",
    "parentId": "3-0",
    "name": "modal",
    "router": "./docs/ui/components/modal",
    "label": "Modal 对话框 [待]",
    "category": "Feedback"
  },
  {
    "id": "3-0-45",
    "parentId": "3-0",
    "name": "notification",
    "router": "./docs/ui/components/notification",
    "label": "Notification 通知提醒框 [待]",
    "category": "Feedback"
  },
  {
    "id": "3-0-51",
    "parentId": "3-0",
    "name": "popconfirm",
    "router": "./docs/ui/components/popconfirm",
    "label": "Popconfirm 气泡确认框",
    "category": "Feedback"
  },
  {
    "id": "3-0-52",
    "parentId": "3-0",
    "name": "popover",
    "router": "./docs/ui/components/popover",
    "label": "Popover 气泡卡片",
    "category": "Feedback"
  },
  {
    "id": "3-0-58",
    "parentId": "3-0",
    "name": "result",
    "router": "./docs/ui/components/result",
    "label": "Result 结果 [待]",
    "category": "Feedback"
  },
  {
    "id": "3-0-60",
    "parentId": "3-0",
    "name": "skeleton",
    "router": "./docs/ui/components/skeleton",
    "label": "Spin 加载中 [待]",
    "category": "Feedback"
  },
  {
    "id": "3-0-63",
    "parentId": "3-0",
    "name": "spin",
    "router": "./docs/ui/components/spin",
    "label": "Skeleton 骨架屏 [待]",
    "category": "Feedback"
  },
  {
    "id": "3-0-77",
    "parentId": "3-0",
    "name": "tooltip",
    "router": "./docs/ui/components/tooltip",
    "label": "Tooltip 文字提示",
    "category": "Feedback"
  },
  {
    "id": "3-0-12",
    "parentId": "3-0",
    "name": "cascade",
    "router": "./docs/ui/components/cascade",
    "label": "Cascade 级联选择器",
    "category": "Form"
  },
  {
    "id": "3-0-13",
    "parentId": "3-0",
    "name": "checkbox",
    "router": "./docs/ui/components/checkbox",
    "label": "Checkbox 多选框",
    "category": "Form"
  },
  {
    "id": "3-0-16",
    "parentId": "3-0",
    "name": "color-picker",
    "router": "./docs/ui/components/color-picker",
    "label": "ColorPicker 颜色选择器",
    "category": "Form"
  },
  {
    "id": "3-0-21",
    "parentId": "3-0",
    "name": "date-picker",
    "router": "./docs/ui/components/date-picker",
    "label": "DatePicker 日期选择器",
    "category": "Form"
  },
  {
    "id": "3-0-30",
    "parentId": "3-0",
    "name": "form",
    "router": "./docs/ui/components/form",
    "label": "Form 表单 [待]",
    "category": "Form"
  },
  {
    "id": "3-0-35",
    "parentId": "3-0",
    "name": "input",
    "router": "./docs/ui/components/input",
    "label": "Input 输入框",
    "category": "Form"
  },
  {
    "id": "3-0-36",
    "parentId": "3-0",
    "name": "input-number",
    "router": "./docs/ui/components/input-number",
    "label": "InputNumber 计数器",
    "category": "Form"
  },
  {
    "id": "3-0-39",
    "parentId": "3-0",
    "name": "list",
    "router": "./docs/ui/components/list",
    "label": "List 列表组件",
    "category": "Form"
  },
  {
    "id": "3-0-55",
    "parentId": "3-0",
    "name": "radio",
    "router": "./docs/ui/components/radio",
    "label": "Radio 单选框",
    "category": "Form"
  },
  {
    "id": "3-0-56",
    "parentId": "3-0",
    "name": "rate",
    "router": "./docs/ui/components/rate",
    "label": "Rate 评分",
    "category": "Form"
  },
  {
    "id": "3-0-59",
    "parentId": "3-0",
    "name": "select",
    "router": "./docs/ui/components/select",
    "label": "Select 选择器",
    "category": "Form"
  },
  {
    "id": "3-0-62",
    "parentId": "3-0",
    "name": "slider-select",
    "router": "./docs/ui/components/slider-select",
    "label": "SliderSelect 滑动选择",
    "category": "Form"
  },
  {
    "id": "3-0-67",
    "parentId": "3-0",
    "name": "switch",
    "router": "./docs/ui/components/switch",
    "label": "Switch 开关",
    "category": "Form"
  },
  {
    "id": "3-0-74",
    "parentId": "3-0",
    "name": "time-picker",
    "router": "./docs/ui/components/time-picker",
    "label": "TimePicker 时间选择器",
    "category": "Form"
  },
  {
    "id": "3-0-78",
    "parentId": "3-0",
    "name": "transfer",
    "router": "./docs/ui/components/transfer",
    "label": "Transfer 穿梭框 [待]",
    "category": "Form"
  },
  {
    "id": "3-0-80",
    "parentId": "3-0",
    "name": "tree-select",
    "router": "./docs/ui/components/tree-select",
    "label": "TreeSelect 树选择 [待]",
    "category": "Form"
  },
  {
    "id": "3-0-86",
    "parentId": "3-0",
    "name": "upload",
    "router": "./docs/ui/components/upload",
    "label": "Upload 上传",
    "category": "Form"
  },
  {
    "id": "3-0-0",
    "parentId": "3-0",
    "name": "affix",
    "router": "./docs/ui/components/affix",
    "label": "Affix 固钉 [待]",
    "category": "Navigation"
  },
  {
    "id": "3-0-2",
    "parentId": "3-0",
    "name": "anchor",
    "router": "./docs/ui/components/anchor",
    "label": "Anchor 锚点",
    "category": "Navigation"
  },
  {
    "id": "3-0-5",
    "parentId": "3-0",
    "name": "back-top",
    "router": "./docs/ui/components/back-top",
    "label": "BackTop 回到顶部 [待]",
    "category": "Navigation"
  },
  {
    "id": "3-0-20",
    "parentId": "3-0",
    "name": "crumb",
    "router": "./docs/ui/components/crumb",
    "label": "Crumb 面包屑",
    "category": "Navigation"
  },
  {
    "id": "3-0-26",
    "parentId": "3-0",
    "name": "dropdown",
    "router": "./docs/ui/components/dropdown",
    "label": "Dropdown 下拉菜单 [待]",
    "category": "Navigation"
  },
  {
    "id": "3-0-40",
    "parentId": "3-0",
    "name": "menu",
    "router": "./docs/ui/components/menu",
    "label": "Menu 导航菜单 [待]",
    "category": "Navigation"
  },
  {
    "id": "3-0-48",
    "parentId": "3-0",
    "name": "page-header",
    "router": "./docs/ui/components/page-header",
    "label": "PageHeader 页头 [待]",
    "category": "Navigation"
  },
  {
    "id": "3-0-65",
    "parentId": "3-0",
    "name": "steps",
    "router": "./docs/ui/components/steps",
    "label": "Steps 步骤条 [待]",
    "category": "Navigation"
  },
  {
    "id": "3-0-69",
    "parentId": "3-0",
    "name": "tabs",
    "router": "./docs/ui/components/tabs",
    "label": "Tabs 标签页",
    "category": "Navigation"
  },
  {
    "id": "3-0-23",
    "parentId": "3-0",
    "name": "divider",
    "router": "./docs/ui/components/divider",
    "label": "Divider 分割线 [待]",
    "category": "Others"
  },
  {
    "id": "3-0-3",
    "parentId": "3-0",
    "name": "api",
    "router": "./docs/ui/components/api",
    "label": "API 参数"
  },
  {
    "id": "3-0-24",
    "parentId": "3-0",
    "name": "doc",
    "router": "./docs/ui/components/doc",
    "label": "文档"
  },
  {
    "id": "3-0-28",
    "parentId": "3-0",
    "name": "examples",
    "router": "./docs/ui/components/examples",
    "label": "示例"
  },
  {
    "id": "3-0-32",
    "parentId": "3-0",
    "name": "highlight",
    "router": "./docs/ui/components/highlight",
    "label": "代码高亮"
  },
  {
    "id": "3-0-34",
    "parentId": "3-0",
    "name": "inner",
    "router": "./docs/ui/components/inner",
    "label": "内部"
  },
  {
    "id": "3-0-50",
    "parentId": "3-0",
    "name": "pattern",
    "router": "./docs/ui/components/pattern",
    "label": "样式参数"
  },
  {
    "id": "3-0-53",
    "parentId": "3-0",
    "name": "portal",
    "router": "./docs/ui/components/portal",
    "label": "动态组件"
  },
  {
    "id": "3-0-61",
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
    "label": "指南 [待]"
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