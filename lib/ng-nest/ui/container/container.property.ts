import { XDirection, XProperty, XNumber } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Container
 * @selector x-container
 * @decorator component
 */
export const XContainerPrefix = 'x-container';

/**
 * Container Property
 */
@Component({ template: '' })
export class XContainerProperty extends XProperty {
  /**
   * flex 布局下的子元素排列方向
   * @description 子元素中有 x-header 或 x-footer 时为 column
   */
  @Input() direction: XDirection;
}

/**
 * Header
 * @selector x-header
 * @decorator component
 */
export const XHeaderPrefix = 'x-header';

/**
 * Header Property
 */
@Component({ template: '' })
export class XHeaderProperty extends XProperty {
  /**
   * 高度，rem
   */
  @Input() height: XNumber = 3;
}

/**
 * Aside
 * @selector x-aside
 * @decorator component
 */
export const XAsidePrefix = 'x-aside';

/**
 * Aside Property
 */
@Component({ template: '' })
export class XAsideProperty extends XProperty {
  /**
   * 宽度，rem
   */
  @Input() width: XNumber = 12;
}

/**
 * main
 * @selector x-main
 * @decorator component
 */
export const XMainPrefix = 'x-main';

/**
 * Footer
 * @selector x-footer
 * @decorator component
 */
export const XFooterPrefix = 'x-footer';

/**
 * Footer Property
 */
@Component({ template: '' })
export class XFooterProperty extends XProperty {
  /**
   * 高度，rem
   */
  @Input() height: XNumber = 3;
}
