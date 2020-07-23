import { XProperty, XNumber, XWithConfig } from '@ng-nest/ui/core';
import { Input, TemplateRef, Component } from '@angular/core';

/**
 * BackTop
 * @selector x-back-top
 * @decorator component
 */
export const XBackTopPrefix = 'x-back-top';
const X_CONFIG_NAME = 'backTop';

/**
 * BackTop Property
 */
@Component({ template: '' })
export class XBackTopProperty extends XProperty {
  /**
   * 距离右边的距离
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '2.5rem') right: string;
  /**
   * 距离底部的距离
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '2.5rem') bottom: string;
  /**
   * 滚动的多少高度后显示
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 200) visibilityHeight: XNumber;
  /**
   * 内容模板
   */
  @Input() template: TemplateRef<any>;
  /**
   * 滚动的元素
   */
  @Input() target: string | HTMLElement;
}
