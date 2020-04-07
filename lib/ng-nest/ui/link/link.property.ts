import { XProperty, XInputBoolean } from '@ng-nest/ui/core';
import { Input } from '@angular/core';

/**
 * Link 组件名
 * @selector x-link
 * @decorator component
 */
export const XLinkPrefix = 'x-link';

/**
 * Link Property
 */
export class XLinkProperty extends XProperty {
  /**
   * 链接
   */
  @Input() href?: string;
  /**
   * 图标
   */
  @Input() icon?: string;
  /**
   * 下划线
   */
  @Input() @XInputBoolean() underline: boolean;
  /**
   * 禁用
   */
  @Input() @XInputBoolean() disabled?: boolean;
  /**
   * 图标靠右对齐
   */
  @Input('icon-right') @XInputBoolean() iconRight?: boolean;
  /**
   * 链接类型
   */
  @Input() type?: XLinkType;
  /**
   * 打开方式
   */
  @Input() target?: string;
}

/**
 * 链接类型
 */
export type XLinkType = 'primary' | 'success' | 'info' | 'warning' | 'danger';
