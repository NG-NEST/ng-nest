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
import { XDatePickerPortalPrefix, XDatePickerType } from './date-picker.property';
import { XIsEmpty, XConnectAnimation, XCorner } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { XI18nService, XI18nDatePicker } from '@ng-nest/ui/i18n';

@Component({
  selector: `${XDatePickerPortalPrefix}`,
  templateUrl: './date-picker-portal.component.html',
  styleUrls: ['./date-picker-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectAnimation],
  providers: [DatePipe, LowerCasePipe]
})
export class XDatePickerPortalComponent implements OnInit, OnDestroy, AfterViewInit {
  @HostBinding('@x-connect-animation') public placement: XCorner;
  @HostListener('@x-connect-animation.done', ['$event']) done(event: { toState: any }) {
    event.toState === 'void' && this.destroyPortal();
  }

  type: XDatePickerType = 'date';
  display = new Date();
  model: Date;
  startYear: number;
  value: any;
  valueChange: Subject<any>;
  positionChange: Subject<any>;
  closePortal: Function;
  destroyPortal: Function;
  nodeEmit: Function;
  docClickFunction: Function;
  locale: XI18nDatePicker = {};
  private _type: XDatePickerType;
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public datePipe: DatePipe,
    public lowerCasePipe: LowerCasePipe,
    public cdr: ChangeDetectorRef,
    public i18n: XI18nService
  ) {}

  ngOnInit(): void {
    this.valueChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.value = x;
      this.init();
    });
    this.positionChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.placement = x;
      this.cdr.detectChanges();
    });
    setTimeout(
      () =>
        (this.docClickFunction = this.renderer.listen('document', 'click', () => {
          this.closePortal();
        }))
    );
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
    this.docClickFunction && this.docClickFunction();
  }

  init() {
    if (!XIsEmpty(this.value)) {
      this.setDefault();
    } else {
      this.model = this.display;
    }
    this.type = this.type;
    this._type = this.type;
    this.setDisplay(this.model);
    this.cdr.detectChanges();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setDefault() {
    const date = new Date(this.value);
    this.model = date;
  }

  setDisplay(date: Date) {
    this.display = new Date(date.getFullYear(), date.getMonth(), 1);
  }

  dateChange(date: Date) {
    this.setDisplay(date);
    this.model = date;
    this.nodeEmit(date);
  }

  typeChange(type: XDatePickerType) {
    this.type = type;
    this.cdr.detectChanges();
  }

  monthChange(date: Date) {
    this.setDisplay(date);
    if (this._type === 'month') {
      this.model = date;
      this.nodeEmit(date);
    } else {
      this.type = 'date';
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

  yearStartChange(number: number) {
    this.startYear = number;
    this.cdr.detectChanges();
  }

  nextMonth(num: number) {
    let date = new Date(this.display);
    date.setMonth(date.getMonth() + num);
    this.setDisplay(date);
    this.cdr.detectChanges();
  }

  nextYear(num: number) {
    let date = new Date(this.display);
    date.setFullYear(date.getFullYear() + num);
    this.setDisplay(date);
    this.cdr.detectChanges();
  }

  nextYears(num: number) {
    this.startYear += num;
    let date = new Date(this.display);
    date.setFullYear(this.startYear);
    this.setDisplay(date);
    this.cdr.detectChanges();
  }

  getLocaleMonth(date: Date) {
    return (this.locale as any)[this.lowerCasePipe.transform(this.datePipe.transform(date, 'LLLL') as string)];
  }
}
