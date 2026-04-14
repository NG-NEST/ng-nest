import { Component, input } from '@angular/core';
import { XPropertyFunction } from '@ng-nest/ui/core';

/**
 * Splitter
 * @selector x-splitter
 * @decorator component
 */
export const XSplitterPrefix = 'x-splitter';
const X_SPLITTER_CONFIG_NAME = 'splitter';

/**
 * Splitter Property
 */
@Component({ selector: `${XSplitterPrefix}-property`, template: '' })
export class XSplitterProperty extends XPropertyFunction(X_SPLITTER_CONFIG_NAME) {
  /**
   * @zh_CN 分割方向
   * @en_US Split direction
   * @example
   *
   * ```html
   * <x-splitter direction="horizontal">
   *   <x-splitter-panel>Panel 1</x-splitter-panel>
   *   <x-splitter-panel>Panel 2</x-splitter-panel>
   * </x-splitter>
   * ```
   *
   */
  readonly direction = input<XSplitterDirection>(this.config?.direction ?? 'horizontal');
}

/**
 * @zh_CN 分割方向
 * @en_US Split direction
 */
export type XSplitterDirection = 'horizontal' | 'vertical';
