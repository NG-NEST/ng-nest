// 标识对象
export interface XIdentityInput {
  // 编码
  id?: any;
  // 标题
  label?: any;
}

// 父节点标识对象
export interface XParentIdentityInput extends XIdentityInput {
  // 编码
  pid?: any;
  // 层级
  level?: number;
  // 叶子节点
  leaf?: boolean;
  // 子节点
  children?: XParentIdentityInput[];
  // 选中
  selected?: boolean;
  // 禁用
  disabled?: boolean;
}

// 标识对象
export class XIdentity {
  // 编码
  id?: any;
  // 标题
  label?: string;
}
