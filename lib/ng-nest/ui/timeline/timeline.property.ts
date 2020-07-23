import { XType, XSize, XData, XTemplate, XProperty, XIdentityProperty, XDataConvert, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Timeline
 * @selector x-timeline
 * @decorator component
 */
export const XTimelinePrefix = 'x-timeline';
const X_CONFIG_NAME = 'timeline';

/**
 * Timeline Property
 */
@Component({ template: '' })
export class XTimelineProperty extends XProperty {
  /**
   * 数据
   */
  @Input() @XDataConvert() data: XData<XTimelineNode> = [];
  /**
   * 类型
   */
  @Input() type: XType;
  /**
   * 尺寸
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size: XSize;
  /**
   * 内容模板
   */
  @Input() wrapper: XTemplate;
}

/**
 * Timeline 数据对象
 */
export interface XTimelineNode extends XIdentityProperty {
  /**
   * 时间
   */
  time?: string | Date;
  /**
   * 内容
   */
  content?: string;
  /**
   * 尺寸
   */
  size?: XSize;
  /**
   * 类型
   */
  type?: XType;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 颜色
   */
  color?: string;
}
