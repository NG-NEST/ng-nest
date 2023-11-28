import { Pipe, PipeTransform } from '@angular/core';
import { XDate, XDateQuarter, XDateYearQuarter } from '@ng-nest/ui/core';
import { XDateQuarterPrefix } from './date-picker.property';

@Pipe({ name: `${XDateQuarterPrefix}`, standalone: true })
export class XDateQuarterPipe implements PipeTransform {
  constructor() {}
  transform(input?: XDate, includeYear = false): string {
    if (!input) return '';
    return !includeYear ? XDateQuarter(input)! : XDateYearQuarter(input)!;
  }
}
