/**
 * Icon 组件名
 * @selector x-icon
 * @decorator component
 */
export const XIconPrefix = "x-icon";

/**
 * Icon @Input
 */
export interface XIconInput {
  /**
   * 图标类型
   */
  type?: string;
  /**
   * 图标颜色
   */
  color?: string | string[];
  /**
   * 图标旋转角度
   */
  rotate?: number;
  /**
   * loading效果（图标一直旋转）
   */
  spin?: boolean;
}

/**
 * 图标来源
 */
export enum XIconSourceEnum {
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
