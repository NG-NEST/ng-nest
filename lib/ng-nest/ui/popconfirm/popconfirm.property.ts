import { XPlacement, XTemplate, XProperty, XWithConfig } from '@ng-nest/ui/core';
import { XPopoverTrigger } from '@ng-nest/ui/popover';
import { Input, Output, EventEmitter, Component } from '@angular/core';

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
   * 标题，支持自定义模板
   */
  @Input() title?: XTemplate;
  /**
   * 内容，支持自定义模板
   */
  @Input() content?: XTemplate;
  /**
   * 弹出的位置
   */
  @Input() @XWithConfig<XPlacement>(X_CONFIG_NAME, 'bottom') placement: XPlacement;
  /**
   * 激活方式
   */
  @Input() @XWithConfig<XPopoverTrigger>(X_CONFIG_NAME, 'click') trigger: XPopoverTrigger;
  /**
   * 宽度
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '10rem') width: string;
  /**
   * 图标
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, 'fto-help-circle') icon: string;
  /**
   * 图标颜色
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '#e6a23c') iconColor: string;
  /**
   * 取消的文字
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '取消') cancelText: string;
  /**
   * 确认的文字
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '确认') confirmText: string;
  /**
   * 取消的点击事件
   */
  @Output() cancel = new EventEmitter();
  /**
   * 确认的点击事件
   */
  @Output() confirm = new EventEmitter();
}
