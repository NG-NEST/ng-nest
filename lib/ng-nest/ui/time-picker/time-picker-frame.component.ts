import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { XTimePickerFramePrefix, XTimePickerType } from './time-picker.property';
import { XListNode } from '@ng-nest/ui/list';
import { reqAnimFrame, XIsEmpty } from '@ng-nest/ui/core';

@Component({
  selector: `${XTimePickerFramePrefix}`,
  templateUrl: './time-picker-frame.component.html',
  styleUrls: ['./time-picker-frame.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTimePickerFrameComponent implements OnInit, OnDestroy {
  @Input() type: XTimePickerType = 'time';
  @Input() value: number;
  @Output() nodeEmit = new EventEmitter<Date>();
  @ViewChild('hourRef', { static: false }) hourRef: ElementRef;
  @ViewChild('minuteRef', { static: false }) minuteRef: ElementRef;
  @ViewChild('secondRef', { static: false }) secondRef: ElementRef;
  model: Date;
  now = new Date();
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
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
  ngOnInit(): void {}
  ngOnDestroy(): void {}
  ngAfterViewInit() {
    this.init();
    this.setScrollTop();
  }
  constructor(private cdr: ChangeDetectorRef) {}

  init() {
    if (!XIsEmpty(this.value)) {
      this.setDefault();
    } else {
      this.model = new Date(0, 0, 0, this.now.getHours(), this.now.getMinutes(), this.now.getSeconds());
    }
    this.setTime(this.model);
    this.cdr.detectChanges();
  }

  setDefault() {
    const date = new Date(this.value);
    this.model = new Date(0, 0, 0, date.getHours(), date.getMinutes(), date.getSeconds());
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
    let current = ele.querySelector(`ul li:nth-child(${num + 1})`) as HTMLElement;
    if (current) {
      ele.scrollTop = current.offsetTop;
    }
  }

  hourClick(date: XListNode) {
    this.hour = date.id;
    this.model.setHours(this.hour);
    this.nodeEmit.emit(this.model);
    this.cdr.detectChanges();
    this.scrollTo(this.hourRef.nativeElement, (date.event?.srcElement as HTMLElement).offsetTop, 120);
  }

  minuteClick(date: XListNode) {
    this.minute = date.id;
    this.model.setMinutes(this.minute);
    this.nodeEmit.emit(this.model);
    this.cdr.detectChanges();
    this.scrollTo(this.minuteRef.nativeElement, (date.event?.srcElement as HTMLElement).offsetTop, 120);
  }

  secondClick(date: XListNode) {
    this.second = date.id;
    this.model.setSeconds(this.second);
    this.nodeEmit.emit(this.model);
    this.cdr.detectChanges();
    this.scrollTo(this.secondRef.nativeElement, (date.event?.srcElement as HTMLElement).offsetTop, 120);
  }

  private scrollTo(element: HTMLElement, to: number, duration: number): void {
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;
    reqAnimFrame(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to || duration <= 0) {
        return;
      } else {
        this.scrollTo(element, to, duration - 10);
      }
    });
  }
}
