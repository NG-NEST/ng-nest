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
import { XListNode } from '@ng-nest/ui/list';
import { reqAnimFrame, XIsChange, XIsEmpty } from '@ng-nest/ui/core';

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
  @Output() nodeEmit = new EventEmitter<Date>();
  @ViewChild('hourRef', { static: false }) hourRef!: ElementRef;
  @ViewChild('minuteRef', { static: false }) minuteRef!: ElementRef;
  @ViewChild('secondRef', { static: false }) secondRef!: ElementRef;
  model!: Date;
  now = new Date();
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  scrollAnimating: { [key: string]: boolean } = {};
  hourDate = Array.from({ length: 24 }).map((_, i) => {
    return {
      label: this.prefixZero(i, 2),
      id: i
    };
  });
  minuteDate = Array.from({ length: 60 }).map((_, i) => {
    return {
      label: this.prefixZero(i, 2),
      id: i
    };
  });
  secondDate = Array.from({ length: 60 }).map((_, i) => {
    return {
      label: this.prefixZero(i, 2),
      id: i
    };
  });
  ngOnChanges(changes: SimpleChanges): void {
    const { value } = changes;
    if (XIsChange(value)) {
      this.init();
      this.setScrollTop();
    }
  }

  ngOnInit() {
    this.init();
  }

  constructor(private cdr: ChangeDetectorRef) {}

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
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
  }

  prefixZero(num: number, n: number) {
    return (Array(n).join('0') + num).slice(-n);
  }

  setScrollTop() {
    this.selected(this.hourRef.nativeElement, this.hour);
    this.selected(this.minuteRef.nativeElement, this.minute);
    this.selected(this.secondRef.nativeElement, this.second);
  }

  selected(ele: HTMLElement, num: number) {
    if (this.scrollAnimating[ele.className]) return;
    let current = ele.querySelector(`.x-list x-list-option:nth-child(${num + 1})`) as HTMLElement;
    if (current) {
      ele.scrollTop = current.offsetTop;
    }
  }

  hourClick(date: XListNode) {
    this.hour = date.id;
    this.model.setHours(this.hour);
    this.scrollTo(this.hourRef.nativeElement, (date.event?.srcElement as HTMLElement).offsetTop, 120);
    this.nodeEmit.emit(this.model);
    this.cdr.detectChanges();
  }

  minuteClick(date: XListNode) {
    this.minute = date.id;
    this.model.setMinutes(this.minute);
    this.scrollTo(this.minuteRef.nativeElement, (date.event?.srcElement as HTMLElement).offsetTop, 120);
    this.nodeEmit.emit(this.model);
    this.cdr.detectChanges();
  }

  secondClick(date: XListNode) {
    this.second = date.id;
    this.model.setSeconds(this.second);
    this.scrollTo(this.secondRef.nativeElement, (date.event?.srcElement as HTMLElement).offsetTop, 120);
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
