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
   * 节点对齐方式
   *
   * @type {NcTabsNodeJustifyEnum}
   * @memberof NcTabs
   */
  nodeJustify?: NcTabsNodeJustifyEnum;
  /**
   * 尺寸
   *
   * @type {NcTabsNodeJustifyEnum}
   * @memberof NcTabs
   */
  size?: NcTabsSizeEnum;
  /**
   * 编码
   *
   * @type {NcTabsLayoutEnum}
   * @memberof NcTabs
   */
  id?: string;
  /**
   * 改变事件
   *
   * @memberof NcTabs
   */
  activatedChange?: string;
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
  order?: string;
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
 * @enum {string}
 */
export enum NcTabsLayoutEnum {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left'
}

/**
 * 标签页的布局方式
 *
 * @export
 * @enum {string}
 */
export enum NcTabsNodeJustifyEnum {
  Start = 'start',
  Center = 'center',
  End = 'end'
}

/**
 * 标签页的尺寸
 *  
 * @export
 * @enum {string}
 */
export enum NcTabsSizeEnum {
  Big = 'big',
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  Mini = 'mini'
}
