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
  XStatus
} from '../interfaces';
import { InjectionToken } from '@angular/core';
import { XTheme } from '../theme';

export interface XConfig {
  components?: XComponentConfig;
  theme?: XTheme;
}

export type XConfigKey = keyof XConfig;

export type XComponentConfigKey = keyof XComponentConfig;

export const X_CONFIG = new InjectionToken<XConfig>('x-config');

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
  col?: XColConfig;
  row?: XRowConfig;
  ripple?: XRippleConfig;
  link?: XLinkConfig;
  list?: XListConfig;
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
  textarea?: XTextareaConfig;
  upload?: XUploadConfig;
}

export interface XAffixConfig {
  top?: string;
  left?: string;
}

export interface XAlertConfig {
  effect?: XEffect;
  hideClose?: XBoolean;
  showIcon?: XBoolean;
  disabledAnimation?: XBoolean;
  draggable?: XBoolean;
  dragHandleTitle?: XBoolean;
  duration?: XNumber;
}

export interface XAnchorConfig {
  affixTop?: string;
  affixWidth?: string;
  layout?: XPositionLeftRight;
  justify?: XJustify;
}

export interface XAvatarConfig {
  size?: XSize;
  shape?: XShape;
  fit?: XFit;
}

export interface XAutoCompleteConfig {
  placement?: XPositionTopBottom;
  debounceTime?: number;
  size?: XSize;
  bordered?: boolean;
  caseSensitive?: boolean;
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
}

export interface XButtonsConfig {
  space?: XNumber;
  hiddenBorder?: XBoolean;
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

export interface XCollapseConfig {}

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
}

export interface XDialogConfig {
  placement?: XPlace;
  offset?: string;
  width?: string;
  effect?: XEffect;
  showCancel?: XBoolean;
  cancelText?: string;
  showConfirm?: XBoolean;
  confirmText?: string;
  backdropClose?: XBoolean;
  draggable?: XBoolean;
  hasBackdrop?: XBoolean;
  className?: string;
  buttonsCenter?: XBoolean;
}

export interface XDrawerConfig {
  placement?: XPosition;
  size?: string;
}

export interface XDropdownConfig {
  trigger?: XTrigger;
  placement?: XPlacement;
}

export interface XDescriptionConfig {
  bordered?: XBoolean;
  size?: XSize;
}

export interface XEmptyConfig {
  content?: string;
}

export interface XFindConfig {
  size?: XSize;
  bordered?: XBoolean;
  columnLabel?: string;
  dialogTitle?: string;
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

export interface XColConfig {}

export interface XRowConfig {}

export interface XRippleConfig {
  type?: XType;
}

export interface XLinkConfig {
  underline?: XBoolean;
  iconRight?: XBoolean;
}

export interface XListConfig {}

export interface XLoadingConfig {
  size?: XSize;
  text?: string;
  icon?: string;
  color?: string;
  background?: string;
}

export interface XMenuConfig {
  size?: XSize;
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
}

export interface XRadioConfig {
  size?: XSize;
}

export interface XRateConfig {}

export interface XResultConfig {}

export interface XSelectConfig {
  placement?: XPositionTopBottom;
  clearable?: XBoolean;
  size?: XSize;
  bordered?: XBoolean;
}

export interface XSkeletonConfig {}

export interface XSliderConfig {
  animated?: XBoolean;
  size?: XSize;
}

export interface XSliderSelectConfig {}

export interface XStatisticConfig {}

export interface XCountdownConfig {
  format?: string;
}

export interface XStepsConfig {}

export interface XSwitchConfig {}

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
  rowSize?: XSize;
}

export interface XTabsConfig {
  size?: XSize;
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
}

export interface XTreeConfig {
  spacing?: XNumber;
  nodeHeight?: XNumber;
}

export interface XTextareaConfig {
  clearable?: XBoolean;
  iconLayout?: XPositionLeftRight;
}

export interface XTreeFileConfig {
  maxHeight?: XNumber;
  spacing?: XNumber;
}

export interface XUploadConfig {}
