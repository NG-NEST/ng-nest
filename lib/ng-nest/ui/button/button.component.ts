import {
  Component,
  OnInit,
  OnChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Input,
  ViewChild,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { XButtonPrefix, XButtonType } from './button.type';
import { XDirection, XSize, XInputBoolean, XClassMap, XIsChange } from '@ng-nest/ui/core';

@Component({
  selector: `${XButtonPrefix}`,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XButtonComponent implements OnInit, OnChanges {
  @Input() type?: XButtonType;
  @Input() icon?: string;
  @Input() title?: string = '';
  @Input() direction?: XDirection;
  @Input() size?: XSize;
  @Input() @XInputBoolean() onlyIcon?: boolean;
  @Input() @XInputBoolean() activated?: boolean;
  @Input() @XInputBoolean() disabled?: boolean;
  @Input() @XInputBoolean() plain?: boolean;
  @Input() @XInputBoolean() round?: boolean;
  @Input() @XInputBoolean() circle?: boolean;
  @Input() @XInputBoolean() loading?: boolean;
  @Input() @XInputBoolean() closable?: boolean;
  @ViewChild('button', { static: true }) button: ElementRef;
  @ViewChild('content', { static: true }) content: ElementRef;
  classMap: XClassMap = {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (XIsChange(changes.loading)) this.disabled = this.loading;
    XIsChange(changes.disabled, changes.activated) && this.cdr.markForCheck();
  }

  setClassMap() {
    this.classMap[`${XButtonPrefix}-${this.type}`] = this.type && !this.plain;
    this.classMap[`${XButtonPrefix}-${this.type}-plain`] = this.type && this.plain;
    this.classMap[`${XButtonPrefix}-plain`] = !this.type && this.plain;
    this.classMap[`${XButtonPrefix}-${this.size}`] = this.size ? true : false;
    this.classMap[`x-flex-direction-${this.direction}`] = this.direction ? true : false;
  }
}
