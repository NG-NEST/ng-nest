import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { XAlertPrefix, XAlertType } from './alert.type';
import {
  XClassMap,
  XTemplate,
  XInputBoolean,
  XEffect,
  XFadeAnimation,
  XInputNumber
} from '@ng-nest/ui/core';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: `${XAlertPrefix}`,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XFadeAnimation]
})
export class XAlertComponent implements OnInit, OnDestroy {
  @Input() title?: XTemplate;
  @Input() content?: XTemplate;
  @Input() type?: XAlertType = 'info';
  @Input() effect?: XEffect = 'light';
  @Input() @XInputBoolean() hide?: boolean = false;
  @Input('hide-close') @XInputBoolean() hideClose?: boolean;
  @Input('close-text') closeText?: string;
  @Input('show-icon') @XInputBoolean() showIcon?: boolean;
  @Input('disabled-animation') @XInputBoolean() disabledAnimation: boolean = false;
  @Input() @XInputBoolean() manual?: boolean;
  @Input() @XInputNumber() duration: number = 0;
  @Output() close = new EventEmitter();
  classMap: XClassMap = {};
  close$: Subscription | null = null;

  constructor(public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
    this.setDuration();
  }

  ngOnDestroy() {
    this.close$ && this.close$.unsubscribe();
  }

  setClassMap() {
    this.classMap[`${XAlertPrefix}-${this.type}`] = this.type ? true : false;
    this.classMap[`x-${this.effect}`] = this.effect ? true : false;
    this.classMap[`${XAlertPrefix}-icon-medium`] = this.title && this.content && this.showIcon;
  }

  setDuration() {
    if (this.duration) {
      this.close$ = of(true)
        .pipe(delay(this.duration))
        .subscribe(() => this.onClose());
    }
  }

  onClose() {
    if (this.manual) {
      this.close.emit();
    } else {
      this.hide = true;
      this.cdr.detectChanges();
    }
  }

  onCloseAnimationDone() {
    if (this.hide) {
      this.close.emit();
    }
  }
}
