import { XParentIdentityProperty, XData, XSize, XProperty, XDataConvert } from '@ng-nest/ui/core';
import { TemplateRef, Input, Output, EventEmitter } from '@angular/core';

/**
 * Menu
 * @selector x-menu
 * @decorator component
 */
export const XMenuPrefix = 'x-menu';

/**
 * Menu Property
 */
export class XMenuProperty extends XProperty {
  /**
   * 节点数据
   */
  @Input() @XDataConvert() data: XData<XMenuNode> = [];
  /**
   * 布局方向
   */
  @Input() layout: XMenuLayout = 'row';
  /**
   * 尺寸
   */
  @Input() size: XSize = 'medium';
  /**
   * 触发方式，只针对横向布局
   */
  @Input() trigger: XMenuTrigger = 'hover';
  /**
   * 节点模板
   */
  @Input() nodeTpl: TemplateRef<any>;
  /**
   * 节点点击的事件
   */
  @Output() nodeClick = new EventEmitter<XMenuNode>();
}

export interface XMenuNode extends XParentIdentityProperty<XMenuNode> {
  /**
   * 图标
   */
  icon?: string;
  /**
   * 展开
   */
  open?: boolean;
  /**
   * 子节点已加载过
   */
  childrenLoaded?: boolean;
}

/**
 * 布局方式
 */
export type XMenuLayout = 'row' | 'column';

/**
 * 触发方式
 */
export type XMenuTrigger = 'hover' | 'click';
