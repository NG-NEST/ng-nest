import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { XCarouselPrefix, XCarouselTrigger, XCarouselArrow, XCarouselDirection } from './carousel.type';
import { XInputBoolean, XInputNumber, XIsUndefined, XIsChange, XClassMap } from '@ng-nest/ui/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: `${XCarouselPrefix}`,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCarouselComponent implements OnInit, OnChanges {
  @Input() @XInputNumber() active: number = 0;
  @Input() height?: string = '15rem';
  @Input() trigger?: XCarouselTrigger = 'hover';
  @Input() arrow?: XCarouselArrow = 'hover';
  @Input() direction?: XCarouselDirection = 'horizontal';
  @Input() @XInputBoolean() autoplay: boolean = true;
  @Input() interval: number = 3000;
  @Input() @XInputBoolean() outside?: boolean;
  @Input() @XInputBoolean() card?: boolean;
  @ViewChild('carousel', { static: true }) carousel: ElementRef;
  @Output() activeChange = new EventEmitter();
  start: number = -1;
  before: number;
  timer: any;
  panelChanges: BehaviorSubject<any>[] = [];
  classMap: XClassMap = {};

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
  }

  ngAfterViewInit() {
    this.panelChanges.forEach(sub => sub.next(true));
  }

  ngAfterViewChecked(): void {
    const timer = setTimeout(() => {
      this.autoplay && this.resetInterval();
      clearTimeout(timer);
    }, 0);
  }

  ngOnChanges(simples: SimpleChanges): void {
    XIsChange(simples.active) && this.setActiveItem(this.active);
  }

  ngOnDestroy(): void {
    this.timer && clearInterval(this.timer);
    this.panelChanges.forEach(x => x.complete());
  }

  action(index: number, event?: string): void {
    if (!XIsUndefined(event) && this.trigger !== event) return;
    this.autoplay && this.resetInterval();
    this.setActiveItem(index);
  }

  resetInterval(): void {
    this.timer && clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setActiveItem(this.active + 1);
    }, this.interval);
  }

  setActiveItem(index: number): void {
    if (this.start === -1) return;
    this.before = this.active;
    const nextValue = index > this.start ? 0 : index < 0 ? this.start : index;
    this.active = nextValue;
    this.panelChanges.forEach(sub => sub.next(true));
    this.activeChange.emit(this.active);
    this.cdr.detectChanges();
  }

  setClassMap() {
    this.classMap[`${XCarouselPrefix}-${this.direction}`] = this.direction ? true : false;
  }
}
