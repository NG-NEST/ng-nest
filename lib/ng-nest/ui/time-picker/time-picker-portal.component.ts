import { XListNode } from '@ng-nest/ui/list';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  OnInit,
  Renderer2,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { XTimePickerPortal, XTimePickerType } from './time-picker.type';
import { XIsEmpty, reqAnimFrame } from '@ng-nest/ui/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'x-time-picker-portal',
  templateUrl: './time-picker-portal.component.html',
  styleUrls: ['./time-picker-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTimePickerPortalComponent implements OnInit, OnDestroy {
  @ViewChild('hourRef', { static: true }) hourRef: ElementRef;
  @ViewChild('minuteRef', { static: true }) minuteRef: ElementRef;
  @ViewChild('secondRef', { static: true }) secondRef: ElementRef;
  now = new Date();
  type: XTimePickerType = 'time';
  model: Date;
  _type: XTimePickerType;

  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  hourDate = Array.from({ length: 24 }).map((_, i) => {
    return {
      label: this.prefixZero(i, 2),
      value: i
    };
  });
  minuteDate = Array.from({ length: 60 }).map((_, i) => {
    return {
      label: this.prefixZero(i, 2),
      value: i
    };
  });
  secondDate = Array.from({ length: 60 }).map((_, i) => {
    return {
      label: this.prefixZero(i, 2),
      value: i
    };
  });

  valueChange$: Subscription | null = null;
  docClickFunction: Function;

  constructor(
    @Inject(XTimePickerPortal) public option: any,
    public renderer: Renderer2,
    public cdr: ChangeDetectorRef
  ) {
    this.init();
  }

  ngOnInit(): void {
    this.valueChange$ = this.option.valueChange.subscribe(x => {
      this.option.value = x;
      this.init();
      this.cdr.markForCheck();
    });
    setTimeout(
      () =>
        (this.docClickFunction = this.renderer.listen('document', 'click', () => {
          this.option.closePortal();
        }))
    );
  }

  ngOnDestroy(): void {
    this.valueChange$ && this.valueChange$.unsubscribe();
    this.docClickFunction && this.docClickFunction();
  }

  ngAfterViewInit() {
    this.setScrollTop();
  }

  prefixZero(num: number, n: number) {
    return (Array(n).join('0') + num).slice(-n);
  }

  init() {
    if (!XIsEmpty(this.option.value)) {
      this.setDefault();
    } else {
      this.model = new Date(0, 0, 0, this.now.getHours(), this.now.getMinutes(), this.now.getSeconds());
    }
    this.type = this.option.type;
    this.setTime(this.model);
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setDefault() {
    const date = new Date(this.option.value);
    this.model = new Date(0, 0, 0, date.getHours(), date.getMinutes(), date.getSeconds());
  }

  setTime(date: Date) {
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
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
    this.option.nodeEmit(this.model);
    this.scrollTo(this.hourRef.nativeElement, (date.event.srcElement as HTMLElement).offsetTop, 120);
  }

  minuteClick(date: XListNode) {
    this.minute = date.id;
    this.model.setMinutes(this.minute);
    this.option.nodeEmit(this.model);
    this.scrollTo(this.minuteRef.nativeElement, (date.event.srcElement as HTMLElement).offsetTop, 120);
  }

  secondClick(date: XListNode) {
    this.second = date.id;
    this.model.setSeconds(this.second);
    this.option.nodeEmit(this.model);
    this.scrollTo(this.secondRef.nativeElement, (date.event.srcElement as HTMLElement).offsetTop, 120);
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
