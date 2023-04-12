import { XIsDate, XIsNumber } from '../interfaces';

export type XDate = string | Date | number;

export function XToDate(date: XDate): Date {
  if (XIsDate(date) || XIsNumber(date)) {
    return new Date(date);
  } else {
    return new Date(Date.parse(date as string));
  }
}

export function XAddMilliseconds(date: XDate, amount: number): Date {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf()) && amount) {
    return new Date(dt.getTime() + amount);
  } else {
    return date as Date;
  }
}

export function XAddSeconds(date: XDate, amount: number): Date {
  return XAddMilliseconds(date, amount * 1000);
}

export function XAddMinutes(date: XDate, amount: number): Date {
  return XAddMilliseconds(date, amount * 60000);
}

export function XAddHours(date: XDate, amount: number): Date {
  return XAddMilliseconds(date, amount * 3600000);
}

export function XAddDays(date: XDate, amount: number): Date {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf()) && amount) {
    dt.setDate(dt.getDate() + amount);
    return dt;
  } else {
    return date as Date;
  }
}

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

export function XAddYears(date: XDate, amount: number): Date {
  return XAddMonths(date, amount * 12);
}

export function XDateWeek(date: XDate) {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf())) {
    return getISOWeek(dt);
  }
  return;
}

export function XDateWeekYear(date: XDate) {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf())) {
    return getISOWeekYear(dt);
  }
  return;
}

export function XDateYearWeek(date: XDate) {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf())) {
    return `${getISOWeekYear(dt)}-${getISOWeek(dt)}`;
  }
  return;
}

export function XDateYearQuarter(date: XDate) {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf())) {
    return `${dt.getFullYear()}-${XDateQuarter(dt)}`;
  }
  return;
}

export function XDateQuarter(date: XDate) {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf())) {
    return `Q${Math.ceil((dt.getMonth() + 1) / 3)}`;
  }
  return;
}

function getISOWeek(date: Date): number {
  const diff = startOfISOWeek(date).getTime() - startOfISOWeekYear(date).getTime();
  return Math.round(diff / 604800000) + 1;
}

function startOfISOWeek(date: Date) {
  return startOfWeek(date, { weekStartsOn: 1 });
}

function startOfWeek(date: Date, options?: { weekStartsOn: number }) {
  const weekStartsOn = options?.weekStartsOn || 0;
  const day = date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function startOfISOWeekYear(date: Date) {
  const year = getISOWeekYear(date);
  const fourthOfJanuary = constructFrom(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  const result = startOfISOWeek(fourthOfJanuary);
  return result;
}

function constructFrom<DateType extends Date>(date: DateType | number, value: Date | number): DateType {
  if (date instanceof Date) {
    return new (date.constructor as any)(value);
  } else {
    return new Date(value) as DateType;
  }
}

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
