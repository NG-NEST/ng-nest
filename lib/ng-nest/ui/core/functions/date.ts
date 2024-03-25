import { XIsDate, XIsNumber } from '../interfaces';

/**
 * @zh_CN 日期类型
 * @en_US Date type
 */
export type XDate = string | Date | number;

/**
 * @zh_CN 转换 Date
 * @en_US Convert to date
 */
export function XToDate(date: XDate): Date {
  if (XIsDate(date) || XIsNumber(date)) {
    return new Date(date);
  } else {
    return new Date(Date.parse(date as string));
  }
}

/**
 * @zh_CN 日期添加毫秒数，负数为减少
 * @en_US Add milliseconds to the date, the negative number is reduced
 */
export function XAddMilliseconds(date: XDate, amount: number): Date {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf()) && amount) {
    return new Date(dt.getTime() + amount);
  } else {
    return date as Date;
  }
}

/**
 * @zh_CN 日期添加秒数，负数为减少
 * @en_US Date adds seconds, the negative number is reduced
 */
export function XAddSeconds(date: XDate, amount: number): Date {
  return XAddMilliseconds(date, amount * 1000);
}

/**
 * @zh_CN 日期添加分钟数，负数为减少
 * @en_US Date adds minutes, the negative number is reduced
 */
export function XAddMinutes(date: XDate, amount: number): Date {
  return XAddMilliseconds(date, amount * 60000);
}

/**
 * @zh_CN 日期添加小时数，负数为减少
 * @en_US Date adds hours, the negative number is reduced
 */
export function XAddHours(date: XDate, amount: number): Date {
  return XAddMilliseconds(date, amount * 3600000);
}

/**
 * @zh_CN 日期添加天数，负数为减少
 * @en_US Date adds days, the negative number is reduced
 */
export function XAddDays(date: XDate, amount: number): Date {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf()) && amount) {
    dt.setDate(dt.getDate() + amount);
    return dt;
  } else {
    return date as Date;
  }
}

/**
 * @zh_CN 日期添加月数，负数为减少
 * @en_US Date adds monthly number, negative number is reduced
 */
export function XAddMonths(date: XDate, amount: number): Date {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf()) && amount) {
    const day = dt.getDate();
    const month = dt.getMonth();
    const endMonth = new Date(dt);
    endMonth.setMonth(month + amount + 1, 0);
    const endDay = endMonth.getDate();
    if (day >= endDay) {
      return endMonth;
    } else {
      dt.setFullYear(endMonth.getFullYear(), endMonth.getMonth(), day);
    }
    return dt;
  } else {
    return date as Date;
  }
}

/**
 * @zh_CN 日期添加年数，负数为减少
 * @en_US The number of years of date, the negative number is reduced
 */
export function XAddYears(date: XDate, amount: number): Date {
  return XAddMonths(date, amount * 12);
}

/**
 * @zh_CN 获取给定日期的 ISO 周数
 * @en_US Get the number of ISO weeks of the given date
 */
export function XDateWeek(date: XDate): number | undefined {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf())) {
    return getISOWeek(dt);
  }
  return;
}

/**
 * @zh_CN 获取指定日期的 ISO 周年份
 * @en_US Get the ISO anniversary of the specified date
 */
export function XDateWeekYear(date: XDate): number | undefined {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf())) {
    return getISOWeekYear(dt);
  }
  return;
}

/**
 * @zh_CN 获取指定日期的年份和周数
 * @en_US Get the year and week of the specified date
 */
export function XDateYearWeek(date: XDate): string {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf())) {
    return `${getISOWeekYear(dt)}-${getISOWeek(dt)}`;
  }
  return '';
}

/**
 * @zh_CN 获取指定日期的年份和季度
 * @en_US Get the year and quarter of the specified date
 */
export function XDateYearQuarter(date: XDate): string {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf())) {
    return `${dt.getFullYear()}-${XDateQuarter(dt)}`;
  }
  return '';
}

/**
 * @zh_CN 获取指定日期所属的季度
 * @en_US Get the season when the specified date belongs
 */
export function XDateQuarter(date: XDate): string {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf())) {
    return `Q${Math.ceil((dt.getMonth() + 1) / 3)}`;
  }
  return '';
}

/**
 * @zh_CN 获取给定日期的 ISO 周数
 * @en_US Get the number of ISO weeks of the given date
 */
function getISOWeek(date: Date): number {
  const diff = startOfISOWeek(date).getTime() - startOfISOWeekYear(date).getTime();
  return Math.round(diff / 604800000) + 1;
}

/**
 * @zh_CN 获取给定日期所在 ISO 周的开始日期
 * @en_US The start date of the ISO week where the given date is located
 */
function startOfISOWeek(date: Date) {
  return startOfWeek(date, { weekStartsOn: 1 });
}

/**
 * @zh_CN 获取给定日期所在周的开始日期
 * @en_US The start date of the ISO week where the given date is located
 */
function startOfWeek(date: Date, options?: { weekStartsOn: number }) {
  const weekStartsOn = options?.weekStartsOn || 0;
  const day = date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @zh_CN 获取给定日期所在 ISO 周年的起始日期
 * @en_US The start date of the ISO anniversary where the given date is located
 */
function startOfISOWeekYear(date: Date) {
  const year = getISOWeekYear(date);
  const fourthOfJanuary = constructFrom(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  const result = startOfISOWeek(fourthOfJanuary);
  return result;
}

/**
 * @zh_CN 返回一个与传入的 date 参数类型相同的对象
 * @en_US Return to an object of the same type of Date parameter.
 */
function constructFrom<T extends Date>(date: T | number, value: Date | number): T {
  if (date instanceof Date) {
    return new (date.constructor as any)(value);
  } else {
    return new Date(value) as T;
  }
}

/**
 * @zh_CN 获取给定日期的 ISO 周年份
 * @en_US Obtain the ISO anniversary of the given date
 */
function getISOWeekYear(date: Date): number {
  const year = date.getFullYear();

  const fourthOfJanuaryOfNextYear = constructFrom(date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);

  const fourthOfJanuaryOfThisYear = constructFrom(date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
