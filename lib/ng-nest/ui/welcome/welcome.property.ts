import { Component, input } from '@angular/core';
import { XPropertyFunction, XStyle, XTemplate } from '@ng-nest/ui/core';

/**
 * Welcome
 * @selector x-welcome
 * @decorator component
 */
export const XWelcomePrefix = 'x-welcome';
const X_WELCOME_CONFIG_NAME = 'welcome';

/**
 * Welcome Property
 */
@Component({ selector: `${XWelcomePrefix}-property`, template: '' })
export class XWelcomeProperty extends XPropertyFunction(X_WELCOME_CONFIG_NAME) {
  /**
   * @zh_CN 显示图标，支持自定义模板
   * @en_US Display icon, support custom template
   */
  readonly icon = input<XTemplate>();
  /**
   * @zh_CN 显示标题，支持自定义模板
   * @en_US Display title, support custom template
   */
  readonly title = input<XTemplate>();
  /**
   * @zh_CN 描述文字，支持自定义模板
   * @en_US Display text
   */
  readonly description = input<XTemplate>();
  /**
   * @zh_CN 形态变体
   * @en_US Variant
   */
  readonly variant = input<XWelcomeVariant>(this.config?.variant ?? 'outlined');
  /**
   * @zh_CN 自定义样式
   * @en_US Custom style
   */
  readonly style = input<XStyle>();
}

/**
 * @zh_CN 形态变体
 * @en_US Box variant
 */
export type XWelcomeVariant = 'outlined' | 'filled' | 'borderless';
