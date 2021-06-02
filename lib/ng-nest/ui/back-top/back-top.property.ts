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
   * @zh_CN 距离右边的距离
   * @en_US Distance to the right
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '2.5rem') right?: string;
  /**
   * @zh_CN 距离底部的距离
   * @en_US Distance from bottom
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '2.5rem') bottom?: string;
  /**
   * @zh_CN 滚动多少高度后显示
   * @en_US Display after scrolling how much height
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 200) visibilityHeight?: XNumber;
  /**
   * @zh_CN 内容模板
   * @en_US Content template
   */
  @Input() template!: TemplateRef<any>;
  /**
   * @zh_CN 滚动的元素
   * @en_US Scroll element
   */
  @Input() target?: string | HTMLElement;
}
