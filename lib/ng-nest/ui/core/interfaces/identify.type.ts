// 标识对象
export interface XIdentityInput {
  // 编码
  key?: any;
  // 标题
  label?: string;
}

// 父节点标识对象
export interface XParentIdentityInput extends XIdentityInput {
  // 编码
  parentKey?: any;
  // 有子节点
  hasChildren?: boolean;
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
