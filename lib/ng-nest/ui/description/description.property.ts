import { Component, Input } from '@angular/core';
import { XBoolean, XInputBoolean, XTemplate, XWithConfig } from '@ng-nest/ui/core';

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
export class XDescriptionProperty {
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
}
