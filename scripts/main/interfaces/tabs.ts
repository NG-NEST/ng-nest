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
  /**
   * 模板路径
   *
   * @type {string}
   * @memberof NcTabs
   */
  tplPath?: string;
  /**
   * 文件夹路径
   *
   * @type {string}
   * @memberof NcTabs
   */
  folderPath?: string;
  /**
   * 内容
   *
   * @type {string}
   * @memberof NcTabs
   */
  content?: string;
}

export interface NcTab {
  /**
   * 文件夹名字
   *
   * @type {string}
   * @memberof NcTab
   */
  name?: string;
  /**
   * 标签页名称
   *
   * @type {string}
   * @memberof NcTab
   */
  label?: string;
  /**
   * 排序号
   *
   * @type {number}
   * @memberof NcTab
   */
  order?: number;
  /**
   * 内容
   *
   * @type {string}
   * @memberof NcTab
   */
  content?: string;
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