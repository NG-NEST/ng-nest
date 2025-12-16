import { XToDataArray, XToNumber, XToBoolean, XPropertyFunction } from '@ng-nest/ui/core';
import { Component, input, TemplateRef } from '@angular/core';
import type { XParentIdentityProperty, XNumber, XBoolean, XDataArray } from '@ng-nest/ui/core';

/**
 * Steps
 * @selector x-steps
 * @decorator component
 */
export const XStepsPrefix = 'x-steps';
const X_STEPS_CONFIG_NAME = 'steps';

/**
 * Steps Property
 */
@Component({ selector: `${XStepsPrefix}-property`, template: '' })
export class XStepsProperty extends XPropertyFunction(X_STEPS_CONFIG_NAME) {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  readonly data = input<XStepsNode[], XDataArray<XStepsNode>>([], { transform: XToDataArray });
  /**
   * @zh_CN 布局方式
   * @en_US Layout
   */
  readonly layout = input<XStepsLayout>('row');
  /**
   * @zh_CN 当前激活节点
   * @en_US Currently active node
   */
  readonly activatedIndex = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 步骤开始序号
   * @en_US Step start number
   */
  readonly startIndex = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 当前激活节点状态
   * @en_US Current active node status
   */
  readonly status = input<XStepsStatus>();
  /**
   * @zh_CN 自定义节点（22 版本将废弃）
   * @en_US Custom node (will be deprecated in version 22)
   */
  readonly customTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 自定义节点图标
   * @en_US Custom node icon
   */
  readonly customIconTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 自定义节点标题
   * @en_US Custom node label
   */
  readonly customLabelTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 自定义节点描述
   * @en_US Custom node description
   */
  readonly customDescriptionTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 节点设置的状态优先，将不会自动计算当前节点，`activatedIndex` 和 `status` 将失效
   * @en_US the status set by the node takes precedence, and the current node will not be calculated, `activatedIndex` and `status` will be invalidated
   */
  readonly nodeStatus = input<boolean, XBoolean>(false, { transform: XToBoolean });
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
