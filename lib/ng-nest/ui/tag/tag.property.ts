import { XPropertyFunction, XToBoolean } from '@ng-nest/ui/core';
import { Component, input, output, model } from '@angular/core';
import type { XType, XSize, XBoolean } from '@ng-nest/ui/core';

/**
 * Tag
 * @selector x-tag
 * @decorator component
 */
export const XTagPrefix = 'x-tag';
const X_TAG_CONFIG_NAME = 'tag';

/**
 * Tag Property
 */
@Component({ selector: `${XTagPrefix}-property`, template: '' })
export class XTagProperty extends XPropertyFunction(X_TAG_CONFIG_NAME) {
  /**
   * @zh_CN 标签样式类型
   * @en_US Label style type
   */
  readonly type = input<XType>('initial');
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 显示关闭按钮
   * @en_US Show close button
   */
  readonly closable = input<boolean, XBoolean>(this.config?.closable ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 深色主题
   * @en_US Dark theme
   */
  readonly dark = input<boolean, XBoolean>(this.config?.dark ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 可选择标签
   * @en_US checked
   */
  readonly checked = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 手动控制选择标签是否选中
   * @en_US Manual control
   */
  readonly manual = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 选中
   * @en_US Selected
   */
  readonly selected = model<boolean>(false);
  /**
   * @zh_CN 样式
   * @en_US Style
   */
  readonly style = input<{ [cssStyle: string]: any }>();
  /**
   * @zh_CN 点击关闭的事件
   * @en_US Click to close the event
   */
  readonly close = output<Event>();
}
