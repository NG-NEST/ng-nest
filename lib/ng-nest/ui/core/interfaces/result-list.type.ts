/**
 * @zh_CN 标识
 * @en_US Identify
 */
export interface XId {
  /**
   * @zh_CN 标识
   * @en_US Identify
   */
  id?: string | number;
}

/**
 * @zh_CN 列表返回数据
 * @en_US List back data
 */
export interface XResultList<Entity extends XId> {
  /**
   * @zh_CN 列表数据
   * @en_US List data
   */
  list?: Entity[];
  /**
   * @zh_CN 总数
   * @en_US Total
   */
  total?: number;
  /**
   * @zh_CN 查询条件
   * @en_US Query conditions
   */
  query?: XQuery;
}

/**
 * @zh_CN 查询条件
 * @en_US Query conditions
 */
export interface XQuery {
  /**
   * @zh_CN 第几页
   * @en_US which page
   */
  index?: number;
  /**
   * @zh_CN 每页条数
   * @en_US page number
   */
  size?: number;
  /**
   * @zh_CN 排序规则
   * @en_US Sorting rules
   */
  sort?: XSort[];
  /**
   * @zh_CN 过滤规则
   * @en_US Filtering rule
   */
  filter?: XFilter[];
  /**
   * @zh_CN 分组规则
   * @en_US Packet rules
   */
  group?: string;
}

/**
 * @zh_CN 过滤规则
 * @en_US Filtering rule
 */
export interface XFilter {
  /**
   * @zh_CN 过滤属性
   * @en_US Filtering property
   */
  field?: string;
  /**
   * @zh_CN 属性值
   * @en_US Filtering value
   */
  value?: string;
  /**
   * @zh_CN 比较符号
   * @en_US Comparative symbol
   */
  operation?: XOperation;
  /**
   * @zh_CN 关联子对象
   * @en_US Associated object
   */
  relation?: string;
}

/**
 * @zh_CN 比较符号
 * @en_US Comparative symbol
 */
export type XOperation = '%' | '=' | '>' | '>=' | '<' | '<=';

/**
 * @zh_CN 排序规则
 * @en_US Sorting rules
 */
export interface XSort extends XFilter {}

/**
 * @zh_CN 分组数据
 * @en_US Group data
 */
export interface XGroupItem extends XId {
  /**
   * @zh_CN 总数
   * @en_US total
   */
  count?: number;
  /**
   * @zh_CN 属性
   * @en_US property
   */
  [property: string]: any;
}
