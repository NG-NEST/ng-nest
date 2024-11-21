import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  SimpleChanges,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';
import { XTimePickerDisabledTime, XTimePickerFramePrefix, XTimePickerType } from './time-picker.property';
import {
  XRequestAnimationFrame,
  XIdentity,
  XIsChange,
  XIsEmpty,
  XIsFunction,
  XIsNull,
  XIsNumber
} from '@ng-nest/ui/core';
import { XI18nService, XI18nTimePicker, zh_CN } from '@ng-nest/ui/i18n';
import { map } from 'rxjs/operators';
import { XListComponent } from '@ng-nest/ui/list';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XTimePickerFramePrefix}`,
  imports: [FormsModule, XListComponent],
  templateUrl: './time-picker-frame.component.html',
  styleUrls: ['./time-picker-frame.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTimePickerFrameComponent {
  private i18n = inject(XI18nService);
  type = input<XTimePickerType>('time');
  value = input<number | null>();
  use12Hours = input<boolean>(false);
  hourStep = input<number>(1);
  minuteStep = input<number>(1);
  secondStep = input<number>(1);
  defaultNow = input<boolean>(true);
  disabledTime = input<XTimePickerDisabledTime>();
  disabledTimeParam = input<any>();
  nodeEmit = output<Date>();
  hourRef = viewChild.required<ElementRef<HTMLElement>>('hourRef');
  minuteRef = viewChild<ElementRef<HTMLElement>>('minuteRef');
  secondRef = viewChild<ElementRef<HTMLElement>>('secondRef');
  use12HoursRef = viewChild<ElementRef<HTMLElement>>('use12HoursRef');
  model = signal<Date | null>(null);
  hour = signal<number | null>(null);
  minute = signal<number | null>(null);
  second = signal<number | null>(null);
  use12Hour = signal('am');
  scrollAnimating = signal<{ [key: string]: boolean }>({});
  hourData = computed(() => {
    let length = this.use12Hours() ? 12 : 24;
    return Array.from({ length: Math.ceil(length / this.hourStep()) }).map((_, i) => {
      if (this.use12Hours() && i === 0) {
        i = 12;
        return {
          disabled: this.setDisabled('hours', i),
          label: this.prefixZero(i, 2),
          id: i
        };
      } else {
        const num = i * this.hourStep();
        return {
          disabled: this.setDisabled('hours', num),
          label: this.prefixZero(num, 2),
          id: num
        };
      }
    });
  });
  minuteData = computed(() => {
    return Array.from({ length: Math.ceil(60 / this.minuteStep()) }).map((_, i) => {
      const num = i * this.minuteStep();
      return {
        disabled: this.setDisabled('minutes', num),
        label: this.prefixZero(num, 2),
        id: num
      };
    });
  });
  secondData = computed(() => {
    return Array.from({ length: Math.ceil(60 / this.secondStep()) }).map((_, i) => {
      const num: number = i * this.secondStep();
      return {
        disabled: this.setDisabled('seconds', num),
        label: this.prefixZero(num, 2),
        id: num
      };
    });
  });
  use12HoursData = computed(() => {
    return [
      {
        id: 'am',
        label: this.locale().am
      },
      {
        id: 'pm',
        label: this.locale().pm
      }
    ];
  });
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.timePicker as XI18nTimePicker)), {
    initialValue: zh_CN.timePicker
  });

  ngOnChanges(changes: SimpleChanges): void {
    const { value } = changes;
    if (XIsChange(value)) {
      this.init();
      this.setScrollTop(true);
    }
  }

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    this.setScrollTop();
  }

  setDisabled(type: 'hours' | 'minutes' | 'seconds', num: number) {
    if (this.disabledTime() && XIsFunction(this.disabledTime())) {
      const disabledMap = this.disabledTime()!(this.disabledTimeParam()!);
      const { disabledHours, disabledMinutes, disabledSeconds } = disabledMap;
      let disabledNums: number[] = [];
      if (type === 'hours') {
        disabledNums = disabledHours ? disabledHours() : [];
      } else if (type === 'minutes') {
        disabledNums = disabledMinutes ? disabledMinutes() : [];
      } else if (type === 'seconds') {
        disabledNums = disabledSeconds ? disabledSeconds() : [];
      }
      return disabledNums.includes(num);
    }
    return false;
  }

  init() {
    if (!XIsEmpty(this.value())) {
      this.model.set(new Date(this.value()!));
      this.setTime(this.model()!);
    } else {
      if (this.defaultNow()) {
        this.model.set(this.setNow());
      } else {
        this.hour.set(null);
        this.minute.set(null);
        this.second.set(null);
      }
    }
  }

  setNow() {
    const def = new Date('1970-01-01');
    const now = new Date();
    return new Date(
      def.getFullYear(),
      def.getMonth(),
      def.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );
  }

  setZero() {
    const def = new Date('1970-01-01');
    return new Date(def.getFullYear(), def.getMonth(), def.getDate(), 0, 0, 0);
  }

  setTime(date: Date) {
    if (this.use12Hours()) {
      let hour = date.getHours();
      if (hour > 12) {
        this.hour.set(hour - 12);
        this.use12Hour.set('pm');
      } else if (hour === 12) {
        this.hour.set(12);
        this.use12Hour.set('pm');
      } else {
        this.hour.set(hour === 0 ? 12 : hour);
        this.use12Hour.set('am');
      }
    } else {
      this.hour.set(date.getHours());
    }
    this.minute.set(date.getMinutes());
    this.second.set(date.getSeconds());
  }

  prefixZero(num: number, n: number) {
    return (Array(n).join('0') + num).slice(-n);
  }

  setScrollTop(animating = false) {
    this.selected('hour', this.hourRef().nativeElement, this.hour()!, animating);
    this.selected('minute', this.minuteRef()?.nativeElement, this.minute()!, animating);
    this.selected('second', this.secondRef()?.nativeElement, this.second()!, animating);
    this.selected('use12Hour', this.use12HoursRef()?.nativeElement, this.use12Hour(), animating);
  }

  selected(
    type: 'hour' | 'minute' | 'second' | 'use12Hour',
    ele?: HTMLElement,
    num?: number | string,
    animating = false
  ) {
    if (!ele || XIsNull(num)) return;
    if (this.scrollAnimating()[ele.className]) return;
    let len = Number(num);
    switch (type) {
      case 'hour':
        len = this.hourData().findIndex((x) => x.id === num);
        break;
      case 'minute':
        len = this.minuteData().findIndex((x) => x.id === num);
        break;
      case 'second':
        len = this.secondData().findIndex((x) => x.id === num);
        break;
      case 'use12Hour':
        len = this.use12HoursData().findIndex((x) => x.id === num);
        break;
    }
    const current = ele.querySelector(`.x-list x-list-option:nth-child(${len + 1})`) as HTMLElement;
    if (current) {
      if (animating) {
        this.scrollTo(ele, current.offsetTop - 4, 120);
      } else {
        ele.scrollTop = current.offsetTop - 4;
      }
    }
  }

  isLastItem(data: XIdentity[], item: XIdentity) {
    return data.indexOf(item) === data.length - 1;
  }

  itemClick(type: 'hour' | 'minute' | 'second' | 'use12Hours') {
    if (XIsEmpty(this.model())) {
      this.model.set(this.setZero());
    }
    switch (type) {
      case 'minute':
        this.model.update((x) => {
          x!.setMinutes(this.minute()!);
          return x;
        });
        break;
      case 'second':
        this.model.update((x) => {
          x!.setSeconds(this.second()!);
          return x;
        });
        break;
      case 'hour':
        if (this.use12Hours()) {
          if (this.use12Hour() === 'pm' && this.hour() !== 12) {
            this.model.update((x) => {
              x!.setHours(this.hour()! + 12);
              return x;
            });
          } else if (this.use12Hour() === 'am' && this.hour() === 12) {
            this.model.update((x) => {
              x!.setHours(0);
              return x;
            });
          } else {
            this.model.update((x) => {
              x!.setHours(this.hour()!);
              return x;
            });
          }
        } else {
          this.model.update((x) => {
            x!.setHours(this.hour()!);
            return x;
          });
        }
        break;
      case 'use12Hours':
        if (this.use12Hour() === 'pm' && this.hour() !== 12) {
          this.model.update((x) => {
            x!.setHours(this.hour()! + 12);
            return x;
          });
        } else if (this.use12Hour() === 'am' && this.hour() === 12) {
          this.model.update((x) => {
            x!.setHours(0);
            return x;
          });
        } else {
          this.model.update((x) => {
            x!.setHours(this.hour()!);
            return x;
          });
        }
        break;
    }
    this.setScrollTop(true);
    this.nodeEmit.emit(this.model()!);
  }

  private scrollTo(element: HTMLElement, to: number, duration: number): void {
    const clsName = element.className;
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;
    this.scrollAnimating.update((x) => {
      x[clsName] = true;
      return { ...x };
    });
    XRequestAnimationFrame(() => {
      const num = element.scrollTop + perTick;
      if (XIsNumber(num) && num !== Infinity) {
        element.scrollTop = num;
      }
      if (element.scrollTop === to || duration <= 0) {
        this.scrollAnimating.update((x) => {
          x[clsName] = false;
          return { ...x };
        });
        return;
      } else {
        this.scrollTo(element, to, duration - 10);
      }
    });
  }
}
