import {
  XParentIdentityProperty,
  XData,
  XSize,
  XProperty,
  XDataConvert,
  XInputNumber,
  XNumber,
  XInputBoolean,
  XBoolean,
  XWithConfig,
  XTrigger
} from '@ng-nest/ui/core';
import { TemplateRef, Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Menu
 * @selector x-menu
 * @decorator component
 */
export const XMenuPrefix = 'x-menu';

/**
 * Menu Property
 */
@Component({ template: '' })
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
  @Input() @XWithConfig<XSize>('medium') size: XSize;
  /**
   * 缩起菜单
   */
  @Input() @XInputBoolean() collapsed: XBoolean = false;
  /**
   * 触发方式，只针对横向布局
   */
  @Input() @XWithConfig<XMenuTrigger>('hover') trigger: XMenuTrigger;
  /**
   * 节点模板
   */
  @Input() nodeTpl: TemplateRef<any>;
  /**
   * 展开的所有层级，只对 layout 布局为 'column' 的生效
   */
  @Input() @XInputBoolean() expandedAll: XBoolean;
  /**
   * 默认展开的层级，只对 layout 布局为 'column' 的生效
   */
  @Input() @XInputNumber() expandedLevel: XNumber = -1;
  /**
   * 当前激活的节点 id
   */
  @Input() activatedId: any;
  /**
   * 滚动容器
   */
  @Input() target: string | HTMLElement;
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
  /**
   * 分类显示，设置值后节点显示成分类样式
   */
  category?: string;
  /**
   * 分类节点，通过内部计算
   */
  categoryNode?: boolean;
  /**
   * 检查更新
   */
  change?: Function;
}

/**
 * 布局方式
 */
export type XMenuLayout = 'row' | 'column';

/**
 * 触发方式
 */
export type XMenuTrigger = XTrigger;

/**
 * Menu Node
 * @selector x-menu-node
 * @decorator component
 */
export const XMenuNodePrefix = 'x-menu-node';

/**
 * Menu Node Property
 */
@Component({ template: '' })
export class XMenuNodeProperty {
  /**
   * 节点数据
   */
  @Input() node: XMenuNode;
}
