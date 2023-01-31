import { Component, Input } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';
import { XBoolean, XInputBoolean, XTemplate } from '@ng-nest/ui/core';

/**
 * Switch
 * @selector x-switch
 * @decorator component
 */
export const XSwitchPrefix = 'x-switch';

/**
 * Switch Property
 */
@Component({ template: '' })
export class XSwitchProperty extends XControlValueAccessor<boolean> implements XSwitchOption {
  /**
   * @zh_CN 显示加载中
   * @en_US Show loading
   */
  @Input() @XInputBoolean() loading: XBoolean = false;
  /**
   * @zh_CN 手动控制
   * @en_US Manual control
   */
  @Input() @XInputBoolean() manual: XBoolean = false;
  /**
   * @zh_CN 显示文字或者自定义模版（开启状态）
   * @en_US Display text or custom template (open state)
   */
  @Input() checkedText?: XTemplate;
  /**
   * @zh_CN 显示文字或者自定义模版（关闭状态）
   * @en_US Display text or custom template (closed)
   */
  @Input() unCheckedText?: XTemplate;
}

/**
 * Switch Option
 * @undocument true
 */
export interface XSwitchOption extends XFormOption {
  /**
   * @zh_CN 显示加载中
   * @en_US Show loading
   */
  loading?: XBoolean;
  /**
   * @zh_CN 手动控制
   * @en_US Manual control
   */
  manual?: XBoolean;
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
}
