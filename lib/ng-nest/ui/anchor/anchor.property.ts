import { Component, input } from '@angular/core';
import { XPropertyFunction, XToCssPixelValue } from '@ng-nest/ui/core';
import type { XIdentityProperty, XJustify, XPositionLeftRight, XNumber } from '@ng-nest/ui/core';

/**
 * Anchor
 * @selector x-anchor
 * @decorator component
 */
export const XAnchorPrefix = 'x-anchor';
const X_ANCHOR_CONFIG_NAME = 'anchor';

/**
 * Anchor Property
 */
@Component({ selector: `${XAnchorPrefix}-property`, template: '' })
export class XAnchorProperty extends XPropertyFunction(X_ANCHOR_CONFIG_NAME) {
  /**
   * @zh_CN 滚动区域对象
   * @en_US Scroll area object
   * @example
   *
   * ```html
   * <div #scroll style="height: 60rem; width: 100%; overflow: auto;">
   *   <x-anchor [scroll]="scroll">
   *     ...
   *   </x-anchor>
   * </div>
   * ```
   */
  readonly scroll = input<HTMLElement>();
  /**
   * @zh_CN 顶部距离
   * @en_US Top distance
   * @example
   *
   * ```html
   * <x-anchor affixTop="100">
   *   ...
   * </x-anchor>
   * ```
   *
   */
  readonly affixTop = input<string, XNumber>(this.config?.affixTop ?? '0', { transform: XToCssPixelValue });
  /**
   * @zh_CN 底部距离
   * @en_US Bottom distance
   * @example
   *
   * ```html
   * <x-anchor affixBottom="100">
   *   ...
   * </x-anchor>
   * ```
   *
   */
  readonly affixBottom = input<string, XNumber>(this.config?.affixBottom ?? '0', { transform: XToCssPixelValue });
  /**
   * @zh_CN 导航宽度
   * @en_US Navigation Width
   * @example
   *
   * ```html
   * <x-anchor affixWidth="150">
   *   ...
   * </x-anchor>
   * ```
   *
   */
  readonly affixWidth = input<string, XNumber>(this.config?.affixWidth!, { transform: XToCssPixelValue });
  /**
   * @zh_CN 导航相对内容位置
   * @en_US Navigation relative content position
   * @example
   *
   * ```html
   * <x-anchor layout="left">
   *   ...
   * </x-anchor>
   * ```
   *
   */
  readonly layout = input<XAnchorLayout>(this.config?.layout ?? 'right');
  /**
   * @zh_CN 对齐方式
   * @en_US Alignment
   * @example
   *
   * ```html
   * <x-anchor justify="end">
   *   ...
   * </x-anchor>
   * ```
   *
   */
  readonly justify = input<XJustify>(this.config?.justify ?? 'start');
}

/**
 * Anchor inner
 * @selector x-anchor-inner
 * @decorator component
 */
export const XAnchorInnerPrefix = 'x-anchor-inner';

/**
 * Anchor inner Property
 */
@Component({
  selector: `${XAnchorInnerPrefix}-property`,
  template: ''
})
export class XAnchorInnerProperty {}

/**
 * Anchor Node
 */
export interface XAnchorNode extends XIdentityProperty {
  /**
   * @zh_CN 左内边距，用来显示层级
   * @en_US Left inner margin, used to display hierarchy
   */
  left?: number;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  icon?: string;
  /**
   * @zh_CN 锚点的链接
   * @en_US Anchor link
   */
  link?: string;
}

/**
 * @zh_CN 布局方式，相对内容的位置
 * @en_US Layout method, relative content position
 */
export type XAnchorLayout = XPositionLeftRight;
