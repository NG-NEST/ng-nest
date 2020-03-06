import { XIsDate, XIsString, XIsNumber } from '../interfaces';

export type XDate = string | Date | number;

export function XToDate(date: XDate): Date {
  if (XIsDate(date) || XIsNumber(date)) {
    return new Date(date);
  } else if (XIsString(date)) {
    return new Date(Date.parse(date as string));
  }
}

export function XAddSeconds(date: XDate, amount: number): Date {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf()) && amount) {
    dt.setSeconds(dt.getSeconds() + amount);
    return dt;
  } else {
    return date as Date;
  }
}

export function XAddMinutes(date: XDate, amount: number): Date {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf()) && amount) {
    dt.setMinutes(dt.getMinutes() + amount);
    return dt;
  } else {
    return date as Date;
  }
}

export function XAddHours(date: XDate, amount: number): Date {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf()) && amount) {
    dt.setHours(dt.getHours() + amount);
    return dt;
  } else {
    return date as Date;
  }
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
    dt.setMonth(dt.getMonth() + amount);
    return dt;
  } else {
    return date as Date;
  }
}

export function XAddYears(date: XDate, amount: number): Date {
  let dt = XToDate(date);
  if (!isNaN(dt.valueOf()) && amount) {
    dt.setFullYear(dt.getFullYear() + amount);
    return dt;
  } else {
    return date as Date;
  }
}
