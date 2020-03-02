import { TemplateRef } from "@angular/core";
import {
  XIdentityInput,
  XType,
  XSize,
  XData,
  XTemplate
} from "@ng-nest/ui/core";

/**
 * Timeline 组件名
 * @selector x-timeline
 * @decorator component
 */
export const XTimelinePrefix = "x-timeline";

/**
 * Timeline @Input
 */
export interface XTimelineInput {
  /**
   * 数据
   */
  data?: XData<XTimelineNode>;
  /**
   * 内容模板
   */
  wrapper?: XTemplate;
}

/**
 * Timeline 数据对象
 */
export interface XTimelineNode extends XIdentityInput {
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
