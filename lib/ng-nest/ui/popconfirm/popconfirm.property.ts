import { XPlacement, XTemplate, XProperty, XWithConfig, XInputBoolean, XBoolean } from '@ng-nest/ui/core';
import { XPopoverTrigger } from '@ng-nest/ui/popover';
import { Input, Output, EventEmitter, Component } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Popconfirm
 * @selector x-popconfirm
 * @decorator component
 */
export const XPopconfirmPrefix = 'x-popconfirm';
const X_CONFIG_NAME = 'popconfirm';

/**
 * Popconfirm Property
 */
@Component({ template: '' })
export class XPopconfirmProperty extends XProperty {
  /**
   * @zh_CN 标题，支持自定义模板
   * @en_US Title, support custom template
   */
  @Input() title?: XTemplate;
  /**
   * @zh_CN 内容，支持自定义模板
   * @en_US Content, support custom templates
   */
  @Input() content?: XTemplate;
  /**
   * @zh_CN 弹出的位置
   * @en_US Pop-up position
   */
  @Input() @XWithConfig<XPlacement>(X_CONFIG_NAME, 'bottom') placement?: XPlacement;
  /**
   * @zh_CN 激活方式
   * @en_US Activation method
   */
  @Input() @XWithConfig<XPopoverTrigger>(X_CONFIG_NAME, 'click') trigger?: XPopoverTrigger;
  /**
   * @zh_CN 宽度
   * @en_US Width
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '12rem') width?: string;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, 'fto-help-circle') icon?: string;
  /**
   * @zh_CN 图标颜色
   * @en_US Icon color
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '#e6a23c') iconColor?: string;
  /**
   * @zh_CN 取消的文字
   * @en_US Canceled text
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) cancelText?: string;
  /**
   * @zh_CN 确认的文字
   * @en_US Confirmed text
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) confirmText?: string;
  /**
   * @zh_CN 确认异步 Observable
   * @en_US Confirm async
   */
  @Input() confirmAsync?: Observable<void>;
  /**
   * @zh_CN 条件触发
   * @en_US condition trigger
   */
  @Input() @XInputBoolean() condition?: XBoolean;
  /**
   * @zh_CN 取消的点击事件
   * @en_US Cancelled click event
   */
  @Output() cancel = new EventEmitter();
  /**
   * @zh_CN 确认的点击事件
   * @en_US Confirmed click event
   */
  @Output() confirm = new EventEmitter();
}
