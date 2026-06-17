import { Component, input } from '@angular/core';
import { XPropertyFunction } from '@ng-nest/ui/core';
import type { XSize } from '@ng-nest/ui/core';

/**
 * Divider
 * @selector x-divider
 * @decorator component
 */
export const XDividerPrefix = 'x-divider';
const X_DIVIDER_CONFIG_NAME = 'divider';

/**
 * Divider Property
 */
@Component({ selector: `${XDividerPrefix}-property`, template: '' })
export class XDividerProperty extends XPropertyFunction(X_DIVIDER_CONFIG_NAME) {
  /**
   * @zh_CN 分割线方向
   * @en_US Divider direction
   * @example
   *
   * ```html
   * <x-divider direction="horizontal">Horizontal</x-divider>
   * <x-divider direction="vertical"></x-divider>
   * ```
   *
   */
  readonly direction = input<XDividerDirection>(this.config?.direction ?? 'horizontal');
  /**
   * @zh_CN 标题位置
   * @en_US Title position
   * @example
   *
   * ```html
   * <x-divider position="left">Left</x-divider>
   * <x-divider position="center">Center</x-divider>
   * <x-divider position="right">Right</x-divider>
   * ```
   *
   */
  readonly position = input<XDividerPosition>(this.config?.position ?? 'center');
  /**
   * @zh_CN 分割线变体
   * @en_US Divider variant
   * @example
   *
   * ```html
   * <x-divider variant="solid">Solid</x-divider>
   * <x-divider variant="dashed">Dashed</x-divider>
   * <x-divider variant="dotted">Dotted</x-divider>
   * ```
   *
   */
  readonly variant = input<XDividerVariant>(this.config?.variant ?? 'solid');
  /**
   * @zh_CN 分割线尺寸（上下间隔）
   * @en_US Divider size (margin)
   * @example
   *
   * ```html
   * <x-divider size="big">Big</x-divider>
   * <x-divider size="large">Large</x-divider>
   * <x-divider size="medium">Medium</x-divider>
   * <x-divider size="small">Small</x-divider>
   * <x-divider size="mini">Mini</x-divider>
   * ```
   *
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
}

/**
 * @zh_CN 分割线方向
 * @en_US Divider direction
 */
export type XDividerDirection = 'horizontal' | 'vertical';

/**
 * @zh_CN 分割线标题位置
 * @en_US Divider title position
 */
export type XDividerPosition = 'left' | 'center' | 'right';

/**
 * @zh_CN 分割线变体
 * @en_US Divider variant
 */
export type XDividerVariant = 'solid' | 'dashed' | 'dotted';
