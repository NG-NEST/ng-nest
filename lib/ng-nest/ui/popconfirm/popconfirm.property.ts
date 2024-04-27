import { XPropertyFunction, XToCssPixelValue, XToBoolean } from '@ng-nest/ui/core';
import { Component, input, output } from '@angular/core';
import { Observable } from 'rxjs';
import type { XPopoverTrigger } from '@ng-nest/ui/popover';
import type { XPlacement, XTemplate, XBoolean, XNumber } from '@ng-nest/ui/core';

/**
 * Popconfirm
 * @selector x-popconfirm
 * @decorator component
 */
export const XPopconfirmPrefix = 'x-popconfirm';
const X_POPCONFIRM_CONFIG_NAME = 'popconfirm';

/**
 * Popconfirm Property
 */
@Component({ selector: `${XPopconfirmPrefix}-property`, template: '' })
export class XPopconfirmProperty extends XPropertyFunction(X_POPCONFIRM_CONFIG_NAME) {
  /**
   * @zh_CN 标题，支持自定义模板
   * @en_US Title, support custom template
   */
  readonly title = input<XTemplate>('');
  /**
   * @zh_CN 内容，支持自定义模板
   * @en_US Content, support custom templates
   */
  readonly content = input<XTemplate>('');
  /**
   * @zh_CN 弹出的位置
   * @en_US Pop-up position
   */
  readonly placement = input<XPlacement>(this.config?.placement ?? 'bottom');
  /**
   * @zh_CN 激活方式
   * @en_US Activation method
   */
  readonly trigger = input<XPopoverTrigger>(this.config?.trigger ?? 'click');
  /**
   * @zh_CN 宽度
   * @en_US width
   */
  readonly width = input<string, XNumber>(this.config?.width ?? '', { transform: XToCssPixelValue });
  /**
   * @zh_CN 最大宽度
   * @en_US Max width
   */
  readonly maxWidth = input<string, XNumber>(this.config?.maxWidth ?? '12rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 最小宽度
   * @en_US Min width
   */
  readonly minWidth = input<string, XNumber>(this.config?.minWidth ?? '12rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  readonly icon = input<string>(this.config?.icon ?? 'fto-help-circle');
  /**
   * @zh_CN 图标颜色
   * @en_US Icon color
   */
  readonly iconColor = input<string>(this.config?.iconColor ?? '#e6a23c');
  /**
   * @zh_CN 取消的文字
   * @en_US Canceled text
   */
  readonly cancelText = input<string>(this.config?.cancelText ?? '');
  /**
   * @zh_CN 确认的文字
   * @en_US Confirmed text
   */
  readonly confirmText = input<string>(this.config?.confirmText ?? '');
  /**
   * @zh_CN 确认异步 Observable
   * @en_US Confirm async
   */
  readonly confirmAsync = input<Observable<void>>();
  /**
   * @zh_CN 条件触发
   * @en_US condition trigger
   */
  readonly condition = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 取消的点击事件
   * @en_US Cancelled click event
   */
  readonly cancel = output<Event>();
  /**
   * @zh_CN 确认的点击事件
   * @en_US Confirmed click event
   */
  readonly confirm = output<Event>();
}
