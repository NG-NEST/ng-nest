import { XProperty, XToBoolean } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import type { XStyle, XBoolean } from '@ng-nest/ui/core';

/**
 * Skeleton
 * @selector x-skeleton
 * @decorator component
 */
export const XSkeletonPrefix = 'x-skeleton';
export const XSkeletonData: XSkeletonRow[] = [
  { cols: [{ width: '10rem', type: 'title' }] },
  { cols: [{}] },
  { cols: [{}] },
  { cols: [{ span: 16 }] }
];

/**
 * Skeleton Property
 */
@Component({ selector: `${XSkeletonPrefix}-property`, template: '' })
export class XSkeletonProperty extends XProperty {
  /**
   * @zh_CN 骨架数据
   * @en_US Skeleton data
   */
  readonly data = input<XSkeletonRow[]>(XSkeletonData);
  /**
   * @zh_CN 加载中
   * @en_US Loading
   */
  readonly loading = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 激活动画
   * @en_US Activate animation
   */
  readonly active = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 显示边框
   * @en_US Show border
   */
  readonly border = input<boolean, XBoolean>(false, { transform: XToBoolean });
}

/**
 * @zh_CN 行
 * @en_US Row
 */
export interface XSkeletonRow {
  /**
   * @zh_CN 列
   * @en_US Column
   */
  cols?: XSkeletonCol[];
  /**
   * @zh_CN flex 布局
   * @en_US flex layout
   */
  flex?: boolean;
  /**
   * @zh_CN 列间距
   * @en_US Column spacing
   */
  space?: string;
  /**
   * @zh_CN 外边距
   * @en_US Margin
   */
  margin?: string;
  /**
   * @zh_CN 样式
   * @en_US Style
   */
  style?: XStyle;
}

/**
 * @zh_CN 列
 * @en_US Column
 */
export interface XSkeletonCol {
  /**
   * @zh_CN 24栅格布局，列占的宽度
   * @en_US 24 grid layout, column width
   */
  span?: number;
  /**
   * @zh_CN 宽度
   * @en_US Width
   */
  width?: string;
  /**
   * @zh_CN 高度
   * @en_US Height
   */
  height?: string;
  /**
   * @zh_CN 列类型
   * @en_US Column type
   */
  type?: XSkeletonType;
  /**
   * @zh_CN 子集
   * @en_US Rows
   */
  rows?: XSkeletonRow[];
  /**
   * @zh_CN 样式
   * @en_US Style
   */
  style?: XStyle;
}

/**
 * @zh_CN 列类型
 * @en_US Column type
 */
export type XSkeletonType = 'title' | 'img' | 'avatar' | 'transparent';
