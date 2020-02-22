import { XSize } from "@ng-nest/ui/core";

/**
 * TextRetract 组件名
 * @selector x-text-retract
 * @decorator component
 */
export const XTextRetractPrefix = "x-text-retract";

/**
 * TextRetract @Input
 */
export interface XTextRetractInput {
  /**
   * 文本
   */
  label?: string;
  /**
   * 默认最大显示字符数
   * @default 256
   */
  max?: number;
}
