/**
 * 示例代码树节点
 */
export interface NcDemoTreeNode {
  /**
   * id 编码
   */
  id?: string;
  /**
   * 父节点编码
   */
  pid?: string;
  /**
   * 名称
   */
  label?: string;
  /**
   * 文件类型
   */
  type?: string;
  /**
   * 文件请求地址
   */
  url?: string;
  /**
   * 叶子节点
   */
  leaf?: boolean;
  /**
   *
   */
  highlightLines?: { [property: string]: string };
}
