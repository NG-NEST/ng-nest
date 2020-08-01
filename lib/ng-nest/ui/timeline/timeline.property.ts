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
   * @zh_CN 数据
   * @en_US Date
   */
  @Input() @XDataConvert() data: XData<XTimelineNode> = [];
  /**
   * @zh_CN 类型
   * @en_US Type
   */
  @Input() type: XType;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size: XSize;
  /**
   * @zh_CN 内容模板
   * @en_US Content template
   */
  @Input() wrapper: XTemplate;
}

/**
 * @zh_CN Timeline 数据对象
 * @en_US Timeline 数据对象
 */
export interface XTimelineNode extends XIdentityProperty {
  /**
   * @zh_CN 时间
   * @en_US Time
   */
  time?: string | Date;
  /**
   * @zh_CN 内容
   * @en_US Content
   */
  content?: string;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
  /**
   * @zh_CN 类型
   * @en_US Type
   */
  type?: XType;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  icon?: string;
  /**
   * @zh_CN 颜色
   * @en_US Color
   */
  color?: string;
}
