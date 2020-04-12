import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  ViewChild
} from '@angular/core';
import { XCarouselPrefix, XCarouselProperty } from './carousel.property';
import { XIsUndefined, XIsChange, XIsEmpty } from '@ng-nest/ui/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: `${XCarouselPrefix}`,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCarouselComponent extends XCarouselProperty implements OnInit, OnChanges {
  @ViewChild('carousel') carousel: ElementRef;
  start: number = -1;
  before: number;
  timer: any;
  panelChanges: BehaviorSubject<any>[] = [];

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngAfterViewInit() {
    this.panelChanges.forEach((sub) => sub.next(true));
  }

  // ngAfterViewChecked(): void {
  //   const timer = setTimeout(() => {
  //     this.autoplay && this.resetInterval();
  //     clearTimeout(timer);
  //   }, 0);
  // }

  ngOnChanges(simples: SimpleChanges): void {
    XIsChange(simples.active) && this.setActiveItem(this.active);
  }

  ngOnDestroy(): void {
    this.timer && clearInterval(this.timer);
    this.panelChanges.forEach((x) => x.complete());
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
    this.panelChanges.forEach((sub) => sub.next(true));
    this.activeChange.emit(this.active);
    this.cdr.detectChanges();
  }

  setClassMap() {
    this.classMap[`${XCarouselPrefix}-${this.direction}`] = !XIsEmpty(this.direction);
  }
}
