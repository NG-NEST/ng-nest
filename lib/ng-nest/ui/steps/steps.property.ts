import { XData, XProperty, XParentIdentityProperty, XDataConvert, XInputNumber, XNumber } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Steps
 * @selector x-steps
 * @decorator component
 */
export const XStepsPrefix = 'x-steps';

/**
 * Steps Property
 */
@Component({ template: '' })
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
  @Input() @XInputNumber() activatedIndex: XNumber = 0;
  /**
   * 步骤开始序号
   */
  @Input() @XInputNumber() startIndex: XNumber = 0;
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
