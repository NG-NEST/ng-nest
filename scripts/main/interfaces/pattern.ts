/**
 * 组件中的样式参数对象
 *
 * @export
 * @interface NcPattern
 */
export interface NcPattern {
  /**
   * 属性名
   *
   * @type {string}
   * @memberof NcPattern
   */
  name?: string;
  /**
   * 名称
   *
   * @type {string}
   * @memberof NcPattern
   */
  label?: string;
  /**
   * 描述
   *
   * @type {string}
   * @memberof NcPattern
   */
  description?: string;
  /**
   * 值
   *
   * @type {string}
   * @memberof NcPattern
   */
  value?: string;
  /**
   * 实际值
   *
   * @type {string}
   * @memberof NcPattern
   */
  inherit?: string;
  /**
   * 继承样式参数对象
   *
   * @type {string}
   * @memberof NcPattern
   */
  children?: NcPattern[];
}
