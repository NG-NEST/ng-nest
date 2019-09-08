/**
 * Icon 组件名
 * @selector nm-icon
 * @decorator component
 */
export const IconPrefix = "nm-icon";

/**
 * Icon 参数对象
 */
export interface NmIconOption {
  /**
   * 图标类型
   */
  nmType?: string;
  /**
   * 图标颜色
   */
  nmColor?: string | string[];
  /**
   * 图标旋转角度
   */
  nmRotate?: number;
}

/**
 * 图标来源
 */
export enum NmIconSourceEnum {
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
