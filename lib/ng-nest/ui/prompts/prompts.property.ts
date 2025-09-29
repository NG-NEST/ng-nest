import { Component, input, output } from '@angular/core';
import { XBoolean, XData, XIdentityProperty, XPropertyFunction, XStyle, XTemplate, XToBoolean } from '@ng-nest/ui/core';

/**
 * Prompts
 * @selector x-prompts
 * @decorator component
 */
export const XPromptsPrefix = 'x-prompts';
const X_PROPMTS_CONFIG_NAME = 'prompts';

/**
 * Prompts Property
 */
@Component({ selector: `${XPromptsPrefix}-property`, template: '' })
export class XPromptsProperty extends XPropertyFunction(X_PROPMTS_CONFIG_NAME) {
  /**
   * @zh_CN 显示标题，支持自定义模板
   * @en_US Display title, support custom template
   */
  readonly title = input<XTemplate>();
  /**
   * @zh_CN 列表数据
   * @en_US List data
   */
  readonly data = input<XData<XPromptsNode>>([]);
  /**
   * @zh_CN 纵向展示
   * @en_US List vertical display
   */
  readonly vertical = input<boolean, XBoolean>(this.config?.vertical ?? false, { transform: XToBoolean });
  /**
   * @zh_CN Item 点击事件
   * @en_US Item click event
   */
  readonly itemClick = output<XPromptsNode>();
}

/**
 * @zh_CN 提示词
 * @en_US Promtp
 */
export interface XPromptsNode extends XIdentityProperty {
  /**
   * @zh_CN 描述
   * @en_US Description
   */
  description: string;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  icon?: string;
  /**
   * @zh_CN 图标样式
   * @en_US Icon style
   */
  iconStyle?: XStyle;
  /**
   * @zh_CN 是否禁用
   * @en_US Whether to disable
   */
  disabled?: boolean;
}
