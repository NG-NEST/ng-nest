// 标识对象
export interface XIdentityInput {
  // 编码
  key?: any;
  // 标题
  label?: any;
  // 值
  value?: any;
}

// 父节点标识对象
export interface XParentIdentityInput extends XIdentityInput {
  // 编码
  parentValue?: any;
  // 层级
  level?: number;
  // 有子节点
  hasChild?: boolean;
  // 选中
  selected?: boolean;
  // 禁用
  disabled?: boolean;
}

// 标识对象
export class XIdentity {
  // 编码
  key?: any;
  // 标题
  label?: string;
}
