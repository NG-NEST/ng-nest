import { TemplateRef } from '@angular/core';

/**
 * Skeleton 组件名
 * @selector x-skeleton
 * @decorator component
 */
export const XSkeletonPrefix = 'x-skeleton';

/**
 * Skeleton @Input
 */
export interface XSkeletonInput {}

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
  style?: { [klass: string]: any };
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
  style?: { [klass: string]: any };
}

/**
 * 列类型
 * @value 'title'
 * @value 'img'
 * @value 'avatar'
 * @value 'transparent'
 */
export type XSkeletonType = 'title' | 'img' | 'avatar' | 'transparent';
