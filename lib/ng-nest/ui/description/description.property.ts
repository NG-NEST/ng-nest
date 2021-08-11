import { Component, Input } from '@angular/core';
import { XAlign, XBoolean, XDirection, XInputBoolean, XJustify, XProperty, XSize, XTemplate, XWithConfig } from '@ng-nest/ui/core';

/**
 * Description
 * @selector x-description
 * @decorator component
 */
export const XDescriptionPrefix = 'x-description';
const X_CONFIG_NAME = 'description';

/**
 * Description Property
 */
@Component({ template: '' })
export class XDescriptionProperty extends XProperty {
  /**
   * @zh_CN 描述列表的标题，支持自定义模板
   * @en_US Describe the title of the list, support custom template
   */
  @Input() title?: XTemplate;
  /**
   * @zh_CN 是否展示边框
   * @en_US Whether to show column borders
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() bordered!: XBoolean;
  /**
   * @zh_CN grid 布局下定义列宽度
   * @en_US Define column width under grid layout
   */
  @Input() gridTemplateColumns?: string;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size!: XSize;
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
@Component({ template: '' })
export class XDescriptionItemProperty {
  /**
   * @zh_CN 使用 grid 布局
   * @en_US Use grid layout to merge cells
   */
  @Input() gridArea?: string;
  /**
   * @zh_CN 内容的描述，支持自定义模板
   * @en_US Description of content, support custom templates
   */
  @Input() label?: XTemplate;
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US Child element under the horizontal arrangement of the layout flex
   */
  @Input() justify?: XJustify = 'start';
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US Child element under the vertical layout flex arrangement
   */
  @Input() align?: XAlign = 'start';
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US Child element under the direction of arrangement of the layout flex
   */
  @Input() direction?: XDirection = 'row';
  /**
   * @zh_CN 宽度
   * @en_US Width
   */
  @Input() width?: string;
  /**
   * @zh_CN flex 比重
   * @en_US Flex proportion
   */
  @Input() flex?: number;
  /**
   * @zh_CN 是否是标题
   * @en_US Whether it is heading
   */
  @Input() @XInputBoolean() heading: XBoolean = false;
}
