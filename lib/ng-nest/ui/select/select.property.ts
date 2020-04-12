import { XControlValueAccessor, XParentIdentityProperty, XDataConvert, XInputBoolean, XData } from '@ng-nest/ui/core';
import { Renderer2, Input } from '@angular/core';

/**
 * Select
 * @selector x-select
 * @decorator component
 */
export const XSelectPrefix = 'x-select';

/**
 * Select Property
 */
export class XSelectProperty extends XControlValueAccessor<any> {
  /**
   * 节点数据
   */
  @Input() @XDataConvert() data: XData<XSelectNode> = [];
  /**
   * 异步加载
   */
  @Input() @XInputBoolean() async: boolean = false;

  constructor(public renderer: Renderer2) {
    super(renderer);
  }
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
