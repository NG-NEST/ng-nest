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
