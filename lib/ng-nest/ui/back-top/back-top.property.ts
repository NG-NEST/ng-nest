import { XPropertyFunction, XToCssPixelValue, XToNumber } from '@ng-nest/ui/core';
import { TemplateRef, Component, input } from '@angular/core';
import type { XNumber } from '@ng-nest/ui/core';

/**
 * BackTop
 * @selector x-back-top
 * @decorator component
 */
export const XBackTopPrefix = 'x-back-top';
const X_BACK_TOP_CONFIG_NAME = 'backTop';

/**
 * BackTop Property
 */
@Component({ selector: `${XBackTopPrefix}-property`, template: '' })
export class XBackTopProperty extends XPropertyFunction(X_BACK_TOP_CONFIG_NAME) {
  /**
   * @zh_CN 距离右边的距离
   * @en_US Distance to the right
   */
  right = input<string, XNumber>(this.config?.right ?? '2.5rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 距离底部的距离
   * @en_US Distance from bottom
   */
  bottom = input<string, XNumber>(this.config?.bottom ?? '2.5rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 滚动多少高度后显示
   * @en_US Display after scrolling how much height
   */
  visibilityHeight = input<number, XNumber>(this.config?.visibilityHeight ?? 200, { transform: XToNumber });
  /**
   * @zh_CN 内容模板
   * @en_US Content template
   */
  template = input<TemplateRef<any>>();
  /**
   * @zh_CN 滚动的元素
   * @en_US Scroll element
   */
  target = input<string | HTMLElement>();
}
