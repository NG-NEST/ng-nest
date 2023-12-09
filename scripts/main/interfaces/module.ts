/**
 * 模块文件
 * 主要获取 exports 导出的组件
 *
 * @export
 * @interface NcModule
 */
export interface NcModule {
  /**
   * 模块名称
   */
  module?: string;
  /**
   * 组件名称
   */
  exports?: string[];
}
