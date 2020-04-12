import { XData, XTemplate, XIdentityProperty, XControlValueAccessor, XDataConvert, XInputBoolean, XSize } from '@ng-nest/ui/core';
import { Input, Renderer2 } from '@angular/core';

/**
 * Checkbox
 * @selector x-checkbox
 * @decorator component
 */
export const XCheckboxPrefix = 'x-checkbox';

/**
 * Checkbox Property
 */
export class XCheckboxProperty extends XControlValueAccessor<any[]> {
  /**
   * 单选框数据
   */
  @Input() @XDataConvert() data: XData<XCheckboxNode> = [];
  /**
   * 按钮样式
   */
  @Input() @XInputBoolean() button: boolean = false;
  /**
   * 图标样式
   */
  @Input() @XInputBoolean() icon: boolean = false;
  /**
   * 不确定状态的样式
   */
  @Input() @XInputBoolean() indeterminate: boolean = false;
  /**
   * 尺寸
   */
  @Input() size: XSize = 'medium';

  constructor(public renderer: Renderer2) {
    super(renderer);
  }
}

/**
 * Checkbox 数据对象
 */
export interface XCheckboxNode extends XIdentityProperty {
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 图标的提示信息
   */
  title?: string;
  /**
   * 标签文字
   */
  label?: XTemplate;
}
