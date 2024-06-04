import { Component, input } from '@angular/core';
import { XPropertyFunction, XToBoolean, XToCssPixelValue, XToNumber } from '@ng-nest/ui/core';
import type { XAlign, XBoolean, XDirection, XJustify, XNumber, XSize, XTemplate } from '@ng-nest/ui/core';

/**
 * Description
 * @selector x-description
 * @decorator component
 */
export const XDescriptionPrefix = 'x-description';
const X_DESCRIPTION_CONFIG_NAME = 'description';

/**
 * Description Property
 */
@Component({ selector: `${XDescriptionPrefix}-property`, template: '' })
export class XDescriptionProperty extends XPropertyFunction(X_DESCRIPTION_CONFIG_NAME) {
  /**
   * @zh_CN 描述列表的标题，支持自定义模板
   * @en_US Describe the title of the list, support custom template
   * @example
   *
   * ```html
   * <x-description title="Title">
   *   <x-description-item>name</x-description-item>
   * </x-description>
   * <x-description [title]="titleTpl">
   *   <x-description-item>name</x-description-item>
   * </x-description>
   * <ng-template #titleTpl>Title</ng-template>
   * ```
   *
   */
  readonly title = input<XTemplate>();
  /**
   * @zh_CN 是否展示边框
   * @en_US Whether to show column borders
   * @example
   *
   * ```html
   * <x-description title="Title" bordered>
   *   <x-description-item>name</x-description-item>
   * </x-description>
   * ```
   *
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? false, { transform: XToBoolean });
  /**
   * @zh_CN grid 布局下定义列宽度
   * @en_US Define column width under grid layout
   * @example
   *
   * ```html
   * <x-description title="Title" bordered gridTemplateColumns="1fr 1fr">
   *   <x-description-item gridArea="1/1/2/2">name</x-description-item>
   *   <x-description-item gridArea="1/2/3/2">age</x-description-item>
   * </x-description>
   * ```
   *
   */
  readonly gridTemplateColumns = input<string>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   * @example
   *
   * ```html
   * <x-description title="Title" size="big">
   *   <x-description-item>name</x-description-item>
   * </x-description>
   * ```
   *
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
}

/**
 * Description Item
 * @selector x-description-item
 * @decorator component
 */
export const XDescriptionItemPrefix = 'x-description-item';

/**
 * Description Item Property
 */
@Component({ selector: `${XDescriptionItemPrefix}-property`, template: '' })
export class XDescriptionItemProperty {
  /**
   * @zh_CN 使用 grid 布局
   * @en_US Use grid layout to merge cells
   * @example
   *
   * ```html
   * <x-description>
   *   <x-description-item gridArea="1/1/2/2">name</x-description-item>
   * </x-description>
   * ```
   *
   */
  readonly gridArea = input<string>();
  /**
   * @zh_CN 内容的描述，支持自定义模板
   * @en_US Description of content, support custom templates
   * @example
   *
   * ```html
   * <x-description>
   *   <x-description-item label="name1">name1</x-description-item>
   *   <x-description-item [label]="nameTpl">name2</x-description-item>
   * </x-description>
   * <ng-template #nameTpl></ng-template>
   * ```
   *
   */
  readonly label = input<XTemplate>();
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US Child element under the horizontal arrangement of the layout flex
   * @example
   *
   * ```html
   * <x-description>
   *   <x-description-item justify="end">end</x-description-item>
   *   <x-description-item justify="center">center</x-description-item>
   *   <x-description-item justify="start">start</x-description-item>
   *   <x-description-item justify="space-around">space-around</x-description-item>
   *   <x-description-item justify="space-between">space-between</x-description-item>
   * </x-description>
   * ```
   *
   */
  readonly justify = input<XJustify>('start');
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US Child element under the vertical layout flex arrangement
   * @example
   *
   * ```html
   * <x-description>
   *   <x-description-item align="end">end</x-description-item>
   *   <x-description-item align="center">center</x-description-item>
   *   <x-description-item align="start">start</x-description-item>
   * </x-description>
   * ```
   *
   */
  readonly align = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US Child element under the direction of arrangement of the layout flex
   * @example
   *
   * ```html
   * <x-description>
   *   <x-description-item direction="column">column</x-description-item>
   *   <x-description-item direction="column-reverse">column-reverse</x-description-item>
   *   <x-description-item direction="row">row</x-description-item>
   *   <x-description-item direction="row-reverse">row-reverse</x-description-item>
   * </x-description>
   * ```
   *
   */
  readonly direction = input<XDirection>('row');
  /**
   * @zh_CN 宽度
   * @en_US Width
   * @example
   *
   * ```html
   * <x-description>
   *   <x-description-item width="100px">width100</x-description-item>
   *   <x-description-item width="200px">width200</x-description-item>
   * </x-description>
   * ```
   *
   */
  readonly width = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN flex 比重
   * @en_US Flex proportion
   * @example
   *
   * ```html
   * <x-description>
   *   <x-description-item flex="1">flex1</x-description-item>
   *   <x-description-item flex="2">flex2</x-description-item>
   * </x-description>
   * ```
   *
   */
  readonly flex = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 是否是标题
   * @en_US Whether it is heading
   * @example
   *
   * ```html
   * <x-description>
   *   <x-description-item label="name" heading></x-description-item>
   *   <x-description-item>name1</x-description-item>
   * </x-description>
   * ```
   *
   */
  readonly heading = input<boolean, XBoolean>(false, { transform: XToBoolean });
}
