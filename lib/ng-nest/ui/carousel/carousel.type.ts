/**
 * Carousel 组件名
 * @selector x-carousel
 * @decorator component
 */
export const XCarouselPrefix = 'x-carousel';

/**
 * Carousel @Input
 */
export interface XCarouselInput {
  /**
   * 当前激活的幻灯片索引
   * @default 0
   */
  active: number;
  /**
   * 幻灯片高度
   * @default "15rem"
   */
  height?: string;
  /**
   * 切换器触发方式
   * @default "hover"
   */
  trigger?: XCarouselTrigger;
  /**
   * 箭头显示影藏方式
   * @default "hover"
   */
  arrow?: XCarouselArrow;
  /**
   * 幻灯片轮播方向
   * @default "horizontal"
   */
  direction?: XCarouselDirection;
  /**
   * 自动切换
   * @default true
   */
  autoplay: boolean;
  /**
   * 自动切换时间间隔
   * @default 3000
   */
  interval: number;
  /**
   * 切换器否显示在外面
   */
  outside?: boolean;
  /**
   * 是否以卡片的方式显示幻灯片
   */
  card?: boolean;
}

/**
 * 指示器切换方式
 * @value "hover"
 * @value "click"
 */
export type XCarouselTrigger = 'hover' | 'click';

/**
 * 切换箭头显示方式
 * @value "always"
 * @value "hover"
 * @value "never"
 */
export type XCarouselArrow = 'always' | 'hover' | 'never';

/**
 * 走马灯展示的方向
 * @value "horizontal"
 * @value "vertical"
 */
export type XCarouselDirection = 'horizontal' | 'vertical';

/**
 * Carousel Panel 组件名
 * @selector x-carousel-panel
 * @decorator component
 */
export const XCarouselPanelPrefix = 'x-carousel-panel';
