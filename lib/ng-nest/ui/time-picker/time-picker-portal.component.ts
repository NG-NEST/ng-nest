import { XListNode } from '@ng-nest/ui/list';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Renderer2,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { XTimePickerPortalPrefix, XTimePickerType } from './time-picker.property';
import { XIsEmpty, reqAnimFrame } from '@ng-nest/ui/core';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: `${XTimePickerPortalPrefix}`,
  templateUrl: './time-picker-portal.component.html',
  styleUrls: ['./time-picker-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTimePickerPortalComponent implements OnInit, OnDestroy {
  @ViewChild('hourRef', { static: false }) hourRef: ElementRef;
  @ViewChild('minuteRef', { static: false }) minuteRef: ElementRef;
  @ViewChild('secondRef', { static: false }) secondRef: ElementRef;
  now = new Date();
  type: XTimePickerType = 'time';
  model: Date;
  _type: XTimePickerType;
  value: any;
  valueChange: Subject<any>;
  closePortal: Function;
  nodeEmit: Function;

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

  valueChange$: Subscription | null = null;
  docClickFunction: Function;

  constructor(public renderer: Renderer2, public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.valueChange$ = this.valueChange.subscribe((x: any) => {
      this.value = x;
      this.init();
    });
    setTimeout(
      () =>
        (this.docClickFunction = this.renderer.listen('document', 'click', () => {
          this.closePortal();
        }))
    );
  }

  ngOnDestroy(): void {
    this.valueChange$?.unsubscribe();
    this.docClickFunction && this.docClickFunction();
  }

  ngAfterViewInit() {
    this.init();
    this.setScrollTop();
  }

  prefixZero(num: number, n: number) {
    return (Array(n).join('0') + num).slice(-n);
  }

  init() {
    if (!XIsEmpty(this.value)) {
      this.setDefault();
    } else {
      this.model = new Date(0, 0, 0, this.now.getHours(), this.now.getMinutes(), this.now.getSeconds());
    }
    this.type = this.type;
    this.setTime(this.model);
    this.cdr.detectChanges();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
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
    this.nodeEmit(this.model);
    this.scrollTo(this.hourRef.nativeElement, (date.event?.srcElement as HTMLElement).offsetTop, 120);
  }

  minuteClick(date: XListNode) {
    this.minute = date.id;
    this.model.setMinutes(this.minute);
    this.nodeEmit(this.model);
    this.scrollTo(this.minuteRef.nativeElement, (date.event?.srcElement as HTMLElement).offsetTop, 120);
  }

  secondClick(date: XListNode) {
    this.second = date.id;
    this.model.setSeconds(this.second);
    this.nodeEmit(this.model);
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
