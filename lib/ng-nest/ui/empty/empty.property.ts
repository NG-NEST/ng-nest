import { XPropertyFunction, XTemplate } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';

/**
 * Empty
 * @selector x-empty
 * @decorator component
 */
export const XEmptyPrefix = 'x-empty';
const X_EMPTY_CONFIG_NAME = 'empty';

/**
 * Empty Property
 */
@Component({ selector: `${XEmptyPrefix}-property`, template: '' })
export class XEmptyProperty extends XPropertyFunction(X_EMPTY_CONFIG_NAME) {
  /**
   * @zh_CN 图片地址或自定义模板
   * @en_US Picture address or custom template
   */
  readonly img = input<XTemplate>(this.config?.img!);
  /**
   * @zh_CN 内容或自定义模板
   * @en_US Content or custom template
   */
  readonly content = input<XTemplate>(this.config?.content!);
}
