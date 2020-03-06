import { Pipe, PipeTransform } from '@angular/core';

export const timeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1] // million seconds
];

@Pipe({ name: 'xTimeRange' })
export class XTimeRangePipe implements PipeTransform {
  transform(value: string | number, format: string = 'HH:mm:ss'): string {
    let duration = Number(value || 0);

    return timeUnits.reduce((current, [name, unit]) => {
      if (current.indexOf(name) !== -1) {
        const v = Math.floor(duration / unit);
        duration -= v * unit;
        return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
          return this.padStart(v.toString(), match.length, '0');
        });
      }
      return current;
    }, format);
  }

  padStart(toPad: string, length: number, element: string): string {
    if (toPad.length > length) {
      return toPad;
    }

    const joined = `${this.getRepeatedElement(length, element)}${toPad}`;
    return joined.slice(joined.length - length, joined.length);
  }

  getRepeatedElement(length: number, element: string): string {
    return Array(length)
      .fill(element)
      .join('');
  }
}
