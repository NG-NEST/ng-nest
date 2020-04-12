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
import { XIsNumber, XIsChange, XIsEmpty } from '@ng-nest/ui/core';

@Component({
  selector: `${XBadgePrefix}`,
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XBadgeComponent extends XBadgeProperty implements OnInit, OnChanges {
  displayValue: string = '';

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.value) && this.setDisplayValue();
  }

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
  }
}
