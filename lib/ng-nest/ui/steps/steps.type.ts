import { XParentIdentityInput, XData } from '@ng-nest/ui/core';

/**
 * Steps 组件名
 * @selector x-steps
 * @decorator component
 */
export const XStepsPrefix = 'x-steps';

/**
 * Steps @Input
 */
export interface XStepsInput {
  /**
   * 节点数据
   */
  data?: XData<XStepsNode[]>;
  /**
   * 布局
   * @default 'row'
   */
  layout?: XStepsLayout;
  /**
   * 当前激活节点
   */
  activatedIndex?: number;
  /**
   * 步骤开始序号
   * @default 0
   */
  startIndex?: number;
  /**
   * 当前激活节点状态
   */
  status?: XStepsStatus;
}

export interface XStepsNode extends XParentIdentityInput {
  /**
   * 状态
   */
  status?: XStepsStatus;
  /**
   * 描述
   */
  description?: string;
  /**
   * 图标
   */
  icon?: string;
}

export type XStepsLayout = 'row' | 'column';

export type XStepsStatus = 'wait' | 'process' | 'finish' | 'error';
