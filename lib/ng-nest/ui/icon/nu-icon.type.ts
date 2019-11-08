/**
 * Icon 组件名
 * @selector nu-icon
 * @decorator component
 */
export const IconPrefix = "nu-icon";

/**
 * Icon 参数对象
 */
export interface NuIconOption {
  /**
   * 图标类型
   */
  nuType?: string;
  /**
   * 图标颜色
   */
  nuColor?: string | string[];
  /**
   * 图标旋转角度
   */
  nuRotate?: number;
}

/**
 * 图标来源
 */
export enum NuIconSourceEnum {
  /**
   * Ant Design
   */
  AntDesign = "ant-design",
  /**
   * Eva
   */
  Eva = "eva",
  /**
   * Feather
   */
  Feather = "feather",
  /**
   * Font Awesome
   */
  FontAwesome = "font-awesome",
  /**
   * Material Design
   */
  MaterialDesign = "material-design"
}
