import { XProperty, XPropertyFunction, XToBoolean } from '@ng-nest/ui/core';
import { Component, input, model } from '@angular/core';
import type { XTemplate, XBoolean } from '@ng-nest/ui/core';

/**
 * Collapse
 * @selector x-collapse
 * @decorator component
 */
export const XCollapsePrefix = 'x-collapse';
const X_COLLAPSE_CONFIG_NAME = 'collapse';

/**
 * Collapse Property
 */
@Component({ selector: `${XCollapsePrefix}-property`, template: '' })
export class XCollapseProperty extends XPropertyFunction(X_COLLAPSE_CONFIG_NAME) {
  /**
   * @zh_CN 是否以手风琴的方式展示，只展开一个面板
   * @en_US Whether to display as an accordion, only expand one panel
   * @example
   *
   * ```html
   * <x-collapse accordion>
   *   <x-collapse-panel label="Title 1"></x-collapse-panel>
   *   <x-collapse-panel label="Title 2"></x-collapse-panel>
   * </x-collapse>
   * ```
   *
   */
  readonly accordion = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 显示的图标
   * @en_US The icon displayed on the right
   * @example
   *
   * ```html
   * <x-collapse [icon]="iconTpl">
   *   <x-collapse-panel label="Title 1"></x-collapse-panel>
   *   <x-collapse-panel label="Title 2"></x-collapse-panel>
   * </x-collapse>
   * <ng-template #iconTpl>
   *   <x-icon type="ado-caret-right"></x-icon>
   * </ng-template>
   * ```
   *
   */
  readonly icon = input<XTemplate>();
  /**
   * @zh_CN 显示/隐藏图标
   * @en_US Show / hide icon
   * @example
   *
   * ```html
   * <x-collapse showIcon="false">
   *   <x-collapse-panel label="Title 1"></x-collapse-panel>
   *   <x-collapse-panel label="Title 2"></x-collapse-panel>
   * </x-collapse>
   * ```
   *
   */
  readonly showIcon = input<boolean, XBoolean>(this.config?.showIcon ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 图标位置
   * @en_US Icon position
   * @example
   *
   * ```html
   * <x-collapse iconPosition="left">
   *   <x-collapse-panel label="Title 1"></x-collapse-panel>
   *   <x-collapse-panel label="Title 2"></x-collapse-panel>
   * </x-collapse>
   * ```
   *
   */
  readonly iconPosition = input<XCollapseIconPosition>(this.config?.iconPosition ?? 'right');
  /**
   * @zh_CN 幽灵面板
   * @en_US Ghost panel
   * @example
   *
   * ```html
   * <x-collapse ghost>
   *   <x-collapse-panel label="Title 1"></x-collapse-panel>
   *   <x-collapse-panel label="Title 2"></x-collapse-panel>
   * </x-collapse>
   * ```
   *
   */
  readonly ghost = input<boolean, XBoolean>(this.config?.ghost ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 边框
   * @en_US border
   * @example
   *
   * ```html
   * <x-collapse bordered>
   *   <x-collapse-panel label="Title 1"></x-collapse-panel>
   *   <x-collapse-panel label="Title 2"></x-collapse-panel>
   * </x-collapse>
   * ```
   *
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 当前激活的面板序号
   * @en_US The serial number of the currently active panel
   * @example
   *
   * ```html
   * <x-collapse [active]="[0, 1]">
   *   <x-collapse-panel label="Title 1"></x-collapse-panel>
   *   <x-collapse-panel label="Title 2"></x-collapse-panel>
   * </x-collapse>
   * ```
   *
   */
  readonly active = model<number[]>([]);
}

/**
 * @zh_CN 图标位置
 * @en_US Icon position
 */
export type XCollapseIconPosition = 'left' | 'right';

/**
 * Collapse Panel
 * @selector x-collapse-panel
 * @decorator component
 */
export const XCollapsePanelPrefix = 'x-collapse-panel';

/**
 * Collapse Panel Property
 */
@Component({ selector: `${XCollapsePanelPrefix}-property`, template: '' })
export class XCollapsePanelProperty extends XProperty {
  /**
   * @zh_CN 标题，支持模板自定义
   * @en_US Title, support template customization
   * @example
   *
   * ```html
   * <x-collapse>
   *   <x-collapse-panel label="Title 1"></x-collapse-panel>
   *   <x-collapse-panel [label]="labelTpl"></x-collapse-panel>
   * </x-collapse>
   * <ng-template #labelTpl>Title 2</ng-template>
   * ```
   *
   */
  readonly label = input<XTemplate>();
  /**
   * @zh_CN 激活当前面板
   * @en_US Activate the current panel
   * @example
   *
   * ```html
   * <x-collapse>
   *   <x-collapse-panel label="Title 1"></x-collapse-panel>
   *   <x-collapse-panel label="Title 2" active></x-collapse-panel>
   * </x-collapse>
   * ```
   *
   */
  readonly active = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 禁用
   * @en_US disabled
   * @example
   *
   * ```html
   * <x-collapse>
   *   <x-collapse-panel label="Title 1"></x-collapse-panel>
   *   <x-collapse-panel label="Title 2" disabled></x-collapse-panel>
   * </x-collapse>
   * ```
   *
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
}
