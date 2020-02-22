import { Pipe, PipeTransform } from "@angular/core";
import { XToDate, XDate } from "@ng-nest/ui/core";
import { DatePipe } from "@angular/common";

@Pipe({ name: "XTimeAgo" })
export class XTimeAgoPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(input: XDate): string {
    const date = XToDate(input);
    if (isNaN(date.valueOf())) {
      return input as string;
    }
    return this.getDiff(date);
  }

  getDiff(date: Date) {
    const time = date.getTime();
    const second = 1000;
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const now = new Date();
    const diffValue = now.getTime() - time;
    if (diffValue < 0) {
      return;
    }
    const dayDiff = diffValue / day;
    const hourDiff = diffValue / hour;
    const minDiff = diffValue / minute;
    const secondDiff = diffValue / second;
    let result = "";
    if (date.getFullYear() !== now.getFullYear()) {
      result = this.datePipe.transform(time, "yyyy-MM-dd");
    } else if (dayDiff >= 1) {
      result = this.datePipe.transform(time, "MM-dd HH:mm");
    } else if (hourDiff >= 1) {
      result = `${Math.floor(hourDiff)}小时前`;
    } else if (minDiff >= 1) {
      result = `${Math.floor(minDiff)}分钟前`;
    } else if (secondDiff >= 1) {
      result = `${Math.floor(secondDiff)}秒前`;
    } else result = "刚刚";
    return result;
  }
}
