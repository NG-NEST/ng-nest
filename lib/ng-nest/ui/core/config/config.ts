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
  XCorner
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
  crumb?: XCrumbComfig;
  datePicker?: XDatePickerConfig;
  dialog?: XDialogConfig;
  drawer?: XDrawerConfig;
  dropdown?: XDropdownConfig;
  empty?: XEmptyConfig;
  find?: XFindConfig;
  form?: XFormConfig;
  highlight?: XHighlightConfig;
  icon?: XIconConfig;
  inner?: XInnerConfig;
  input?: XInputConfig;
  inputNumber?: XInputNumberConfig;
  col?: XColConfig;
  row?: XRowConfig;
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
  counntdown?: XCountdownConfig;
  steps?: XStepsConfig;
  switch?: XSwitchConfig;
  table?: XTableConfig;
  tabs?: XTabsConfig;
  tag?: XTagConfig;
  textRetarct?: XTextRetarctConfig;
  timeAgo?: XTimeAgoConfig;
  timePicker?: XTimePickerConfig;
  timeRange?: XTimeRangeConfig;
  timeline?: XTimelineConfig;
  tooltip?: XTooltipConfig;
  transfer?: XTransferConfig;
  tree?: XTreeConfig;
  treeFile?: XTreeFileConfig;
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
  duration?: XNumber;
}

export interface XAnchorConfig {
  affixTop?: string;
  layout?: XPositionLeftRight;
  justify?: XJustify;
}

export interface XAvatarConfig {
  size?: XSize;
  shape?: XShape;
  fit?: XFit;
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

export interface XContainerConfig {}

export interface XCrumbComfig {}

export interface XDatePickerConfig {}

export interface XDialogConfig {}

export interface XDrawerConfig {}

export interface XDropdownConfig {}

export interface XEmptyConfig {}

export interface XFindConfig {}

export interface XFormConfig {}

export interface XHighlightConfig {}

export interface XIconConfig {}

export interface XInnerConfig {}

export interface XInputConfig {}

export interface XInputNumberConfig {}

export interface XColConfig {}

export interface XRowConfig {}

export interface XLinkConfig {}

export interface XListConfig {}

export interface XLoadingConfig {}

export interface XMenuConfig {}

export interface XMessageConfig {}

export interface XMessageBoxConfig {}

export interface XNotificationConfig {}

export interface XOutletConfig {}

export interface XPageHeaderConfig {}

export interface XPaginationConfig {}

export interface XPatternConfig {}

export interface XPopconfirmConfig {}

export interface XPopoverConfig {}

export interface XPortalConfig {}

export interface XProgressConfing {}

export interface XRadioConfig {}

export interface XRateConfig {}

export interface XResultConfig {}

export interface XSelectConfig {}

export interface XSkeletonConfig {}

export interface XSliderConfig {}

export interface XSliderSelectConfig {}

export interface XStatisticConfig {}

export interface XCountdownConfig {}

export interface XStepsConfig {}

export interface XSwitchConfig {}

export interface XTableConfig {}

export interface XTabsConfig {}

export interface XTagConfig {}

export interface XTextRetarctConfig {}

export interface XTimeAgoConfig {}

export interface XTimePickerConfig {}

export interface XTimeRangeConfig {}

export interface XTimelineConfig {}

export interface XTooltipConfig {}

export interface XTransferConfig {}

export interface XTreeConfig {}

export interface XTreeFileConfig {}

export interface XUploadConfig {}
