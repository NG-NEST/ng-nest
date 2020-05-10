import {
  XControlValueAccessor,
  XParentIdentityProperty,
  XDataConvert,
  XInputBoolean,
  XData,
  XBoolean,
  XCorner,
  XFormOption
} from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Select
 * @selector x-select
 * @decorator component
 */
export const XSelectPrefix = 'x-select';

/**
 * Select Property
 */
@Component({ template: '' })
export class XSelectProperty extends XControlValueAccessor<any> {
  /**
   * 节点数据
   */
  @Input() @XDataConvert() data: XData<XSelectNode> = [];
  /**
   * 异步加载
   */
  @Input() @XInputBoolean() async: XBoolean;
  /**
   * 展示方位
   */
  @Input() placement: XCorner = 'bottom-start';
}

/**
 * Select Option
 * @undocument true
 */
export interface XSelectOption extends XFormOption {
  /**
   * 节点数据
   */
  data?: XData<XSelectNode>;
  /**
   * 异步加载
   */
  async?: XBoolean;
  /**
   * 展示方位
   */
  placement?: XCorner;
}

/**
 * Select 数据对象
 */
export interface XSelectNode extends XParentIdentityProperty<XSelectNode> {}

/**
 * Select Portal
 * @selector x-select-portal
 * @decorator component
 */
export const XSelectPortalPrefix = 'x-select-portal';
