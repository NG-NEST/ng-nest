import { XProperty } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';

/**
 * Typography
 * @selector x-typography
 * @decorator component
 */
export const XTypographyPrefix = 'x-typography';

/**
 * Typography Property
 */
@Component({ selector: `${XTypographyPrefix}-property`, template: '' })
export class XTypographyProperty extends XProperty {
  /**
   * @zh_CN 字体
   * @en_US Font
   */
  readonly font = input<string>(
    'Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif'
  );
  /**
   * @zh_CN 显示文字
   * @en_US Display text
   */
  readonly text = input<string>();
}
