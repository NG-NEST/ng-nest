import { XType, XSize, XData, XTemplate, XProperty, XIdentityProperty, XDataConvert, XWithConfig, XDate } from '@ng-nest/ui/core';
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
  @Input() type?: XType;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size?: XSize;
  /**
   * @zh_CN 内容模板
   * @en_US Content template
   */
  @Input() wrapper?: XTemplate;
}

/**
 * @zh_CN Timeline 数据对象
 * @en_US Timeline node data
 */
export interface XTimelineNode extends XIdentityProperty {
  /**
   * @zh_CN 时间
   * @en_US Time
   */
  time?: XDate;
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
  /**
   * @zh_CN 加载中
   * @en_US Loading
   */
  loading?: boolean;
  /**
   * @zh_CN 连接线显示虚线，针对下一个节点，下一个节点为 loading 状态也会显示虚线
   * @en_US The connecting line displays a dotted line. For the next node, the dotted line will also be displayed when the next node is in loading status
   */
  dashed?: boolean;
  /**
   * @zh_CN 其它自定义属性
   * @en_US Other property
   */
  [property: string]: any;
}
