import { XProperty, XInputBoolean } from '@ng-nest/ui/core';
import { Input } from '@angular/core';

/**
 * Skeleton
 * @selector x-skeleton
 * @decorator component
 */
export const XSkeletonPrefix = 'x-skeleton';

/**
 * Skeleton Property
 */
export class XSkeletonProperty extends XProperty {
  /**
   * 骨架数据
   */
  @Input() data: XSkeletonRow[] = [{ cols: [{ width: '10rem', type: 'title' }] }, { cols: [{}] }, { cols: [{}] }, { cols: [{ span: 16 }] }];
  /**
   * 加载中
   */
  @Input() @XInputBoolean() loading: boolean = true;
  /**
   * 激活动画
   */
  @Input() @XInputBoolean() active: boolean = false;
  /**
   * 显示边框
   */
  @Input() @XInputBoolean() border: boolean = false;
}

/**
 * 行
 */
export interface XSkeletonRow {
  /**
   * 列
   */
  cols?: XSkeletonCol[];
  /**
   * flex 布局
   */
  flex?: boolean;
  /**
   * 列间距
   */
  space?: number;
  /**
   * 外边距
   */
  margin?: string;
  /**
   * 样式
   */
  style?: { [prop: string]: any };
}

/**
 * 列
 */
export interface XSkeletonCol {
  /**
   * 24栅格布局，列占的宽度
   */
  span?: number;
  /**
   * 宽度
   */
  width?: string;
  /**
   * 高度
   */
  height?: string;
  /**
   * 列类型
   */
  type?: XSkeletonType;
  /**
   * 子集
   */
  rows?: XSkeletonRow[];
  /**
   * 样式
   */
  style?: { [prop: string]: any };
}

/**
 * 列类型
 */
export type XSkeletonType = 'title' | 'img' | 'avatar' | 'transparent';
