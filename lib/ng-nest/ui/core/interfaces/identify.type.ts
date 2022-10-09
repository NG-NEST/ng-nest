// 标识对象
export interface XIdentityProperty {
  // 编码
  id?: any;
  // 标题
  label?: any;
}

// 父节点标识对象
export interface XParentIdentityProperty<T> extends XIdentityProperty {
  // 编码
  pid?: any;
  // 层级
  level?: number;
  // 叶子节点
  leaf?: boolean;
  // 子节点
  children?: T[];
  // 子节点已加载过
  childrenLoaded?: boolean;
  // 选中
  selected?: boolean;
  // 禁用
  disabled?: boolean;
  // 展开
  open?: boolean;
}

// 标识对象
export class XIdentity {
  // 编码
  id?: any;
  // 标题
  label?: any;
}
