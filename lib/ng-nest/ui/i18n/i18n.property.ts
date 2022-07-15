import { InjectionToken } from '@angular/core';

/**
 * I18n
 * @selector xI18n
 * @decorator Pipe
 */
export const XI18nPrefix = 'xI18n';

export interface XI18nProperty {
  locale: string;
  comment?: XI18nComment;
  theme?: XI18nTheme;
  calendar?: XI18nCalendar;
  datePicker?: XI18nDatePicker;
  empty?: XI18nEmpty;
  pagination?: XI18nPagination;
  textRetract?: XI18nTextRetract;
  timeAgo?: XI18nTimeAgo;
  messageBox?: XI18nMessageBox;
  dialog?: XI18nDialog;
  popconfirm?: XI18nPopconfirm;
  upload?: XI18nUpload;
  pageHeader?: XI18nPageHeader;
  list?: XI18nList;
  select?: XI18nSelect;
  form?: XI18nForm;
  [property: string]: any;
}

export interface XI18nComment {
  comments?: string;
  giveALike?: string;
  reply?: string;
  more?: string;
}

export interface XI18nTheme {
  darkMode?: string;
  initDefault?: string;
  primary?: string;
  success?: string;
  warning?: string;
  danger?: string;
  info?: string;
  background?: string;
  border?: string;
  text?: string;
}

export interface XI18nCalendar {
  month?: string;
  year?: string;
  lastMonth?: string;
  lastYear?: string;
  nextMonth?: string;
  nextYear?: string;
  january?: string;
  february?: string;
  march?: string;
  april?: string;
  may?: string;
  june?: string;
  july?: string;
  august?: string;
  september?: string;
  october?: string;
  november?: string;
  december?: string;
}

export interface XI18nDatePicker {
  sure?: string;
  month?: string;
  year?: string;
  january?: string;
  february?: string;
  march?: string;
  april?: string;
  may?: string;
  june?: string;
  july?: string;
  august?: string;
  september?: string;
  october?: string;
  november?: string;
  december?: string;
  yesterday?: string;
  today?: string;
  tomorrow?: string;
}

export interface XI18nEmpty {
  noData?: string;
}

export interface XI18nPagination {
  previous?: string;
  next?: string;
  total?: string;
  item?: string;
}

export interface XI18nTextRetract {
  unfold?: string;
  packUp?: string;
}

export interface XI18nTimeAgo {
  just?: string;
  secondsAgo?: string;
  minutesAgo?: string;
  hoursAgo?: string;
}

export interface XI18nMessageBox {
  cancelText?: string;
  confirmText?: string;
}

export interface XI18nDialog {
  cancelText?: string;
  confirmText?: string;
}

export interface XI18nPopconfirm {
  cancelText?: string;
  confirmText?: string;
}

export interface XI18nUpload {
  uploadText?: string;
}

export interface XI18nPageHeader {
  back?: string;
}

export interface XI18nSelect {
  selectAllText?: string;
}

export interface XI18nList {
  selectAllText?: string;
}

export interface XI18nForm {
  required?: string;
}

export const X_I18N = new InjectionToken<XI18nProperty>('x-i18n');
