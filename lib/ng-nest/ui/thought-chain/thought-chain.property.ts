import { Component, input, model } from '@angular/core';
import { XPropertyFunction, XBoolean, XToBoolean, XSize, XTemplate } from '@ng-nest/ui/core';
import { XTimelineNode } from '@ng-nest/ui/timeline';
import type { XLoadingType } from '@ng-nest/ui/loading';

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
   * @zh_CN 思维链节点数据
   * @en_US ThoughtChain items
   */
  readonly data = model<XThoughtChainNode[]>([]);
  /**
   * @zh_CN 显示序号
   * @en_US Show number
   */
  readonly showNumber = input<boolean, XBoolean>(this.config?.showNumber ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 自定义内容模板
   * @en_US Content template
   */
  readonly wrapper = input<XTemplate>();
  /**
   * @zh_CN 自定义图标模板
   * @en_US Icon template
   */
  readonly icon = input<XTemplate>();
  /**
   * @zh_CN 节点标题右侧额外的内容模板
   * @en_US Node extra content
   */
  readonly extra = input<XTemplate>();
  /**
   * @zh_CN 节点详细内容模板
   * @en_US Node detail content
   */
  readonly content = input<XTemplate>();
  /**
   * @zh_CN 详细内容是否可折叠
   * @en_US Collapsible detail content
   */
  readonly collapsible = input<boolean, XBoolean>(this.config?.collapsible ?? false, { transform: XToBoolean });
  /**
   * @zh_CN loading 的类型样式
   * @en_US Loading type style
   */
  readonly loadingType = input<XLoadingType>(this.config?.loadingType ?? 'circular');
}

/**
 * @zh_CN 思维链节点
 * @en_US Thought chain node
 */
export interface XThoughtChainNode extends XTimelineNode {
  /**
   * @zh_CN 节点描述
   * @en_US Node description
   */
  description?: string;
  /**
   * @zh_CN 节点状态
   * @en_US Node status
   */
  status?: XThoughtChainNodeStatus;
}

/**
 * @zh_CN 节点状态
 * @en_US Node status
 */
export type XThoughtChainNodeStatus = 'success' | 'error' | 'pending';
