import { Component } from "@angular/core";
import { XTableAction, XTableColumn } from "@ng-nest/ui/table";
import { DefaultService } from "./default.service";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styles: [
    `
      .header-name,
      .body-name {
        display: flex;
        align-items: center;
      }
      .header-name > span,
      .body-name > span {
        margin-left: 0.25rem;
      }
    `
  ],
  providers: [DefaultService]
})
export class ExDefaultComponent {
  constructor(public defaultService: DefaultService) {}
  columns: XTableColumn[] = [
    { key: "name", label: "用户", flex: 1.5, search: true, sort: true },
    { key: "position", label: "职位", flex: 0.5, sort: true },
    { key: "email", label: "邮箱", flex: 1 },
    { key: "phone", label: "电话", flex: 1 },
    { key: "organization", label: "组织机构", flex: 1, sort: true }
  ];
  actions: XTableAction[] = [
    { label: "新增", icon: "fto-plus", type: "primary" },
    { label: "导出", icon: "fto-download" },
    { label: "批量操作", icon: "fto-list" },
    {
      icon: "fto-menu",
      title: "列表视图",
      activated: true,
      actionLayoutType: "top-right-icon"
    },
    {
      icon: "fto-disc",
      title: "组织视图",
      actionLayoutType: "top-right-icon",
      group: "organization"
    },
    {
      icon: "fto-briefcase",
      title: "职位视图",
      actionLayoutType: "top-right-icon",
      group: "position"
    },
    {
      icon: "fto-edit",
      title: "编辑",
      actionLayoutType: "row-icon"
    },
    {
      icon: "fto-trash-2",
      title: "删除",
      actionLayoutType: "row-icon"
    }
  ];
}
