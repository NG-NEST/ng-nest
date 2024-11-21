import { Pipe, PipeTransform, inject } from '@angular/core';
import { XToDate } from '@ng-nest/ui/core';
import { DatePipe } from '@angular/common';
import { XTimeAgoPrefix } from './time-ago.property';
import { XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Pipe({ name: `${XTimeAgoPrefix}` })
export class XTimeAgoPipe extends DatePipe implements PipeTransform {
  private i18n = inject(XI18nService);
  private catchContent: any;

  localeI18n = toSignal(this.i18n.localeChange.pipe(map((x) => x.timeAgo)), { initialValue: zh_CN.timeAgo });

  override transform(input?: any): any {
    if (!input) return '';
    const date = XToDate(input);
    if (isNaN(date.valueOf())) {
      return input as string;
    }
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
      result = super.transform(time, 'yyyy-MM-dd') as string;
    } else if (dayDiff >= 1) {
      result = super.transform(time, 'MM-dd HH:mm') as string;
    } else if (hourDiff >= 1) {
      result = `${Math.floor(hourDiff)}${this.localeI18n()?.hoursAgo}`;
    } else if (minDiff >= 1) {
      result = `${Math.floor(minDiff)}${this.localeI18n()?.minutesAgo}`;
    } else if (secondDiff >= 1) {
      result = `${Math.floor(secondDiff)}${this.localeI18n()?.secondsAgo}`;
    } else result = this.localeI18n()?.just as string;
    return result;
  }
}
