import { NcTemplateType } from "./template";

/**
 * 导航菜单
 * 文档中的菜单根据此对象生成对应的数据，数据来源于根目录下的 docs 文件夹
 *
 * @export
 * @interface NcMenu
 */
export interface NcMenu {
  /**
   * 唯一编码
   *
   * @type {string}
   * @memberof NcMenu
   */
  id?: string;
  /**
   * 父节点编码
   *
   * @type {string}
   * @memberof NcMenu
   */
  parentId?: string;
  /**
   * 名称
   *
   * @type {string}
   * @memberof NcMenu
   */
  name?: string;
  /**
   * 显示名
   *
   * @type {string}
   * @memberof NcMenu
   */
  label?: string;
  /**
   * 显示英文名
   *
   * @type {string}
   * @memberof NcMenu
   */
  enLabel?: string;
  /**
   * 路由地址
   *
   * @type {string}
   * @memberof NcMenu
   */
  router?: string;
  /**
   * 图标
   *
   * @type {string}
   * @memberof NcMenu
   */
  icon?: string;
  /**
   * 排序
   *
   * @type {number}
   * @memberof NcMenu
   */
  order?: number;
  /**
   * 类型
   *
   * @type {NcTemplateType}
   * @memberof NcMenu
   */
  type?: NcTemplateType;
  /**
   * 分类
   *
   * @type {string}
   * @memberof NcMenu
   */
  category?: string;
}
