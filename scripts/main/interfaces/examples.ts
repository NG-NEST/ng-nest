/**
 * 示例对象
 * 文档中的示例代码根据此对象生成对应的代码
 *
 * @export
 * @interface NcExamples
 */
export interface NcExamples {
  /**
   * 文件夹路径，来源于 Page 对象中的 path 属性
   *
   * @type {string}
   * @memberof NcExamples
   */
  path?: string;
  /**
   * 模板路径
   *
   * @type {string}
   * @memberof NcExamples
   */
  tplPath?: string;
}

/**
 * 示例的分类
 *
 * @export
 * @interface NcCates
 */
export interface NcCates {
  /**
   * 分类路径
   *
   * @type {string}
   * @memberof NcCates
   */
  folderPath?: string;
  /**
   * 分类列表
   *
   * @type {NcCate[]}
   * @memberof NcCates
   */
  list?: NcCate[];
  /**
   * 内容
   *
   * @type {string}
   * @memberof NcCates
   */
  content?: string;
}

/**
 * 示例分类对象
 * 根据组件库下面的 examples 文件夹区分
 *
 * @export
 * @interface NcCate
 */
export interface NcCate {
  /**
   * 排序，来源于分类下面 readme.md 文件中的 order 属性
   * 正序排列
   *
   * @type {number}
   * @memberof NcCate
   */
  order?: number;
  /**
   * 标题，来源于分类下面 readme.md 文件中的 label 属性
   *
   * @type {string}
   * @memberof NcCate
   */
  label?: string;
  /**
   * 文件夹名称
   *
   * @type {string}
   * @memberof NcCate
   */
  name?: string;
  /**
   * 分类路径
   *
   * @type {number}
   * @memberof NcCate
   */
  path?: string;
  /**
   * 代码块
   *
   * @type {NcCodeBox}
   * @memberof NcCate
   */
  codeBoxes?: NcCodeBox;
}

/**
 * 代码块
 * 分类下面的示例、代码、说明
 *
 * @export
 * @interface NcCodeBox
 */
export interface NcCodeBox {
  /**
   * 代码
   *
   * @type {string}
   * @memberof NcCodeBox
   */
  codes?: NcCode[];
  /**
   * 说明
   *
   * @type {string}
   * @memberof NcCodeBox
   */
  description?: string;
}

/**
 * 单个代码块的代码
 * 一个或多个 HTML SCSS TS， 入口文件取对应的文件夹名字
 *
 * @export
 * @interface NcCode
 */
export interface NcCode {
  /**
   * 文件名
   *
   * @type {string}
   * @memberof NcCode
   */
  name?: string;
  /**
   * 文件类型
   *
   * @type {NcCodeType}
   * @memberof NcCode
   */
  type?: string;
  /**
   * 文件内容
   *
   * @type {string}
   * @memberof NcCode
   */
  content?: string;
}
