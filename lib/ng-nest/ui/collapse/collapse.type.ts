/**
 * Collapse 组件名
 * @selector x-collapse
 * @decorator component
 */
export const XCollapsePrefix = 'x-collapse';

/**
 * Collapse @Input
 */
export interface XCollapseInput {
  /**
   * 是否以手风琴的方式展示，只展开一个面板
   */
  accordion?: boolean;
  /**
   * 当前激活的面板
   */
  active: number | number[];
}

/**
 * Collapse Panel 组件名
 * @selector x-collapse-panel
 * @decorator component
 */
export const XCollapsePanelPrefix = 'x-collapse-panel';
