import { XPropertyFunction, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import type { XTemplate, XNumber, XShadow } from '@ng-nest/ui/core';

/**
 * Card
 * @selector x-card
 * @decorator component
 */
export const XCardPrefix = 'x-card';
const X_CARD_CONFIG_NAME = 'card';

/**
 * Card Property
 */
@Component({ selector: `${XCardPrefix}-property`, template: '' })
export class XCardProperty extends XPropertyFunction(X_CARD_CONFIG_NAME) {
  /**
   * @zh_CN 卡片宽度
   * @en_US Card width
   * @example
   *
   * ```html
   * <x-card width="20rem">Card</div>
   * ```
   *
   */
  readonly width = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 内容样式
   * @en_US Content style
   * @example
   *
   * ```html
   * <x-card [bodyStyle]="{ padding: 0 }">Card</div>
   * ```
   *
   */
  readonly bodyStyle = input<XCardBodyStyle>({});
  /**
   * @zh_CN 头部模板
   * @en_US Head template
   * @example
   *
   * ```html
   * <x-card width="20rem" [header]="header">
   *   <ng-template #header>
   *     <span>Title</span>
   *     <x-button type="text">action</x-button>
   *   </ng-template>
   *   Card
   * </x-card>
   * ```
   *
   */
  readonly header = input<XTemplate>();
  /**
   * @zh_CN 阴影显示方式
   * @en_US Shadow display method
   * @example
   *
   * ```html
   * <x-card shadow="always">Always</x-card>
   * <x-card shadow="hover">Hover</x-card>
   * <x-card shadow="never">Never</x-card>
   * ```
   *
   */
  readonly shadow = input<XCardShadow>(this.config?.shadow ?? 'never');
  /**
   * @zh_CN 形态变体
   * @en_US Card variant
   */
  readonly variant = input<XCardVariant>(this.config?.variant ?? 'outlined');
}

/**
 * @zh_CN 阴影显示配置
 * @en_US Shadow display configuration
 */
export type XCardShadow = XShadow;

/**
 * @zh_CN 形态变体
 * @en_US Card variant
 */
export type XCardVariant = 'outlined' | 'filled' | 'shadow' | 'borderless';

/**
 * @zh_CN 卡片内容样式类型
 * @en_US Card content style type
 */
export type XCardBodyStyle = { [property: string]: XNumber };
