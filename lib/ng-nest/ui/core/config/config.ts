import {
  XSize,
  XBoolean,
  XType,
  XEffect,
  XNumber,
  XPositionLeftRight,
  XJustify,
  XShape,
  XFit,
  XShadow,
  XTrigger,
  XDisplayDirection,
  XCorner,
  XDirection,
  XPlace,
  XPosition,
  XPlacement,
  XPositionTopBottom,
  XStatus,
  XAlign,
  XTemplate
} from '../interfaces';
import { InjectionToken } from '@angular/core';
import { XTheme } from '../theme';

/**
 * @zh_CN 组件和主题全局配置信息
 * @en_US Component and theme global configuration information
 */
export interface XConfig {
  /**
   * @zh_CN 组件配置信息
   * @en_US Component configuration information
   */
  components?: XComponentConfig;
  /**
   * @zh_CN 主题全配置信息
   * @en_US theme configuration information
   */
  theme?: XTheme;
}

export type XConfigKey = keyof XConfig;
export type XComponentConfigKey = keyof XComponentConfig;
export const X_CONFIG = new InjectionToken<XConfig>('x-config');

/**
 * @zh_CN 组件全局配置
 * @en_US Global configuration of the component
 */
export interface XComponentConfig {
  affix?: XAffixConfig;
  alert?: XAlertConfig;
  anchor?: XAnchorConfig;
  avatar?: XAvatarConfig;
  autoComplete?: XAutoCompleteConfig;
  backTop?: XBackTopConfig;
  badge?: XBadgeConfgig;
  button?: XButtonConfig;
  buttons?: XButtonsConfig;
  calendar?: XCalendarConfig;
  card?: XCardConfig;
  carousel?: XCarouselConfig;
  cascade?: XCascadeConfig;
  checkbox?: XCheckboxConfig;
  collapse?: XCollapseConfig;
  color?: XColorConfig;
  colorPicker?: XColorPickerConfig;
  comment?: XCommentConfig;
  container?: XContainerConfig;
  header?: XHeaderConfig;
  aside?: XAsideConfig;
  footer?: XFooterConfig;
  crumb?: XCrumbComfig;
  datePicker?: XDatePickerConfig;
  dateRange?: XDateRangeConfig;
  dialog?: XDialogConfig;
  drawer?: XDrawerConfig;
  dropdown?: XDropdownConfig;
  description?: XDescriptionConfig;
  empty?: XEmptyConfig;
  find?: XFindConfig;
  form?: XFormConfig;
  highlight?: XHighlightConfig;
  icon?: XIconConfig;
  inner?: XInnerConfig;
  input?: XInputConfig;
  inputGroup?: XInputGroupConfig;
  inputNumber?: XInputNumberConfig;
  image?: XImageConfig;
  col?: XColConfig;
  row?: XRowConfig;
  ripple?: XRippleConfig;
  link?: XLinkConfig;
  list?: XListConfig;
  listOption?: XListOptionConfig;
  loading?: XLoadingConfig;
  menu?: XMenuConfig;
  message?: XMessageConfig;
  messageBox?: XMessageBoxConfig;
  notification?: XNotificationConfig;
  outlet?: XOutletConfig;
  pageHeader?: XPageHeaderConfig;
  pagination?: XPaginationConfig;
  pattern?: XPatternConfig;
  popconfirm?: XPopconfirmConfig;
  popover?: XPopoverConfig;
  portal?: XPortalConfig;
  progress?: XProgressConfing;
  radio?: XRadioConfig;
  rate?: XRateConfig;
  result?: XResultConfig;
  select?: XSelectConfig;
  skeleton?: XSkeletonConfig;
  slider?: XSliderConfig;
  sliderSelect?: XSliderSelectConfig;
  statistic?: XStatisticConfig;
  countdown?: XCountdownConfig;
  steps?: XStepsConfig;
  switch?: XSwitchConfig;
  table?: XTableConfig;
  tabs?: XTabsConfig;
  tag?: XTagConfig;
  textRetract?: XTextRetractConfig;
  theme?: XThemeConfig;
  timeAgo?: XTimeAgoConfig;
  timePicker?: XTimePickerConfig;
  timeRange?: XTimeRangeConfig;
  timeline?: XTimelineConfig;
  tooltip?: XTooltipConfig;
  transfer?: XTransferConfig;
  tree?: XTreeConfig;
  treeFile?: XTreeFileConfig;
  treeSelect?: XTreeSelectConfig;
  textarea?: XTextareaConfig;
  upload?: XUploadConfig;
  keyword?: XKeywordConfig;
}

export interface XAffixConfig {
  top?: string;
  left?: string;
}

export interface XAlertConfig {
  effect?: XEffect;
  hideClose?: boolean;
  showIcon?: boolean;
  disabledAnimation?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  dragHandleTitle?: boolean;
  duration?: number;
  minWidth?: string;
  minHeight?: string;
}

export interface XAnchorConfig {
  affixTop?: string;
  affixBottom?: string;
  affixWidth?: string;
  layout?: XPositionLeftRight;
  justify?: XJustify;
}

export interface XAvatarConfig {
  size?: XSize;
  shape?: XShape;
  fit?: XFit;
  gap?: number;
  backgroundColor?: string;
}

export interface XAutoCompleteConfig {
  placement?: XPositionTopBottom;
  debounceTime?: number;
  size?: XSize;
  bordered?: boolean;
  caseSensitive?: boolean;
  onlySelect?: boolean;
}

export interface XBackTopConfig {
  right?: string;
  bottom?: string;
  visibilityHeight?: XNumber;
}

export interface XBadgeConfgig {
  type?: XType;
}

export interface XButtonConfig {
  size?: XSize;
  type?: XType;
  plain?: XBoolean;
  round?: XBoolean;
  circle?: XBoolean;
  flat?: XBoolean;
  text?: XBoolean;
  attrType?: 'submit' | 'button' | 'reset';
}

export interface XButtonsConfig {
  space?: XNumber;
  hiddenBorder?: XBoolean;
  showBoxShadow?: XBoolean;
}

export interface XCalendarConfig {}

export interface XCardConfig {
  shadow?: XShadow;
}

export interface XCarouselConfig {
  height?: string;
  trigger?: XTrigger;
  arrow?: XShadow;
  direction?: XDisplayDirection;
}

export interface XCascadeConfig {
  placement?: XCorner;
  size?: XSize;
  bordered?: boolean;
  nodeTrigger?: XTrigger;
  nodeHoverDelay?: XNumber;
}

export interface XCheckboxConfig {
  size?: XSize;
}

export interface XCollapseConfig {
  showIcon?: Boolean;
  ghost?: Boolean;
  iconPosition?: 'left' | 'right';
  bordered?: Boolean;
}

export interface XColorConfig {
  merge?: string;
  amounts?: string;
}

export interface XColorPickerConfig {
  placement?: XCorner;
}

export interface XCommentConfig {
  contentMax?: number;
}

export interface XContainerConfig {
  direction?: XDirection;
}

export interface XHeaderConfig {
  height?: number;
}

export interface XAsideConfig {
  width?: number;
}

export interface XFooterConfig {
  height?: number;
}

export interface XCrumbComfig {
  separator?: string;
}

export interface XDatePickerConfig {
  format?: string;
  clearable?: XBoolean;
  placement?: XCorner;
  size?: XSize;
  bordered?: boolean;
}

export interface XDateRangeConfig {
  format?: string;
  clearable?: XBoolean;
  placement?: XCorner;
  size?: XSize;
  bordered?: XBoolean;
}

export interface XDialogConfig {
  placement?: XPlace;
  offset?: string;
  width?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  effect?: XEffect;
  showCancel?: XBoolean;
  cancelText?: string;
  showConfirm?: XBoolean;
  confirmText?: string;
  backdropClose?: XBoolean;
  draggable?: XBoolean;
  resizable?: XBoolean;
  maximize?: XBoolean;
  hasBackdrop?: XBoolean;
  className?: string;
  buttonsCenter?: XBoolean;
}

export interface XDrawerConfig {
  placement?: XPosition;
  size?: string;
  backdropClose?: XBoolean;
  hasBackdrop?: XBoolean;
  className?: string;
}

export interface XDropdownConfig {
  trigger?: XTrigger;
  placement?: XPlacement;
  size?: XSize;
}

export interface XDescriptionConfig {
  bordered?: XBoolean;
  size?: XSize;
}

export interface XEmptyConfig {
  img?: XTemplate;
  content?: XTemplate;
}

export interface XFindConfig {
  size?: XSize;
  bordered?: XBoolean;
  columnLabel?: string;
  dialogTitle?: string;
  dialogCheckboxLabel?: string;
  dialogCheckboxWidth?: number;
  dialogEmptyContent?: string;
  dialogButtonsCenter?: XBoolean;
  tableIndex?: number;
  tableSize?: number;
  tableLoading?: XBoolean;
  tableVirtualScroll?: boolean;
  tableRowHeight?: XNumber;
  treeExpandedLevel?: XNumber;
}

export interface XFormConfig {
  space?: XNumber;
  labelSuffix?: string;
  width?: string;
}

export interface XHighlightConfig {}

export interface XIconConfig {
  href?: string;
}

export interface XInnerConfig {
  padding?: string;
}

export interface XInputConfig {
  clearable?: XBoolean;
  iconLayout?: XPositionLeftRight;
  size?: XSize;
  bordered?: XBoolean;
  inputPadding?: XNumber;
  inputIconPadding?: XNumber;
}

export interface XInputGroupConfig {
  size?: XSize;
  bordered?: XBoolean;
  compact?: XBoolean;
}

export interface XInputNumberConfig {
  size?: XSize;
  bordered?: XBoolean;
}

export interface XImageConfig {
  previewText?: string;
}

export interface XColConfig {}

export interface XRowConfig {}

export interface XRippleConfig {
  type?: XType;
}

export interface XLinkConfig {
  underline?: XBoolean;
  iconRight?: XBoolean;
  preventDefault?: XBoolean;
}

export interface XListConfig {
  selectAllText?: string;
  loadMoreText?: string;
  loadingMoreText?: string;
  caseSensitive?: boolean;
}

export interface XListOptionConfig {
  size?: XSize;
}

export interface XLoadingConfig {
  size?: XSize;
  text?: string;
  icon?: string;
  color?: string;
  background?: string;
  zIndex?: number;
}

export interface XMenuConfig {
  size?: XSize;
  width?: string;
  trigger?: XTrigger;
}

export interface XMessageConfig {
  type?: XStatus;
  width?: string;
  placement?: XPlace;
  displayType?: string;
  offset?: string | string[];
  duration?: number;
  hideClose?: boolean;
  showIcon?: boolean;
}

export interface XMessageBoxConfig {}

export interface XNotificationConfig {}

export interface XOutletConfig {}

export interface XPageHeaderConfig {
  backIcon?: string;
  backText?: string;
}

export interface XPaginationConfig {
  index?: XNumber;
  size?: XNumber;
  space?: XNumber;
  pageLinkSize?: XNumber;
  hiddenBorder?: boolean;
  showEllipsis?: boolean;
  showTotal?: boolean;
  showSize?: boolean;
  sizeWidth?: number;
  sizeData?: number[];
  showInputSize?: boolean;
  inputSizeWidth?: number;
  showJump?: boolean;
  jumpWidth?: number;
  simple?: boolean;
  simpleIndexWidth?: number;
}

export interface XPatternConfig {}

export interface XPopconfirmConfig {
  placement?: XPlacement;
  trigger?: XTrigger;
  width?: string;
  icon?: string;
  iconColor?: string;
  cancelText?: string;
  confirmText?: string;
}

export interface XPopoverConfig {
  placement?: XPlacement;
  trigger?: XTrigger;
  width?: string;
}

export interface XPortalConfig {}

export interface XProgressConfing {
  height?: string;
  stepWidth?: string;
}

export interface XRadioConfig {
  size?: XSize;
}

export interface XRateConfig {
  color?: string | { [color: string]: (rate: number) => boolean };
}

export interface XResultConfig {}

export interface XSelectConfig {
  placement?: XPositionTopBottom;
  clearable?: XBoolean;
  size?: XSize;
  bordered?: XBoolean;
  portalMaxHeight?: string;
  selectAllText?: string;
  search?: XBoolean;
  caseSensitive?: XBoolean;
  debounceTime?: number;
  maxTagCount?: number;
  virtualScroll?: XBoolean;
}

export interface XSkeletonConfig {}

export interface XSliderConfig {
  animated?: XBoolean;
  size?: XSize;
  showExpand?: XBoolean;
  autoShowArrow?: XBoolean;
  trigger?: XTrigger;
}

export interface XSliderSelectConfig {}

export interface XStatisticConfig {}

export interface XCountdownConfig {
  format?: string;
}

export interface XStepsConfig {}

export interface XSwitchConfig {
  size?: XSize;
}

export interface XTableConfig {
  index?: number;
  size?: number;
  loading?: XBoolean;
  showHeader?: XBoolean;
  virtualScroll?: boolean;
  rowHeight?: XNumber;
  itemSize?: XNumber;
  bordered?: XNumber;
  allowSelectRow?: XBoolean;
  allowCheckRow?: XBoolean;
  rowSize?: XSize;
  showPagination?: XBoolean;
  treeTable?: XBoolean;
  expandedAll?: XBoolean;
  expandedLevel?: XNumber;
  hiddenPaginationBorder?: XBoolean;
  hiddenWrapBorder?: XBoolean;
  showEmpty?: XBoolean;
  emptyImg?: XTemplate;
  emptyContent?: XTemplate;
}

export interface XTabsConfig {
  size?: XSize;
  trigger?: XTrigger;
}

export interface XTagConfig {
  size?: XSize;
  bordered?: XBoolean;
  closable?: XBoolean;
  dark?: XBoolean;
}

export interface XTextRetractConfig {
  max?: XNumber;
}

export interface XThemeConfig {
  amounts?: XNumber[];
}

export interface XTimeAgoConfig {}

export interface XTimePickerConfig {
  format?: string;
  placement?: XCorner;
  size?: XSize;
  bordered?: XBoolean;
  use12Hours?: XBoolean;
  defaultNow?: XBoolean;
}

export interface XTimeRangeConfig {}

export interface XTimelineConfig {
  size?: XSize;
}

export interface XTooltipConfig {
  placement?: XPlacement;
}

export interface XTransferConfig {
  titles?: string[];
  drag?: XBoolean;
  virtualScroll?: XBoolean;
}

export interface XTreeConfig {
  spacing?: XNumber;
  nodeHeight?: XNumber;
  nodeAlignItems?: XAlign;
  virtualScroll?: boolean;
  onlyLeaf?: boolean;
  showLine?: boolean;
}

export interface XTextareaConfig {
  clearable?: XBoolean;
  iconLayout?: XPositionLeftRight;
}

export interface XTreeFileConfig {
  maxHeight?: XNumber;
  spacing?: XNumber;
}

export interface XTreeSelectConfig {
  placement?: XPositionTopBottom;
  clearable?: XBoolean;
  size?: XSize;
  bordered?: XBoolean;
  portalMaxHeight?: string;
  selectAllText?: string;
  search?: XBoolean;
  caseSensitive?: XBoolean;
  debounceTime?: number;
  maxTagCount?: number;
  virtualScroll?: XBoolean;
  showPath?: XBoolean;
  separator?: string;
  onlyLeaf?: boolean;
}

export interface XUploadConfig {
  download?: XBoolean;
  multipleModel?: 'cover' | 'add';
}

export interface XKeywordConfig {
  type?: XType;
  color?: string;
  caseSensitive?: boolean;
}
