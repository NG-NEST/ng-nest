import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { XTimePickerFramePrefix, XTimePickerType } from './time-picker.property';
import { reqAnimFrame, XBoolean, XIdentity, XIsChange, XIsEmpty } from '@ng-nest/ui/core';
import { XI18nService, XI18nTimePicker } from '@ng-nest/ui/i18n';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: `${XTimePickerFramePrefix}`,
  templateUrl: './time-picker-frame.component.html',
  styleUrls: ['./time-picker-frame.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTimePickerFrameComponent {
  @Input() type: XTimePickerType = 'time';
  @Input() value!: number;
  @Input() use12Hours!: XBoolean;
  @Input() hourStep = 1;
  @Input() minuteStep = 1;
  @Input() secondStep = 1;
  @Output() nodeEmit = new EventEmitter<Date>();
  @ViewChild('hourRef') hourRef?: ElementRef<HTMLElement>;
  @ViewChild('minuteRef') minuteRef?: ElementRef<HTMLElement>;
  @ViewChild('secondRef') secondRef?: ElementRef<HTMLElement>;
  @ViewChild('use12HoursRef') use12HoursRef?: ElementRef<HTMLElement>;
  model!: Date;
  now = new Date();
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  use12Hour: string = 'am';
  scrollAnimating: { [key: string]: boolean } = {};
  hourData: XIdentity[] = [];
  minuteData: XIdentity[] = [];
  secondData: XIdentity[] = [];
  use12HoursData: XIdentity[] = [];
  locale: XI18nTimePicker = {};
  private _unSubject = new Subject<void>();

  ngOnChanges(changes: SimpleChanges): void {
    const { value } = changes;
    if (XIsChange(value)) {
      this.init();
      this.setScrollTop();
    }
  }

  ngOnInit() {
    this.setHourData();
    this.setMinuteData();
    this.setSecondData();
    this.setUse12HoursData();
    this.init();
    this.i18n.localeChange
      .pipe(
        map((x) => x.timePicker as XI18nTimePicker),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        if (this.use12Hours) {
          this.setUse12HoursData();
        }
        this.cdr.markForCheck();
      });
  }

  ngAfterViewInit() {
    this.setScrollTop();
  }

  constructor(private cdr: ChangeDetectorRef, private i18n: XI18nService) {}

  setHourData() {
    let length = this.use12Hours ? 12 : 24;
    this.hourData = Array.from({ length: Math.ceil(length / this.hourStep) }).map((_, i) => {
      if (this.use12Hours && i === 0) {
        i = 12;
        return {
          label: this.prefixZero(i, 2),
          id: i
        };
      } else {
        return {
          label: this.prefixZero(i * this.hourStep, 2),
          id: i * this.hourStep
        };
      }
    });
  }

  setMinuteData() {
    this.minuteData = Array.from({ length: Math.ceil(60 / this.minuteStep) }).map((_, i) => {
      return {
        label: this.prefixZero(i * this.minuteStep, 2),
        id: i * this.minuteStep
      };
    });
  }

  setSecondData() {
    this.secondData = Array.from({ length: Math.ceil(60 / this.secondStep) }).map((_, i) => {
      return {
        label: this.prefixZero(i * this.secondStep, 2),
        id: i * this.secondStep
      };
    });
  }

  setUse12HoursData() {
    this.use12HoursData = [
      {
        id: 'am',
        label: this.locale.am
      },
      {
        id: 'pm',
        label: this.locale.pm
      }
    ];
  }

  init() {
    if (!XIsEmpty(this.value)) {
      this.setDefault();
    } else {
      const def = new Date('1970-01-01');
      this.model = new Date(
        def.getFullYear(),
        def.getMonth(),
        def.getDate(),
        this.now.getHours(),
        this.now.getMinutes(),
        this.now.getSeconds()
      );
    }
    this.setTime(this.model);
    this.cdr.detectChanges();
  }

  setDefault() {
    this.model = new Date(this.value);
  }

  setTime(date: Date) {
    if (this.use12Hours) {
      let hour = date.getHours();
      if (hour > 12) {
        this.hour = hour - 12;
        this.use12Hour = 'pm';
      } else if (hour === 12) {
        this.hour = 12;
        this.use12Hour = 'pm';
      } else {
        this.hour = hour === 0 ? 12 : hour;
        this.use12Hour = 'am';
      }
    } else {
      this.hour = date.getHours();
    }
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
  }

  prefixZero(num: number, n: number) {
    return (Array(n).join('0') + num).slice(-n);
  }

  setScrollTop(animating = false) {
    this.selected('hour', this.hourRef?.nativeElement, this.hour, animating);
    this.selected('minute', this.minuteRef?.nativeElement, this.minute, animating);
    this.selected('second', this.secondRef?.nativeElement, this.second, animating);
    this.selected('use12Hour', this.use12HoursRef?.nativeElement, this.use12Hour, animating);
  }

  selected(type: 'hour' | 'minute' | 'second' | 'use12Hour', ele?: HTMLElement, num?: number | string, animating = false) {
    if (!ele) return;
    if (this.scrollAnimating[ele.className]) return;
    let len = Number(num);
    switch (type) {
      case 'hour':
        len = this.hourData.findIndex((x) => x.id === num);
        break;
      case 'minute':
        len = this.minuteData.findIndex((x) => x.id === num);
        break;
      case 'second':
        len = this.secondData.findIndex((x) => x.id === num);
        break;
      case 'use12Hour':
        len = this.use12HoursData.findIndex((x) => x.id === num);
        break;
    }
    let current = ele.querySelector(`.x-list x-list-option:nth-child(${len + 1})`) as HTMLElement;
    if (current) {
      if (animating) {
        this.scrollTo(ele, current.offsetTop, 120);
      } else {
        ele.scrollTop = current.offsetTop;
      }
    }
  }

  isLastItem(data: XIdentity[], item: XIdentity) {
    return data.indexOf(item) === data.length - 1;
  }

  itemClick(type: 'hour' | 'minute' | 'second' | 'use12Hours') {
    switch (type) {
      case 'minute':
        this.model.setMinutes(this.minute);
        break;
      case 'second':
        this.model.setSeconds(this.second);
        break;
      case 'hour':
        if (this.use12Hours) {
          if (this.use12Hour === 'pm' && this.hour !== 12) {
            this.model.setHours(this.hour + 12);
          } else if (this.use12Hour === 'am' && this.hour === 12) {
            this.model.setHours(0);
          } else {
            this.model.setHours(this.hour);
          }
        } else {
          this.model.setHours(this.hour);
        }
        break;
      case 'use12Hours':
        if (this.use12Hour === 'pm' && this.hour !== 12) {
          this.model.setHours(this.hour + 12);
        } else if (this.use12Hour === 'am' && this.hour === 12) {
          this.model.setHours(0);
        } else {
          this.model.setHours(this.hour);
        }
        break;
    }
    this.setScrollTop(true);
    this.nodeEmit.emit(this.model);
    this.cdr.detectChanges();
  }

  private scrollTo(element: HTMLElement, to: number, duration: number): void {
    const clsName = element.className;
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;
    this.scrollAnimating[clsName] = true;
    reqAnimFrame(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to || duration <= 0) {
        this.scrollAnimating[clsName] = false;
        return;
      } else {
        this.scrollTo(element, to, duration - 10);
      }
    });
  }
}
