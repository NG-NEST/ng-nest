import {
  XData,
  XProperty,
  XParentIdentityProperty,
  XDataConvert,
  XInputNumber,
  XNumber,
  XTemplate,
  XInputBoolean,
  XBoolean
} from '@ng-nest/ui/core';
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
   * @zh_CN 节点数据
   * @en_US Node data
   */
  @Input() @XDataConvert() data: XData<XStepsNode> = [];
  /**
   * @zh_CN 布局方式
   * @en_US Layout
   */
  @Input() layout: XStepsLayout = 'row';
  /**
   * @zh_CN 当前激活节点
   * @en_US Currently active node
   */
  @Input() @XInputNumber() activatedIndex: XNumber = 0;
  /**
   * @zh_CN 步骤开始序号
   * @en_US Step start number
   */
  @Input() @XInputNumber() startIndex: XNumber = 0;
  /**
   * @zh_CN 当前激活节点状态
   * @en_US Current active node status
   */
  @Input() status?: XStepsStatus;
  /**
   * @zh_CN 自定义节点
   * @en_US Custom node
   */
  @Input() customTpl?: XTemplate;
  /**
   * @zh_CN 节点设置的状态优先，将不会自动计算当前节点，`activatedIndex` 和 `status` 将失效
   * @en_US the status set by the node takes precedence, and the current node will not be calculated, `activatedIndex` and `status` will be invalidated
   */
  @Input() @XInputBoolean() nodeStatus?: XBoolean;
}

export interface XStepsNode extends XParentIdentityProperty<XStepsNode> {
  /**
   * @zh_CN 状态
   * @en_US Status
   */
  status?: XStepsStatus;
  /**
   * @zh_CN 描述
   * @en_US Description
   */
  description?: string;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  icon?: string;
}

/**
 * @zh_CN 布局方式
 * @en_US Layout
 */
export type XStepsLayout = 'row' | 'column';

/**
 * @zh_CN 节点状态
 * @en_US Node status
 */
export type XStepsStatus = 'wait' | 'process' | 'finish' | 'error';
