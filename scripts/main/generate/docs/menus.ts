export interface NcMenu {
  id?: string;
  parentId?: string;
  name?: string;
  label?: string;
  enLabel?: string;
  router?: string;
  icon?: string;
}
export const menus: NcMenu[] = [
  { id: "1", parentId: null, name: "ui", label: "UI库", icon: "icon-ui" },
  // {
  //   id: "1-1",
  //   parentId: "1",
  //   label: "简介",
  //   router: "./docs/ui/introduction"
  // },
  // { id: "1-10", parentId: "1", label: "教程" },
  // {
  //   id: "1-10-1",
  //   parentId: "1-10",
  //   label: "指南",
  //   router: "./docs/ui/course/guide"
  // },
  // { id: "1-2", parentId: "1", label: "基本组件" },
  // {
  //   id: "1-2-20",
  //   parentId: "1-2",
  //   label: "图标",
  //   enLabel: "Icon",
  //   router: "./docs/ui/components/icon"
  // },
  // {
  //   id: "1-2-1",
  //   parentId: "1-2",
  //   label: "输入框",
  //   enLabel: "Input",
  //   router: "./docs/ui/components/input"
  // },
  // {
  //   id: "1-2-2",
  //   parentId: "1-2",
  //   label: "按钮",
  //   enLabel: "Button",
  //   router: "./docs/ui/components/input-bak"
  // },
  // {
  //   id: "1-2-3",
  //   parentId: "1-2",
  //   label: "单选框",
  //   enLabel: "Radio",
  //   router: ""
  // },
  // {
  //   id: "1-2-4",
  //   parentId: "1-2",
  //   label: "多选框",
  //   enLabel: "CheckBox",
  //   router: ""
  // },
  // {
  //   id: "1-2-5",
  //   parentId: "1-2",
  //   label: "下拉选择框",
  //   enLabel: "Select",
  //   router: ""
  // },
  // {
  //   id: "1-2-6",
  //   parentId: "1-2",
  //   label: "日期选择框",
  //   enLabel: "DateTime",
  //   router: ""
  // },
  // { id: "1-3", parentId: "1", label: "弹出层", router: "" },
  // {
  //   id: "1-3-1",
  //   parentId: "1-3",
  //   label: "警告提示",
  //   enLabel: "Alert",
  //   router: ""
  // },
  // {
  //   id: "1-3-2",
  //   parentId: "1-3",
  //   label: "全局提示",
  //   enLabel: "Message",
  //   router: ""
  // },
  // {
  //   id: "1-3-3",
  //   parentId: "1-3",
  //   label: "模态框",
  //   enLabel: "Modal",
  //   router: ""
  // },
  // {
  //   id: "1-3-4",
  //   parentId: "1-3",
  //   label: "通知提醒框",
  //   enLabel: "Notification",
  //   router: ""
  // },
  // {
  //   id: "1-3-5",
  //   parentId: "1-3",
  //   label: "加载中",
  //   enLabel: "Loading",
  //   router: ""
  // },
  // {
  //   id: "1-3-6",
  //   parentId: "1-3",
  //   label: "气泡确认框",
  //   enLabel: "PopConfirm",
  //   router: ""
  // },
  // { id: "1-4", parentId: "1", label: "表格", enLabel: "Table", router: "" },
  // { id: "1-6", parentId: "1", label: "树", enLabel: "Tree", router: "" },
  // { id: "1-5", parentId: "1", label: "表单", enLabel: "Form", router: "" },
  {
    id: "2",
    parentId: null,
    name: "user-lib",
    label: "用户模块",
    icon: "icon-module"
  },
  {
    id: "3",
    parentId: null,
    name: "form-design",
    label: "表单设计器",
    icon: "icon-form"
  },
  {
    id: "4",
    parentId: null,
    name: "workflow-design",
    label: "工作流设计",
    icon: "icon-workflow"
  },
  {
    id: "5",
    parentId: null,
    name: "code-generator",
    label: "代码生成",
    icon: "icon-code"
  }
];
