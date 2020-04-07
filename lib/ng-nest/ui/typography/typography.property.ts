import { XProperty } from '@ng-nest/ui/core';
import { Input } from '@angular/core';

/**
 * Typography 组件名
 * @selector x-typography
 * @decorator component
 */
export const XTypographyPrefix = 'x-typography';

/**
 * Typography Property
 */
export class XTypographyProperty extends XProperty {
  /**
   * 字体
   */
  @Input() font?: string = 'Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif';
  /**
   * 显示文字
   */
  @Input() text?: string;
}
