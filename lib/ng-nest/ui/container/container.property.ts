import { XPropertyFunction, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import type { XDirection, XNumber } from '@ng-nest/ui/core';

/**
 * Container
 * @selector x-container
 * @decorator component
 */
export const XContainerPrefix = 'x-container';
const X_CONTAINER_CONFIG_NAME = 'container';

/**
 * Container Property
 */
@Component({ selector: `${XContainerPrefix}-property`, template: '' })
export class XContainerProperty extends XPropertyFunction(X_CONTAINER_CONFIG_NAME) {
  /**
   * @zh_CN flex 布局下的子元素排列方向，子元素中有 x-header 或 x-footer 时为 column
   * @en_US The arrangement direction of the sub-elements under the flex layout. When the sub-elements have x-header or x-footer, it is column
   * @default ''
   */
  readonly direction = input<XDirection>(this.config?.direction!);
}

/**
 * Header
 * @selector x-header
 * @decorator component
 */
export const XHeaderPrefix = 'x-header';
const X_HEADER_CONFIG_NAME = 'header';

/**
 * Header Property
 */
@Component({ selector: `${XHeaderPrefix}-property`, template: '' })
export class XHeaderProperty extends XPropertyFunction(X_HEADER_CONFIG_NAME) {
  /**
   * @zh_CN 高度
   * @en_US Height
   */
  readonly height = input<string, XNumber>(this.config?.height ?? '3rem', { transform: XToCssPixelValue });
}

/**
 * Aside
 * @selector x-aside
 * @decorator component
 */
export const XAsidePrefix = 'x-aside';
const X_ASIDE_CONFIG_NAME = 'aside';

/**
 * Aside Property
 */
@Component({ selector: `${XAsidePrefix}-property`, template: '' })
export class XAsideProperty extends XPropertyFunction(X_ASIDE_CONFIG_NAME) {
  /**
   * @zh_CN 宽度
   * @en_US Width
   */
  readonly width = input<string, XNumber>(this.config?.width ?? '12rem', { transform: XToCssPixelValue });
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
const X_FOOTER_CONFIG_NAME = 'footer';

/**
 * Footer Property
 */
@Component({ selector: `${XFooterPrefix}-property`, template: '' })
export class XFooterProperty extends XPropertyFunction(X_FOOTER_CONFIG_NAME) {
  /**
   * @zh_CN 高度
   * @en_US Height
   */
  readonly height = input<string, XNumber>(this.config?.height ?? '3rem', { transform: XToCssPixelValue });
}
