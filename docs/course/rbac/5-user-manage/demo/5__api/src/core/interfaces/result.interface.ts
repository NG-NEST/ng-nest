import { XId } from './id.interface';

/**
 * 列表返回的数据结构
 */
export interface XResultList<Entity extends XId> {
  list?: Entity[];
  total?: number;
  query?: XQuery;
}

/**
 * 查询过滤条件
 */
export interface XQuery {
  index?: number,
  size?: number,
  sort?: XSort[];
  filter?: XFilter[];
  group?: string;
}

/**
 * 过滤属性
 */
export interface XFilter {
  field: string;
  value: string;
  operation?: XOperation;
  relation?: string;
}

/**
 * 属性匹配规则
 */
export type XOperation = '%' | '=' | '>' | '>=' | '<' | '<=' | '';

/**
 * 排序规则
 */
export interface XSort extends XFilter {}

/**
 * 分组统计
 */
export interface XGroupItem extends XId {
  [prototype: string]: any;
  count?: number;
}
