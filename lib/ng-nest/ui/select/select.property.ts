import {
  XParentIdentityProperty,
  XDataConvert,
  XInputBoolean,
  XData,
  XBoolean,
  XWithConfig,
  XPositionTopBottom,
  XSize
} from '@ng-nest/ui/core';
import { Input, Component, TemplateRef } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * Select
 * @selector x-select
 * @decorator component
 */
export const XSelectPrefix = 'x-select';
const X_CONFIG_NAME = 'select';

/**
 * Select Property
 */
@Component({ template: '' })
export class XSelectProperty extends XControlValueAccessor<any> {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  @Input() @XDataConvert() data: XData<XSelectNode> = [];
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) @XInputBoolean() clearable?: XBoolean;
  /**
   * @zh_CN 异步加载
   * @en_US Asynchronous loading
   */
  @Input() @XInputBoolean() async?: XBoolean;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  @Input() @XWithConfig<XPositionTopBottom>(X_CONFIG_NAME, 'bottom') placement?: XPositionTopBottom;
  /**
   * @zh_CN 多选功能
   * @en_US Multiple choice
   */
  @Input() @XInputBoolean() multiple?: XBoolean;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  @Input() nodeTpl?: TemplateRef<any>;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') override size!: XSize;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) bordered!: XBoolean;
  /**
   * @zh_CN 下拉框的最大高度
   * @en_US The biggest height of the drop-down box
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '12rem') portalMaxHeight!: string;
}

/**
 * Select Option
 * @undocument true
 */
export interface XSelectOption extends XFormOption {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  data?: XData<XSelectNode>;
  /**
   * @zh_CN 异步加载
   * @en_US Asynchronous loading
   */
  async?: XBoolean;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  placement?: XPositionTopBottom;
  /**
   * @zh_CN 多选功能
   * @en_US Multiple choice
   */
  multiple?: XBoolean;
}

/**
 * @zh_CN Select 数据对象
 * @en_US Select data object
 */
export interface XSelectNode extends XParentIdentityProperty<XSelectNode> {}

/**
 * Select Portal
 * @selector x-select-portal
 * @decorator component
 */
export const XSelectPortalPrefix = 'x-select-portal';
