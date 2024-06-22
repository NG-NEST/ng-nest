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
   * @example
   *
   * ```html
   * <x-empty img="https://ngnest.com/img/logo/logo-144x144.png"></x-empty>
   * <x-empty [img]="imgTpl"></x-empty>
   * <ng-template #imgTpl><x-icon type="fto-user"></x-icon></ng-template>
   * ```
   *
   */
  readonly img = input<XTemplate>(this.config?.img ?? '');
  /**
   * @zh_CN 内容或自定义模板
   * @en_US Content or custom template
   * @example
   *
   * ```html
   * <x-empty content="None data"></x-empty>
   * <x-empty [content]="contentTpl"></x-empty>
   * <ng-template #contentTpl>
   *   <x-icon type="fto-user"></x-icon>
   *   None data
   * </ng-template>
   * ```
   *
   */
  readonly content = input<XTemplate>(this.config?.content ?? '');
}
