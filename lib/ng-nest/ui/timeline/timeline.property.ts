import { XPropertyFunction, XToDataArray } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import type { XType, XSize, XTemplate, XIdentityProperty, XDate, XDataArray } from '@ng-nest/ui/core';

/**
 * Timeline
 * @selector x-timeline
 * @decorator component
 */
export const XTimelinePrefix = 'x-timeline';
const X_TIMELINE_CONFIG_NAME = 'timeline';

/**
 * Timeline Property
 */
@Component({ selector: `${XTimelinePrefix}-property`, template: '' })
export class XTimelineProperty extends XPropertyFunction(X_TIMELINE_CONFIG_NAME) {
  /**
   * @zh_CN 数据
   * @en_US Date
   */
  readonly data = input<XTimelineNode[], XDataArray<XTimelineNode>>([], { transform: XToDataArray });
  /**
   * @zh_CN 类型
   * @en_US Type
   */
  readonly type = input<XType>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 内容模板
   * @en_US Content template
   */
  readonly wrapper = input<XTemplate>();
  /**
   * @zh_CN 时间轴的相对位置
   * @en_US Content and timeline relative position
   */
  readonly mode = input<XTimelineMode>(this.config?.mode ?? 'left');
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

/**
 * @zh_CN 时间轴的相对位置
 * @en_US Content and timeline relative position
 */
export type XTimelineMode = 'left' | 'right' | 'alternate';
