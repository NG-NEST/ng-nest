import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { XBadgePrefix, XBadgeType } from './badge.type';
import { XInputBoolean, XInputNumber, XIsNumber, XIsChange, XClassMap } from '@ng-nest/ui/core';

@Component({
  selector: `${XBadgePrefix}`,
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XBadgeComponent implements OnInit, OnChanges {
  @Input() type?: XBadgeType;
  @Input() @XInputNumber() max?: number;
  @Input() value?: number | string;
  @Input() @XInputBoolean() dot?: boolean;
  @ViewChild('badge', { static: true }) badge: ElementRef;
  displayValue;
  classMap: XClassMap = {};

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.value) && this.setDisplayValue();
  }

  setClassMap() {
    this.classMap[`${XBadgePrefix}-${this.type}`] = this.type ? true : false;
  }

  setDisplayValue() {
    let toNumber = Number(this.value);
    if (XIsNumber(toNumber) && this.max && toNumber > this.max) {
      this.displayValue = `${this.max}+`;
    } else {
      this.displayValue = `${this.value}`;
    }
  }
}
