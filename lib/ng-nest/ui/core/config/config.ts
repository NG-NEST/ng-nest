import { InjectionToken } from '@angular/core';
import type { XTheme } from '../theme';
import type {
  XSize,
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
  XTemplate,
  XStyleMap
} from '../interfaces';

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
  gap?: string;
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
  visibilityHeight?: number;
}

export interface XBadgeConfgig {
  type?: XType;
}

export interface XButtonConfig {
  size?: XSize;
  type?: XType;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  flat?: boolean;
  text?: boolean;
  attrType?: 'submit' | 'button' | 'reset';
}

export interface XButtonsConfig {
  space?: string;
  hiddenBorder?: boolean;
  boxShadow?: boolean;
  round?: boolean;
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
  nodeHoverDelay?: number;
}

export interface XCheckboxConfig {
  size?: XSize;
}

export interface XCollapseConfig {
  showIcon?: boolean;
  ghost?: boolean;
  iconPosition?: 'left' | 'right';
  bordered?: boolean;
}

export interface XColorConfig {
  merge?: string;
  amounts?: number[];
}

export interface XColorPickerConfig {
  placement?: XCorner;
  size?: XSize;
  bordered?: boolean;
}

export interface XCommentConfig {
  contentMax?: number;
  maxlength?: number;
}

export interface XContainerConfig {
  direction?: XDirection;
}

export interface XHeaderConfig {
  height?: string;
}

export interface XAsideConfig {
  width?: string;
}

export interface XFooterConfig {
  height?: string;
}

export interface XCrumbComfig {
  separator?: string;
}

export interface XDatePickerConfig {
  format?: string;
  clearable?: boolean;
  placement?: XCorner;
  size?: XSize;
  bordered?: boolean;
}

export interface XDateRangeConfig {
  format?: string;
  clearable?: boolean;
  placement?: XCorner;
  size?: XSize;
  bordered?: boolean;
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
  showCancel?: boolean;
  cancelText?: string;
  showConfirm?: boolean;
  confirmText?: string;
  backdropClose?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  maximize?: boolean;
  hasBackdrop?: boolean;
  className?: string;
  buttonsCenter?: boolean;
}

export interface XDrawerConfig {
  placement?: XPosition;
  size?: string;
  backdropClose?: boolean;
  hasBackdrop?: boolean;
  className?: string;
}

export interface XDropdownConfig {
  trigger?: XTrigger;
  placement?: XPlacement;
  size?: XSize;
}

export interface XDescriptionConfig {
  bordered?: boolean;
  size?: XSize;
}

export interface XEmptyConfig {
  img?: XTemplate;
  content?: XTemplate;
}

export interface XFindConfig {
  size?: XSize;
  bordered?: boolean;
  columnLabel?: string;
  dialogTitle?: string;
  dialogCheckboxLabel?: string;
  dialogCheckboxWidth?: number;
  dialogEmptyContent?: string;
  dialogButtonsCenter?: boolean;
  tableIndex?: number;
  tableSize?: number;
  tableLoading?: boolean;
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
  clearable?: boolean;
  iconLayout?: XPositionLeftRight;
  size?: XSize;
  bordered?: boolean;
  inputPadding?: string;
  inputIconPadding?: XNumber;
}

export interface XInputGroupConfig {
  size?: XSize;
  bordered?: boolean;
  compact?: boolean;
}

export interface XInputNumberConfig {
  size?: XSize;
  bordered?: boolean;
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
  underline?: boolean;
  iconRight?: boolean;
  preventDefault?: boolean;
}

export interface XListConfig {
  selectAllText?: string;
  loadMoreText?: string;
  loadingMoreText?: string;
  caseSensitive?: boolean;
  virtualScroll?: boolean;
  scrollHeight?: number;
  size?: XSize;
}

export interface XListOptionConfig {
  size?: XSize;
}

export interface XLoadingConfig {
  size?: XSize | number;
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
  index?: number;
  size?: number;
  space?: string;
  pageLinkSize?: number;
  hiddenBorder?: boolean;
  showEllipsis?: boolean;
  showTotal?: boolean;
  showSize?: boolean;
  showBackground?: boolean;
  sizeWidth?: string;
  sizeData?: number[];
  showInputSize?: boolean;
  inputSizeWidth?: number;
  showJump?: boolean;
  jumpWidth?: string;
  simple?: boolean;
  simpleIndexWidth?: string;
}

export interface XPatternConfig {}

export interface XPopconfirmConfig {
  placement?: XPlacement;
  trigger?: XTrigger;
  icon?: string;
  iconColor?: string;
  cancelText?: string;
  confirmText?: string;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
}

export interface XPopoverConfig {
  placement?: XPlacement;
  trigger?: XTrigger;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
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
  clearable?: boolean;
  size?: XSize;
  bordered?: boolean;
  portalMaxHeight?: string;
  selectAllText?: string;
  search?: boolean;
  caseSensitive?: boolean;
  debounceTime?: number;
  maxTagCount?: number;
  maxTagContent?: XTemplate;
  virtualScroll?: boolean;
}

export interface XSkeletonConfig {}

export interface XSliderConfig {
  animated?: boolean;
  size?: XSize;
  showExpand?: boolean;
  autoShowArrow?: boolean;
  trigger?: XTrigger;
  expandMaxHeight?: string;
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
  loading?: boolean;
  showHeader?: boolean;
  virtualScroll?: boolean;
  rowHeight?: XNumber;
  itemSize?: XNumber;
  bordered?: XNumber;
  allowSelectRow?: boolean;
  allowCheckRow?: boolean;
  rowSize?: XSize;
  showPagination?: boolean;
  treeTable?: boolean;
  expandedAll?: boolean;
  expandedLevel?: XNumber;
  hiddenPaginationBorder?: boolean;
  hiddenWrapBorder?: boolean;
  showEmpty?: boolean;
  emptyImg?: XTemplate;
  emptyContent?: XTemplate;

  space?: string;
  pageLinkSize?: number;
  hiddenBorder?: boolean;
  showEllipsis?: boolean;
  showTotal?: boolean;
  showSize?: boolean;
  showBackground?: boolean;
  sizeWidth?: string;
  sizeData?: number[];
  showInputSize?: boolean;
  inputSizeWidth?: number;
  showJump?: boolean;
  jumpWidth?: string;
  simple?: boolean;
  simpleIndexWidth?: string;
}

export interface XTabsConfig {
  size?: XSize;
  trigger?: XTrigger;
  expandMaxHeight?: string;
}

export interface XTagConfig {
  size?: XSize;
  bordered?: boolean;
  closable?: boolean;
  dark?: boolean;
}

export interface XTextRetractConfig {
  max?: number;
}

export interface XThemeConfig {
  amounts?: number[];
}

export interface XTimeAgoConfig {}

export interface XTimePickerConfig {
  format?: string;
  placement?: XCorner;
  size?: XSize;
  bordered?: boolean;
  use12Hours?: boolean;
  defaultNow?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
}

export interface XTimeRangeConfig {}

export interface XTimelineConfig {
  size?: XSize;
  mode?: 'left' | 'right' | 'alternate';
}

export interface XTooltipConfig {
  placement?: XPlacement;
}

export interface XTransferConfig {
  titles?: string[];
  drag?: boolean;
  virtualScroll?: boolean;
  type?: 'list' | 'table' | 'tree';
  listStyle: XStyleMap | XStyleMap[];
}

export interface XTreeConfig {
  spacing?: string;
  nodeHeight?: string;
  nodeAlignItems?: XAlign;
  virtualScroll?: boolean;
  onlyLeaf?: boolean;
  showLine?: boolean;
  virtualScrollHeight?: string;
  itemSize?: number;
  caseSensitive?: boolean;
}

export interface XTextareaConfig {
  clearable?: boolean;
  iconLayout?: XPositionLeftRight;
}

export interface XTreeFileConfig {
  maxHeight?: string;
  spacing?: string;
}

export interface XTreeSelectConfig {
  placement?: XPositionTopBottom;
  clearable?: boolean;
  size?: XSize;
  bordered?: boolean;
  portalMaxHeight?: string;
  selectAllText?: string;
  search?: boolean;
  caseSensitive?: boolean;
  debounceTime?: number;
  maxTagCount?: number;
  virtualScroll?: boolean;
  showPath?: boolean;
  separator?: string;
  onlyLeaf?: boolean;
}

export interface XUploadConfig {
  download?: boolean;
  multipleModel?: 'cover' | 'add';
}

export interface XKeywordConfig {
  type?: XType;
  color?: string;
  caseSensitive?: boolean;
}
