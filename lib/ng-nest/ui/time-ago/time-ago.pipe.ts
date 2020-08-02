import { Pipe, PipeTransform } from '@angular/core';
import { XToDate, XDate } from '@ng-nest/ui/core';
import { DatePipe } from '@angular/common';
import { XTimeAgoPrefix } from './time-ago.property';
import { XI18nService, XI18nTimeAgo } from '@ng-nest/ui/i18n';

@Pipe({ name: `${XTimeAgoPrefix}`, pure: false })
export class XTimeAgoPipe implements PipeTransform {
  locale: XI18nTimeAgo = {};
  private catchContent: any;
  constructor(private datePipe: DatePipe, private i18n: XI18nService) {}
  transform(input: XDate): string {
    const date = XToDate(input);
    if (isNaN(date.valueOf())) {
      return input as string;
    }
    this.locale = this.i18n.getLocale().timeAgo as XI18nTimeAgo;
    const content = this.getDiff(date);
    if (this.catchContent !== content) {
      this.catchContent = content;
    }
    return this.catchContent;
  }

  getDiff(date: Date): string {
    const time = date.getTime();
    const second = 1000;
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const now = new Date();
    const diffValue = now.getTime() - time;
    if (diffValue < 0) {
      return '';
    }
    const dayDiff = diffValue / day;
    const hourDiff = diffValue / hour;
    const minDiff = diffValue / minute;
    const secondDiff = diffValue / second;
    let result = '';
    if (date.getFullYear() !== now.getFullYear()) {
      result = this.datePipe.transform(time, 'yyyy-MM-dd') as string;
    } else if (dayDiff >= 1) {
      result = this.datePipe.transform(time, 'MM-dd HH:mm') as string;
    } else if (hourDiff >= 1) {
      result = `${Math.floor(hourDiff)}${this.locale.hoursAgo}`;
    } else if (minDiff >= 1) {
      result = `${Math.floor(minDiff)}${this.locale.minutesAgo}`;
    } else if (secondDiff >= 1) {
      result = `${Math.floor(secondDiff)}${this.locale.secondsAgo}`;
    } else result = this.locale.just as string;
    return result;
  }
}
