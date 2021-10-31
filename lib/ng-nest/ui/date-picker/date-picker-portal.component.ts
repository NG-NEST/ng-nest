import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Renderer2,
  OnDestroy,
  AfterViewInit,
  HostBinding,
  HostListener
} from '@angular/core';
import { XDatePickerPortalPrefix, XDatePickerPreset, XDatePickerType } from './date-picker.property';
import { XIsEmpty, XConnectBaseAnimation, XCorner, XPositionTopBottom, XAddDays, XData } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { XI18nService, XI18nDatePicker } from '@ng-nest/ui/i18n';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: `${XDatePickerPortalPrefix}`,
  templateUrl: './date-picker-portal.component.html',
  styleUrls: ['./date-picker-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation],
  providers: [DatePipe, LowerCasePipe]
})
export class XDatePickerPortalComponent implements OnInit, OnDestroy, AfterViewInit {
  @HostBinding('@x-connect-base-animation') public placement!: XPositionTopBottom;
  @HostListener('@x-connect-base-animation.done', ['$event']) done(event: { toState: any }) {
    this.animating(false);
    event.toState === 'void' && this.destroyPortal();
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start(event: { toState: any }) {
    this.animating(true);
  }

  type: XDatePickerType = 'date';
  display = new Date();
  model!: Date;
  value: any;
  valueChange!: Subject<any>;
  positionChange!: Subject<any>;
  animating!: Function;
  closePortal!: Function;
  destroyPortal!: Function;
  nodeEmit!: (date: Date, sure?: boolean) => void;
  locale: XI18nDatePicker = {};
  time!: number;
  preset: XDatePickerPreset[] = [];
  inputCom!: XInputComponent;
  private _type!: XDatePickerType;
  private _unSubject = new Subject<void>();

  constructor(public datePipe: DatePipe, public lowerCasePipe: LowerCasePipe, public cdr: ChangeDetectorRef, public i18n: XI18nService) {}

  ngOnInit(): void {
    this.valueChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.value = x;
      this.init();
    });
    this.positionChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.placement = x;
      this.cdr.detectChanges();
    });
    this.i18n.localeChange
      .pipe(
        map((x) => x.datePicker as XI18nDatePicker),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
  }

  ngAfterViewInit() {
    this.init();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  init() {
    if (!XIsEmpty(this.value)) {
      this.setDefault();
    }
    this._type = this.type;
    this.cdr.detectChanges();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setDefault() {
    const date = new Date(this.value);
    this.model = date;
    this.time = this.model.getTime();
    this.setDisplay(this.model);
  }

  setDisplay(date: Date) {
    this.display = new Date(date.getFullYear(), date.getMonth(), 1);
  }

  dateChange(date: Date) {
    this.setDisplay(date);
    this.model = date;
    if (this.time) this.setModelTime(this.model, new Date(this.time));
    if (['date-time', 'date-hour', 'date-minute'].includes(this._type)) {
      this.nodeEmit(this.model, false);
    } else {
      this.nodeEmit(this.model);
    }
  }

  monthChange(date: Date) {
    this.setDisplay(date);
    if (this._type === 'month') {
      this.model = date;
      this.nodeEmit(date);
    } else {
      this.type = this._type;
    }
    this.cdr.detectChanges();
  }

  yearChange(date: Date) {
    this.setDisplay(date);
    if (this._type === 'year') {
      this.model = date;
      this.nodeEmit(date);
    } else {
      this.type = 'month';
    }
    this.cdr.detectChanges();
  }

  onToday() {
    this.dateChange(new Date());
  }

  onYesterday() {
    this.dateChange(XAddDays(new Date(), -1));
  }

  onTomorrow() {
    this.dateChange(XAddDays(new Date(), 1));
  }

  onPresetFunc(item: XDatePickerPreset) {
    this.dateChange(item.func());
  }

  selectTime(time: Date) {
    this.time = time.getTime();
    this.nodeEmit(this.setModelTime(this.model, time), false);
    this.cdr.detectChanges();
  }

  setModelTime(date: Date, time: Date) {
    this.model = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
    return this.model;
  }
}
