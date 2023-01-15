import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { XBadgePrefix, XBadgeProperty } from './badge.property';
import { XIsNumber, XIsChange, XIsEmpty, XConfigService, XIsArray, XBadgeAnimation, XBadgeStandaloneAnimation } from '@ng-nest/ui/core';

@Component({
  selector: `${XBadgePrefix}`,
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XBadgeAnimation, XBadgeStandaloneAnimation]
})
export class XBadgeComponent extends XBadgeProperty implements OnInit, OnChanges {
  displayValue: string = '';
  viewInit = false;
  range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+'];
  displayNums: any[] = [];
  maxNums: number[] = [];

  get getOffsetRight() {
    if (this.offset && XIsArray(this.offset) && this.offset.length > 0) {
      return `-${this.offset[0]}`;
    }
    return null;
  }

  get getOffsetTop() {
    if (this.offset && XIsArray(this.offset) && this.offset.length > 1) {
      return this.offset[1];
    }
    return null;
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(simples: SimpleChanges) {
    const { value } = simples;
    XIsChange(value) && this.setDisplayValue();
  }

  ngAfterViewInit() {}

  setClassMap() {
    this.classMap[`${XBadgePrefix}-${this.type}`] = !XIsEmpty(this.type);
  }

  setDisplayValue() {
    let toNumber = Number(this.value);
    if (XIsNumber(toNumber) && this.max && toNumber > this.max) {
      this.displayValue = `${this.max}+`;
    } else {
      this.displayValue = `${this.value}`;
    }
    let res: any = [];
    for (let i = 0; i < this.displayValue.length; i++) {
      let str = this.displayValue[i];
      if (str === '+') {
        res.push(str);
      } else {
        res.push(Number(str));
      }
    }
    this.displayNums = res;
    if (this.displayNums.length != this.maxNums.length) {
      this.maxNums = this.displayNums.map((_x, index) => index) as number[];
    }
  }
}
