import { XType, XSize, XProperty, XInputBoolean, XBoolean, XWithConfig } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Tag
 * @selector x-tag
 * @decorator component
 */
export const XTagPrefix = 'x-tag';
const X_CONFIG_NAME = 'tag';

/**
 * Tag Property
 */
@Component({ selector: `${XTagPrefix}-property`, template: '' })
export class XTagProperty extends XProperty {
  /**
   * @zh_CN 标签样式类型
   * @en_US Label style type
   */
  @Input() type: XType = 'initial';
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size?: XSize;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) bordered!: XBoolean;
  /**
   * @zh_CN 显示关闭按钮
   * @en_US Show close button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() closable?: XBoolean;
  /**
   * @zh_CN 深色主题
   * @en_US Dark theme
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() dark?: XBoolean;
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  @Input() @XInputBoolean() disabled: XBoolean = false;
  /**
   * @zh_CN 可选择标签
   * @en_US checked
   */
  @Input() @XInputBoolean() checked: XBoolean = false;
  /**
   * @zh_CN 手动控制选择标签是否选中
   * @en_US Manual control
   */
  @Input() @XInputBoolean() manual: XBoolean = false;
  /**
   * @zh_CN 选中
   * @en_US Selected
   */
  @Input() selected?: boolean;
  /**
   * @zh_CN 样式
   * @en_US Style
   */
  @Input() style?: { [cssStyle: string]: any };
  /**
   * @zh_CN 点击关闭的事件
   * @en_US Click to close the event
   */
  @Output() close = new EventEmitter<Event>();
  /**
   * @zh_CN 选中事件
   * @en_US Selected event
   */
  @Output() selectedChange = new EventEmitter<boolean>();
}
