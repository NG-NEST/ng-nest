import { XData, XProperty, XParentIdentityProperty, XDataConvert, XInputNumber } from '@ng-nest/ui/core';
import { Input } from '@angular/core';

/**
 * Steps
 * @selector x-steps
 * @decorator component
 */
export const XStepsPrefix = 'x-steps';

/**
 * Steps Property
 */
export class XStepsProperty extends XProperty {
  /**
   * 节点数据
   */
  @Input() @XDataConvert() data: XData<XStepsNode> = [];
  /**
   * 布局方式
   */
  @Input() layout: XStepsLayout = 'row';
  /**
   * 当前激活节点
   */
  @Input() @XInputNumber() activatedIndex: number = 0;
  /**
   * 步骤开始序号
   */
  @Input('start-index') @XInputNumber() startIndex: number = 0;
  /**
   * 当前激活节点状态
   */
  @Input() status: XStepsStatus;
}

export interface XStepsNode extends XParentIdentityProperty<XStepsNode> {
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

/**
 * 布局方式
 */
export type XStepsLayout = 'row' | 'column';

/**
 * 节点状态
 */
export type XStepsStatus = 'wait' | 'process' | 'finish' | 'error';
