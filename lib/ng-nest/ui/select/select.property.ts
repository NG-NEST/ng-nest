import {
  XControlValueAccessor,
  XParentIdentityProperty,
  XDataConvert,
  XInputBoolean,
  XData,
  XBoolean,
  XFormOption,
  XWithConfig,
  XPositionTopBottom,
  XNumber,
  XInputNumber
} from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

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
   * @zh_CN 异步加载
   * @en_US Asynchronous loading
   */
  @Input() @XInputBoolean() async: XBoolean;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  @Input() @XWithConfig<XPositionTopBottom>(X_CONFIG_NAME, 'bottom') placement: XPositionTopBottom;
  /**
   * @zh_CN 多选功能
   * @en_US Multiple choice
   */
  @Input() @XInputBoolean() multiple: XBoolean;
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
