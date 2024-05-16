import { XProperty, XPropertyFunction, XToDataArray, XToCssPixelValue, XToBoolean, XToNumber } from '@ng-nest/ui/core';
import { TemplateRef, Component, input, model, output } from '@angular/core';
import type { XParentIdentityProperty, XSize, XNumber, XBoolean, XTrigger, XDataArray } from '@ng-nest/ui/core';

/**
 * Menu
 * @selector x-menu
 * @decorator component
 */
export const XMenuPrefix = 'x-menu';
const X_MENU_CONFIG_NAME = 'menu';

/**
 * Menu Property
 */
@Component({ selector: `${XMenuPrefix}-property`, template: '' })
export class XMenuProperty extends XPropertyFunction(X_MENU_CONFIG_NAME) {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  readonly data = input<XMenuNode[], XDataArray<XMenuNode>>([], { transform: XToDataArray });
  /**
   * @zh_CN 布局方向
   * @en_US Layout direction
   */
  readonly layout = input<XMenuLayout>('row');
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 宽度，只有布局 layout 为 'column' 生效
   * @en_US Width, only layout layout is the 'column'
   */
  readonly width = input<string, XNumber>(this.config?.width ?? '12rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 缩起菜单
   * @en_US Shrink menu
   */
  readonly collapsed = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 触发方式，只针对横向布局
   * @en_US Trigger mode, only for horizontal layout
   */
  readonly trigger = input<XMenuTrigger>(this.config?.trigger ?? 'hover');
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  readonly nodeTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 展开的所有层级，只对 layout 布局为 'column' 的生效
   * @en_US All expanded levels are only effective for the layout of'column'
   */
  readonly expandedAll = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 默认展开的层级，只对 layout 布局为 'column' 的生效
   * @en_US The level expanded by default is only valid for the layout of'column'
   */
  readonly expandedLevel = input<number, XNumber>(-1, { transform: XToNumber });
  /**
   * @zh_CN 当前激活的节点 id
   * @en_US Currently active node id
   */
  readonly activatedId = model<string | number>();
  /**
   * @zh_CN 滚动容器
   * @en_US Rolling container
   */
  readonly target = input<string | HTMLElement>();
  /**
   * @zh_CN 弹框的最小宽度
   * @en_US Portal min-width
   */
  readonly portalMinWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  readonly nodeClick = output<XMenuNode>();
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
export class XMenuNodeProperty extends XProperty {}
