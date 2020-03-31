import {
  Component,
  OnInit,
  OnChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  ChangeDetectorRef,
  AfterViewInit
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
export class XButtonComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() type?: XButtonType;
  @Input() icon?: string;
  @Input() title: string = '';
  @Input() direction: XDirection = 'row';
  @Input() size: XSize = 'medium';
  @Input('only-icon') @XInputBoolean() onlyIcon: boolean;
  @Input() @XInputBoolean() activated: boolean;
  @Input() @XInputBoolean() disabled: boolean;
  @Input() @XInputBoolean() plain: boolean;
  @Input() @XInputBoolean() round: boolean;
  @Input() @XInputBoolean() circle: boolean;
  @Input() @XInputBoolean() loading: boolean;
  @Input() @XInputBoolean() closable: boolean;
  classMap: XClassMap = {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setClassMap();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (XIsChange(changes.loading)) this.disabled = this.loading;
    XIsChange(changes.disabled, changes.activated) && this.cdr.detectChanges();
  }

  setClassMap() {
    this.classMap[`${XButtonPrefix}-${this.type}`] = this.type && !this.plain;
    this.classMap[`${XButtonPrefix}-${this.type}-plain`] = this.type && this.plain;
    this.classMap[`${XButtonPrefix}-plain`] = !this.type && this.plain;
    this.classMap[`x-size-${this.size}`] = this.size ? true : false;
    this.classMap[`x-direction-${this.direction}`] = this.direction ? true : false;
  }
}
