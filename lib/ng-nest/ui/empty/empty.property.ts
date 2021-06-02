import { XTemplate, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Empty
 * @selector x-empty
 * @decorator component
 */
export const XEmptyPrefix = 'x-empty';
const X_CONFIG_NAME = 'empty';

/**
 * Empty Property
 */
@Component({ template: '' })
export class XEmptyProperty {
  /**
   * @zh_CN 图片地址或自定义模板
   * @en_US Picture address or custom template
   */
  @Input() img?: XTemplate;
  /**
   * @zh_CN 内容或自定义模板
   * @en_US Content or custom template
   */
  @Input() @XWithConfig<XTemplate>(X_CONFIG_NAME) content?: XTemplate;
}
