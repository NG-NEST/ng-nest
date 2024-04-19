import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { XBadgePrefix, XBadgeProperty } from './badge.property';
import { XIsNumber, XIsEmpty, XBadgeAnimation, XBadgeStandaloneAnimation } from '@ng-nest/ui/core';

@Component({
  selector: `${XBadgePrefix}`,
  standalone: true,
  imports: [NgClass, NgTemplateOutlet],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XBadgeAnimation, XBadgeStandaloneAnimation]
})
export class XBadgeComponent extends XBadgeProperty {
  displayValue: string = '';
  viewInit = false;
  range = signal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+']);
  displayNums = signal<(string | number)[]>([]);
  maxNums: number[] = [];

  valueNumber = computed(() => {
    return Number(this.value());
  });

  classMapSignal = computed(() => ({
    [`${XBadgePrefix}-${this.type()}`]: !XIsEmpty(this.type())
  }));

  setDisplayValue() {
    let toNumber = Number(this.value);
    if (XIsNumber(toNumber) && this.max && toNumber > Number(this.max)) {
      this.displayValue = `${this.max}+`;
    } else {
      this.displayValue = `${this.value}`;
    }
    let res: (string | number)[] = [];
    for (let i = 0; i < this.displayValue.length; i++) {
      let str = this.displayValue[i];
      if (str === '+') {
        res.push(str);
      } else {
        res.push(Number(str));
      }
    }
    this.displayNums.set(res);
    if (this.displayNums().length != this.maxNums.length) {
      this.maxNums = this.displayNums().map((_x, index) => index) as number[];
    }
  }
}
