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
   * 示例分类对象
   *
   * @type {NcCate[]}
   * @memberof NcExamples
   */
  cates?: NcCate[];
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
   * @type {NcCodeBox[]}
   * @memberof NcCate
   */
  codeBoxes?: NcCodeBox[];
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
   * 示例
   *
   * @type {string}
   * @memberof NcCodeBox
   */
  demo?: string;
  /**
   * 代码
   *
   * @type {string}
   * @memberof NcCodeBox
   */
  code?: string;
  /**
   * 说明
   *
   * @type {string}
   * @memberof NcCodeBox
   */
  description?: string;
}
