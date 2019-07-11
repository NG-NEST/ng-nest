/**
 * 标签页对象
 * 文档中的标签页根据此对象生成对应的代码
 *
 * @export
 * @interface NcTabs
 */
export interface NcTabs {
  /**
   * 布局方式
   *
   * @type {NcTabsLayoutEnum}
   * @memberof NcTabs
   */
  layout?: NcTabsLayoutEnum;
  /**
   * 标签页对象集合
   *
   * @type {NcTab[]}
   * @memberof NcTabs
   */
  tabs?: NcTab[];
}

export interface NcTab {
  /**
   * 标签页名称
   *
   * @type {string}
   * @memberof NcTab
   */
  label?: string;
}

/**
 * 标签页的布局方式
 *
 * @export
 * @enum {number}
 */
export enum NcTabsLayoutEnum {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left"
}