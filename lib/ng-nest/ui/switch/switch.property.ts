import { Component, input } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import { XToBoolean, XToCssPixelValue } from '@ng-nest/ui/core';
import type { XAlign, XBoolean, XDirection, XJustify, XNumber, XSize, XTemplate } from '@ng-nest/ui/core';

/**
 * Switch
 * @selector x-switch
 * @decorator component
 */
export const XSwitchPrefix = 'x-switch';
const X_SWITCH_CONFIG_NAME = 'switch';

/**
 * Switch Property
 */
@Component({ selector: `${XSwitchPrefix}-property`, template: '' })
export class XSwitchProperty extends XFormControlFunction(X_SWITCH_CONFIG_NAME) {
  /**
   * @zh_CN 显示加载中
   * @en_US Show loading
   */
  readonly loading = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 手动控制
   * @en_US Manual control
   */
  readonly manual = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 显示文字或者自定义模版（开启状态）
   * @en_US Display text or custom template (open state)
   */
  readonly checkedText = input<XTemplate>();
  /**
   * @zh_CN 显示文字或者自定义模版（关闭状态）
   * @en_US Display text or custom template (closed)
   */
  readonly unCheckedText = input<XTemplate>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  override readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  override readonly label = input<string>('');
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  override readonly labelWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  override readonly labelAlign = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  override readonly justify = input<XJustify>('start');
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  override readonly align = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  override readonly direction = input<XDirection>('column');
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  override readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  override readonly required = input<boolean, XBoolean>(false, { transform: XToBoolean });
}

/**
 * Switch Option
 */
export interface XSwitchOption extends XFormOption {
  /**
   * @zh_CN 显示加载中
   * @en_US Show loading
   */
  loading?: boolean;
  /**
   * @zh_CN 手动控制
   * @en_US Manual control
   */
  manual?: boolean;
  /**
   * @zh_CN 显示文字或者自定义模版（开启状态）
   * @en_US Display text or custom template (open state)
   */
  checkedText?: XTemplate;
  /**
   * @zh_CN 显示文字或者自定义模版（关闭状态）
   * @en_US Display text or custom template (closed)
   */
  unCheckedText?: XTemplate;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  label?: string;
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  labelWidth?: string;
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  labelAlign?: XAlign;
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  justify?: XJustify;
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  align?: XAlign;
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  direction?: XDirection;
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  disabled?: boolean;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  required?: boolean;
}
