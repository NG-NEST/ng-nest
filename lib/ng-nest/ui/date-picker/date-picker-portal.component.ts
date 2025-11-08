import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  AfterViewInit,
  HostBinding,
  HostListener,
  inject,
  input,
  output,
  viewChild,
  computed,
  signal,
  model,
  DestroyRef
} from '@angular/core';
import {
  XDatePickerDisabledDate,
  XDatePickerDisabledTime,
  XDatePickerPortalPrefix,
  XDatePickerPreset,
  XDatePickerType
} from './date-picker.property';
import { XIsEmpty, XPositionTopBottom, XAddDays, XTemplate, XIsUndefined } from '@ng-nest/ui/core';
import { map } from 'rxjs/operators';
import { DatePipe, LowerCasePipe, NgTemplateOutlet } from '@angular/common';
import { XI18nService, XI18nDatePicker, zh_CN } from '@ng-nest/ui/i18n';
import { XInputComponent } from '@ng-nest/ui/input';
import { XTimePickerFrameComponent, XTimePickerModule } from '@ng-nest/ui/time-picker';
import { XPickerDateComponent } from './picker-date.component';
import { XPickerMonthComponent } from './picker-month.component';
import { XPickerQuarterComponent } from './picker-quarter.component';
import { XPickerYearComponent } from './picker-year.component';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XDatePickerPortalPrefix}`,
  imports: [
    NgTemplateOutlet,
    DatePipe,
    XPickerDateComponent,
    XPickerMonthComponent,
    XPickerQuarterComponent,
    XPickerYearComponent,
    XTimePickerModule,
    XButtonComponent,
    XLinkComponent,
    XOutletDirective
  ],
  templateUrl: './date-picker-portal.component.html',
  styleUrls: ['./date-picker-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, LowerCasePipe]
})
export class XDatePickerPortalComponent implements AfterViewInit {
  @HostBinding('animate.enter') animateEnter = 'x-connect-enter';
  @HostBinding('animate.leave') animateLeave = 'x-connect-leave';

  @HostListener('animationend') done() {
    if (this.destroy()) return;
    this.animating.emit(false);
  }
  @HostListener('animationstart') start() {
    if (this.destroy()) return;
    this.animating.emit(true);
  }

  private i18n = inject(XI18nService);
  private _type = signal<XDatePickerType>('date');
  destroy = signal(false);
  private destroyRef = inject(DestroyRef);

  timePickerFrame = viewChild('timePickerFrame', { read: XTimePickerFrameComponent });
  value = input<any>();
  type = model<XDatePickerType>('date');
  preset = input<XDatePickerPreset[]>([]);
  extraFooter = input<XTemplate>();
  placement = input<XPositionTopBottom>();
  inputCom = input<XInputComponent>();
  disabledDate = input<XDatePickerDisabledDate>();
  disabledTime = input<XDatePickerDisabledTime>();

  animating = output<boolean>();
  nodeClick = output<{ date: Date; sure?: boolean }>();

  display = signal(new Date());
  model = signal<Date | null>(null);
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.datePicker as XI18nDatePicker)), {
    initialValue: zh_CN.datePicker
  });
  time = signal<number | null>(null);

  isDatePicker = computed(() => {
    return ['date', 'month', 'year'].includes(this.type());
  });

  sureDisabled = computed(() => {
    let res = XIsUndefined(this.time());
    let timePickerFrame = this.timePickerFrame();
    if (timePickerFrame && !XIsUndefined(this.time())) {
      const dt = new Date(this.time()!);
      const hours = dt.getHours();
      const minutes = dt.getMinutes();
      const seconds = dt.getSeconds();
      return (
        timePickerFrame.setDisabled('hours', hours) ||
        timePickerFrame.setDisabled('minutes', minutes) ||
        timePickerFrame.setDisabled('seconds', seconds)
      );
    }
    return res;
  });

  ngOnInit() {
    this.destroyRef.onDestroy(() => {
      this.destroy.set(true);
    });
  }

  ngAfterViewInit() {
    this.init();
  }

  init() {
    if (!XIsEmpty(this.value())) {
      this.setDefault();
    }
    this._type.set(this.type());
  }

  setDefault() {
    const date = new Date(this.value());
    this.model.set(date);
    this.time.set(this.model()!.getTime());
    this.setDisplay(this.model()!);
  }

  setDisplay(date: Date) {
    this.display.set(new Date(date.getFullYear(), date.getMonth(), 1));
  }

  dateChange(date: Date) {
    this.setDisplay(date);
    this.model.set(date);
    if (['date-time', 'date-hour', 'date-minute'].includes(this._type())) {
      let time = new Date();
      if (['date-hour', 'date-minute'].includes(this.type())) {
        time.setSeconds(0);
      }
      if (this.type() === 'date-hour') {
        time.setMinutes(0);
      }
      if (!this.time()) {
        this.time.set(time.getTime());
      }
      this.setModelTime(this.model()!, new Date(this.time()!));
      this.nodeClick.emit({ date: this.model()!, sure: false });
    } else {
      this.nodeClick.emit({ date: this.model()!, sure: true });
    }
  }

  monthChange(date: Date) {
    this.setDisplay(date);
    if (this._type() === 'month') {
      this.model.set(date);
      this.nodeClick.emit({ date, sure: true });
    } else {
      this.type.set(this._type()!);
    }
  }

  quarterChange(date: Date) {
    this.setDisplay(date);
    if (this._type() === 'quarter') {
      this.model.set(date);
      this.nodeClick.emit({ date, sure: true });
    } else {
      this.type.set(this._type());
    }
  }

  yearChange(date: Date) {
    this.setDisplay(date);
    if (this._type() === 'year') {
      this.model.set(date);
      this.nodeClick.emit({ date, sure: true });
    } else {
      this.type.set('month');
    }
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
    if (!this.model()) {
      this.model.set(new Date());
    }
    this.time.set(time.getTime());
    this.nodeClick.emit({ date: this.setModelTime(this.model()!, time), sure: false });
  }

  setModelTime(date: Date, time: Date) {
    this.model.set(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
      )
    );
    return this.model()!;
  }
}
