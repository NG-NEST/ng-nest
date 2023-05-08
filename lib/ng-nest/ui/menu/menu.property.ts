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
const X_CONFIG_NAME = 'menu';

/**
 * Menu Property
 */
@Component({ selector: `${XMenuPrefix}-property`, template: '' })
export class XMenuProperty extends XProperty {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  @Input() @XDataConvert() data: XData<XMenuNode> = [];
  /**
   * @zh_CN 布局方向
   * @en_US Layout direction
   */
  @Input() layout: XMenuLayout = 'row';
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size!: XSize;
  /**
   * @zh_CN 宽度，只有布局 layout 为 'column' 生效
   * @en_US Width, only layout layout is the 'column'
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '12rem') width!: string;
  /**
   * @zh_CN 缩起菜单
   * @en_US Shrink menu
   */
  @Input() @XInputBoolean() collapsed: XBoolean = false;
  /**
   * @zh_CN 触发方式，只针对横向布局
   * @en_US Trigger mode, only for horizontal layout
   */
  @Input() @XWithConfig<XMenuTrigger>(X_CONFIG_NAME, 'hover') trigger!: XMenuTrigger;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  @Input() nodeTpl?: TemplateRef<any>;
  /**
   * @zh_CN 展开的所有层级，只对 layout 布局为 'column' 的生效
   * @en_US All expanded levels are only effective for the layout of'column'
   */
  @Input() @XInputBoolean() expandedAll?: XBoolean;
  /**
   * @zh_CN 默认展开的层级，只对 layout 布局为 'column' 的生效
   * @en_US The level expanded by default is only valid for the layout of'column'
   */
  @Input() @XInputNumber() expandedLevel: XNumber = -1;
  /**
   * @zh_CN 当前激活的节点 id
   * @en_US Currently active node id
   */
  @Input() activatedId: any;
  /**
   * @zh_CN 滚动容器
   * @en_US Rolling container
   */
  @Input() target?: string | HTMLElement;
  /**
   * @zh_CN 弹框的最小宽度
   * @en_US Portal min-width
   */
  @Input() portalMinWidth?: string | number;
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  @Output() nodeClick = new EventEmitter<XMenuNode>();
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  @Output() activatedIdChange = new EventEmitter<any>();
}

/**
 * @zh_CN MenuNode 节点数据
 * @en_US MenuNode node data
 */
export interface XMenuNode extends XParentIdentityProperty<XMenuNode> {
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  icon?: string;
  /**
   * @zh_CN 展开
   * @en_US Unfold
   */
  open?: boolean;
  /**
   * @zh_CN 子节点已加载过
   * @en_US Child node has been loaded
   */
  childrenLoaded?: boolean;
  /**
   * @zh_CN 分类显示，设置值后节点显示成分类样式
   * @en_US Category display, after setting the value, the node is displayed in a category style
   */
  category?: string;
  /**
   * @zh_CN 分类节点，通过内部计算
   * @en_US Classification node, through internal calculation
   */
  categoryNode?: boolean;
  /**
   * @zh_CN 检查更新
   * @en_US Check for updates
   */
  change?: Function;
  /**
   * @zh_CN 路由
   * @en_US Router
   */
  routerLink?: string | any[];
}

/**
 * @zh_CN 布局方式
 * @en_US Layout
 */
export type XMenuLayout = 'row' | 'column';

/**
 * @zh_CN 触发方式
 * @en_US Trigger method
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
@Component({ selector: `${XMenuNodePrefix}-property`, template: '' })
export class XMenuNodeProperty extends XProperty {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  @Input() node!: XMenuNode;
}
