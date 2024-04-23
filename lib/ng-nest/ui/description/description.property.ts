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
   */
  readonly title = input<XTemplate>();
  /**
   * @zh_CN 是否展示边框
   * @en_US Whether to show column borders
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? false, { transform: XToBoolean });
  /**
   * @zh_CN grid 布局下定义列宽度
   * @en_US Define column width under grid layout
   */
  readonly gridTemplateColumns = input<string>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
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
   */
  readonly gridArea = input<string>();
  /**
   * @zh_CN 内容的描述，支持自定义模板
   * @en_US Description of content, support custom templates
   */
  readonly label = input<XTemplate>();
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US Child element under the horizontal arrangement of the layout flex
   */
  readonly justify = input<XJustify>('start');
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US Child element under the vertical layout flex arrangement
   */
  readonly align = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US Child element under the direction of arrangement of the layout flex
   */
  readonly direction = input<XDirection>('row');
  /**
   * @zh_CN 宽度
   * @en_US Width
   */
  readonly width = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN flex 比重
   * @en_US Flex proportion
   */
  readonly flex = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 是否是标题
   * @en_US Whether it is heading
   */
  readonly heading = input<boolean, XBoolean>(false, { transform: XToBoolean });
}
