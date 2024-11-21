import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { XBadgePrefix, XBadgeProperty } from './badge.property';
import { XIsNumber, XIsEmpty, XBadgeAnimation, XBadgeStandaloneAnimation, XIsString } from '@ng-nest/ui/core';

@Component({
  selector: `${XBadgePrefix}`,
  imports: [NgClass, NgTemplateOutlet],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XBadgeAnimation, XBadgeStandaloneAnimation]
})
export class XBadgeComponent extends XBadgeProperty {
  range = signal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+']);

  valueNumber = computed(() => {
    return Number(this.value());
  });

  classMap = computed(() => ({
    [`${XBadgePrefix}-${this.type()}`]: !XIsEmpty(this.type())
  }));

  displayNums = computed(() => {
    const value = this.value();
    const max = this.max();
    const toNumber = Number(value);
    let displayValue = '';
    if (XIsNumber(toNumber) && max && toNumber > max) {
      displayValue = `${max}+`;
    } else {
      displayValue = `${value}`;
    }
    const res: (string | number)[] = [];
    for (let i = 0; i < displayValue.length; i++) {
      const str = displayValue[i];
      if (str === '+') {
        res.push(str);
      } else {
        res.push(Number(str));
      }
    }
    return res;
  });

  translateYNumbers = computed(() => {
    const displayNums = this.displayNums();
    const nums: number[] = [];
    for (let num of displayNums) {
      if (XIsString(num) && num === '+') {
        nums.push(10 * 100);
      } else if (XIsNumber(num)) {
        nums.push(num * 100);
      }
    }
    return nums;
  });

  maxNums = computed(() => {
    return this.displayNums().map((_x, index) => index) as number[];
  });
}
