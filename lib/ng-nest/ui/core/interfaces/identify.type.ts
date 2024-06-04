/**
 * @zh_CN 标识对象
 * @en_US Identify object
 */
export interface XIdentityProperty {
  /**
   * @zh_CN 编码
   * @en_US Id
   */
  id?: any;
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  label?: any;
}

/**
 * @zh_CN 父节点标识对象
 * @en_US Father node identification object
 */
export interface XParentIdentityProperty<T> extends XIdentityProperty {
  /**
   * @zh_CN 父节点编码
   * @en_US Parent Id
   */
  pid?: any;
  /**
   * @zh_CN 层级
   * @en_US Level
   */
  level?: number;
  /**
   * @zh_CN 叶子节点
   * @en_US Leaf node
   */
  leaf?: boolean;
  /**
   * @zh_CN 子节点
   * @en_US Children node
   */
  children?: T[];
  /**
   * @zh_CN 子节点已加载过
   * @en_US Sub node has been loaded
   */
  childrenLoaded?: boolean;
  /**
   * @zh_CN 选中
   * @en_US Selected
   */
  selected?: boolean;
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  disabled?: boolean;
  /**
   * @zh_CN 展开
   * @en_US open
   */
  open?: boolean;
}

/**
 * @zh_CN 标识对象
 * @en_US Identify object
 */
export class XIdentity {
  /**
   * @zh_CN 编码
   * @en_US Id
   */
  id?: any;
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  label?: any;
}
