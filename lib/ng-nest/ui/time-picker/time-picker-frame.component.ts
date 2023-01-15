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
import { reqAnimFrame, XBoolean, XIdentity, XIsChange, XIsEmpty, XIsString } from '@ng-nest/ui/core';
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
  @Output() nodeEmit = new EventEmitter<Date>();
  @ViewChild('hourRef', { static: false }) hourRef?: ElementRef;
  @ViewChild('minuteRef', { static: false }) minuteRef?: ElementRef;
  @ViewChild('secondRef', { static: false }) secondRef?: ElementRef;
  @ViewChild('use12HoursRef', { static: false }) use12HoursRef?: ElementRef;
  model!: Date;
  now = new Date();
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  use12Hour: string = 'am';
  scrollAnimating: { [key: string]: boolean } = {};
  hourData: XIdentity[] = [];
  minuteData: XIdentity[] = Array.from({ length: 60 }).map((_, i) => {
    return {
      label: this.prefixZero(i, 2),
      id: i
    };
  });
  secondData: XIdentity[] = Array.from({ length: 60 }).map((_, i) => {
    return {
      label: this.prefixZero(i, 2),
      id: i
    };
  });
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
    this.hourData = Array.from({ length }).map((_, i) => {
      if (this.use12Hours && i === 0) {
        i = 12;
      }
      return {
        label: this.prefixZero(i, 2),
        id: i
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
    console.log(this.hour);
    this.selected(this.hourRef?.nativeElement, this.hour, animating);
    this.selected(this.minuteRef?.nativeElement, this.minute, animating);
    this.selected(this.secondRef?.nativeElement, this.second, animating);
    this.selected(this.use12HoursRef?.nativeElement, this.use12Hour, animating);
  }

  selected(ele: HTMLElement, num: number | string, animating = false) {
    if (!ele) return;
    if (this.scrollAnimating[ele.className]) return;
    const len = XIsString(num) ? this.use12HoursData.findIndex((x) => x.id === num) : Number(num);
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
    console.log(this.model);
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
