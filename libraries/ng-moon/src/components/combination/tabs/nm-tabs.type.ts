import { NmIdentityOption } from "../../../interfaces/identify.type";
import { NmData } from "../../../interfaces/data.type";
// import { TemplateRef } from "@angular/core";

export const TabsPrefix = "nm-tabs";

// Tabs 参数对象
export interface NmTabsOption {
  // Data 数据
  nmData?: NmData<NmTabsNode[]>;
  // 布局方式
  nmLayout?: NmTabsLayoutEnum;
  // 激活的序号
  nmActivatedIndex?: number;
  // 节点模板
  // nmNodeTemplate?: TemplateRef<any>;
  // 重置标签页
  nmResetTabs?: boolean;
}

// Tabs 数据对象
export interface NmTabsNode extends NmIdentityOption {}

// ActivatedTabs 激活的tabs
export interface NmActivatedTab {
  nmActivatedIndex?: number;
  nmActivatedTab?: NmTabsNode;
}

// 布局方式
export enum NmTabsLayoutEnum {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left"
}
