import { XProperty } from '@ng-nest/ui/core';
import { Input, TemplateRef, Component } from '@angular/core';

/**
 * BackTop
 * @selector x-back-top
 * @decorator component
 */
export const XBackTopPrefix = 'x-back-top';

/**
 * BackTop Property
 */
@Component({ template: '' })
export class XBackTopProperty extends XProperty {
  /**
   * 距离右边的距离
   */
  @Input() right: string = '2.5rem';
  /**
   * 距离底部的距离
   */
  @Input() bottom: string = '2.5rem';
  /**
   * 滚动的多少高度后显示
   */
  @Input('visibility-height') visibilityHeight: number = 200;
  /**
   * 内容模板
   */
  @Input() template: TemplateRef<any>;
  /**
   * 滚动的元素
   */
  @Input() target: string | HTMLElement;
}
