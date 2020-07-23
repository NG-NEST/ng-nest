import { XDirection, XProperty, XNumber, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Container
 * @selector x-container
 * @decorator component
 */
export const XContainerPrefix = 'x-container';
const X_CONFIG_NAME = 'container';

/**
 * Container Property
 */
@Component({ template: '' })
export class XContainerProperty extends XProperty {
  /**
   * flex 布局下的子元素排列方向
   * @description 子元素中有 x-header 或 x-footer 时为 column
   */
  @Input() @XWithConfig<XDirection>(X_CONFIG_NAME) direction: XDirection;
}

/**
 * Header
 * @selector x-header
 * @decorator component
 */
export const XHeaderPrefix = 'x-header';
const X_CONFIG_NAME_HEADER = 'header';

/**
 * Header Property
 */
@Component({ template: '' })
export class XHeaderProperty extends XProperty {
  /**
   * 高度，rem
   */
  @Input() @XWithConfig<number>(X_CONFIG_NAME_HEADER, 3) height: number;
}

/**
 * Aside
 * @selector x-aside
 * @decorator component
 */
export const XAsidePrefix = 'x-aside';
const X_CONFIG_NAME_ASIDE = 'aside';

/**
 * Aside Property
 */
@Component({ template: '' })
export class XAsideProperty extends XProperty {
  /**
   * 宽度，rem
   */
  @Input() @XWithConfig<number>(X_CONFIG_NAME_ASIDE, 12) width: number;
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
const X_CONFIG_NAME_FOOTER = 'footer';

/**
 * Footer Property
 */
@Component({ template: '' })
export class XFooterProperty extends XProperty {
  /**
   * 高度，rem
   */
  @Input() @XWithConfig<number>(X_CONFIG_NAME_FOOTER, 3) height: XNumber = 3;
}
