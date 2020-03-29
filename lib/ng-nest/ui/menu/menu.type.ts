import { XParentIdentityInput, XData, XSize } from '@ng-nest/ui/core';
import { TemplateRef } from '@angular/core';

/**
 * Menu 组件名
 * @selector x-menu
 * @decorator component
 */
export const XMenuPrefix = 'x-menu';

/**
 * Menu @Input
 */
export interface XMenuInput {
  /**
   * 节点数据
   */
  data: XData<XMenuNode[]>;
  /**
   * 布局方向
   * @default 'row'
   */
  layout: XMenuLayout;
  /**
   * 尺寸
   * @default 'medium'
   */
  size: XSize;
  /**
   * 触发方式，只针对横向布局
   * @default 'hover'
   */
  trigger: XMenuTrigger;
  /**
   * 节点模板
   */
  nodeTpl: TemplateRef<any>;
}

export interface XMenuNode extends XParentIdentityInput {
  /**
   * 图标
   */
  icon?: string;
  /**
   * 子节点
   */
  children?: XMenuNode[];
  /**
   * 展开
   */
  open?: boolean;
  /**
   * 子节点已加载过
   */
  childrenLoaded?: boolean;
}

export type XMenuLayout = 'row' | 'column';

export type XMenuTrigger = 'hover' | 'click';
