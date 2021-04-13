import { ObjectID } from 'typeorm';

/**
 * id 属性
 */
export interface XId {
  id: XIdType;
}

/**
 * id 类型
 */
export type XIdType = string | number | Date | ObjectID;
