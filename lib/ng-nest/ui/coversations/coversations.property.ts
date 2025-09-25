import { Component, input, output, TemplateRef } from '@angular/core';
import { XData, XSize, XStyle } from '@ng-nest/ui/core';
import { XListNode } from '@ng-nest/ui/list';
import { XFormControlFunction } from '@ng-nest/ui/base-form';

/**
 * Coversations
 * @selector x-coversations
 * @decorator component
 */
export const XCoversationsPrefix = 'x-coversations';
const X_COVERSATIONS_CONFIG_NAME = 'coversations';

/**
 * Coversations Property
 */
@Component({ selector: `${XCoversationsPrefix}-property`, template: '' })
export class XCoversationsProperty extends XFormControlFunction(X_COVERSATIONS_CONFIG_NAME) {
  /**
   * @zh_CN 列表数据
   * @en_US List data
   */
  readonly data = input<XData<XCoversationNode>>([]);
  /**
   * @zh_CN 节点模板
   * @en_US Node style
   */
  readonly nodeTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 节点样式
   * @en_US Node style
   */
  readonly nodeStyle = input<XStyle>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  override readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 节点点击事件
   * @en_US Node click event
   */
  readonly nodeClick = output<XCoversationNode>();
}

/**
 * @zh_CN List 数据对象
 * @en_US List data object
 */
export interface XCoversationNode extends XListNode {}
