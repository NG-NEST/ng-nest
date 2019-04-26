export const IconPrefix = "nm-icon";

// Icon 参数对象
export interface NmIconOption {
  // 图标类型
  nmType?: string;
  // 图标颜色
  nmColor?: string | string[];
  // 图标旋转角度
  nmRotate?: number;
}

// 图标来源
export enum NmIconSourceEnum {
  // Ant Design
  AntDesign = "ant-design",
  // Eva
  Eva = "eva",
  // Feather
  Feather = "feather",
  // Font Awesome
  FontAwesome = "font-awesome",
  // Material Design
  MaterialDesign = "material-design"
}

// 来源路径对应
export const NmSouceUrl = {
  adf: `${NmIconSourceEnum.AntDesign}/fill/`,
  ado: `${NmIconSourceEnum.AntDesign}/outline/`,
  adt: `${NmIconSourceEnum.AntDesign}/twotone/`,
  eaf: `${NmIconSourceEnum.Eva}/fill/`,
  eao: `${NmIconSourceEnum.Eva}/outline/`,
  fto: `${NmIconSourceEnum.Feather}/`,
  fab: `${NmIconSourceEnum.FontAwesome}/brands/`,
  far: `${NmIconSourceEnum.FontAwesome}/regular/`,
  fas: `${NmIconSourceEnum.FontAwesome}/solid/`,
  md: `${NmIconSourceEnum.MaterialDesign}/`
};
