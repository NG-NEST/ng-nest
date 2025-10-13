import { Component, input } from '@angular/core';
import { XPropertyFunction, XDataArray, XToDataArray, XBoolean, XToBoolean } from '@ng-nest/ui/core';
import { XTimelineNode } from '@ng-nest/ui/timeline';

/**
 * ThoughtChain
 * @selector x-thought-chain
 * @decorator component
 */
export const XThoughtChainPrefix = 'x-thought-chain';
const X_THOUGHT_CHAIN_CONFIG_NAME = 'thoughtChain';

/**
 * ThoughtChain Property
 */
@Component({ selector: `${XThoughtChainPrefix}-property`, template: '' })
export class XThoughtChainProperty extends XPropertyFunction(X_THOUGHT_CHAIN_CONFIG_NAME) {
  /**
   * @zh_CN 建议项列表
   * @en_US ThoughtChain items
   */
  readonly data = input<XThoughtChainNode[], XDataArray<XThoughtChainNode>>([], { transform: XToDataArray });
  /**
   * @zh_CN 显示序号
   * @en_US Show number
   */
  readonly showNumber = input<boolean, XBoolean>(this.config?.showNumber ?? true, { transform: XToBoolean });
}

/**
 * @zh_CN 建议项
 * @en_US ThoughtChain
 */
export interface XThoughtChainNode extends XTimelineNode {}
