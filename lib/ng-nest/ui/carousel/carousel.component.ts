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
import { XIsUndefined, XIsChange, XIsEmpty, XNumber, XResize, XConfigService, XResizeObserver } from '@ng-nest/ui/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: `${XCarouselPrefix}`,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCarouselComponent extends XCarouselProperty implements OnInit, OnChanges {
  @ViewChild('carousel') carousel!: ElementRef<HTMLElement>;
  @ViewChild('content') content!: ElementRef<HTMLElement>;
  start: number = -1;
  before!: number;
  timer: any;
  panelChanges: BehaviorSubject<any>[] = [];
  private _unSubject = new Subject<void>();
  private _resizeObserver!: XResizeObserver;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngAfterViewInit() {
    this.autoplay && this.resetInterval();
    XResize(this.content.nativeElement)
      .pipe(debounceTime(30), takeUntil(this._unSubject))
      .subscribe((x) => {
        this.panelChanges.forEach((sub) => sub.next(true));
        this._resizeObserver = x.resizeObserver;
        this.cdr.detectChanges();
      });
  }

  ngOnChanges(simples: SimpleChanges): void {
    const { active } = simples;
    XIsChange(active) && this.setActiveItem(Number(this.active));
  }

  ngOnDestroy(): void {
    this.timer && clearInterval(this.timer);
    this.panelChanges.forEach((x) => x.complete());
    this._unSubject.complete();
    this._unSubject.unsubscribe();
    this._resizeObserver?.disconnect();
  }

  action(index: XNumber, increase: number, event?: string): void {
    if (!XIsUndefined(event) && this.trigger !== event) return;
    this.autoplay && this.resetInterval();
    this.setActiveItem(Number(index) + increase);
  }

  resetInterval(): void {
    this.timer && clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setActiveItem(Number(this.active) + 1);
    }, Number(this.interval));
  }

  setActiveItem(index: number): void {
    if (this.start === -1) return;
    this.before = Number(this.active);
    const nextValue = index > this.start ? 0 : index < 0 ? this.start : index;
    this.active = nextValue;
    this.panelChanges.forEach((sub) => sub.next(true));
    this.activeChange.emit(this.active);
    this.cdr.detectChanges();
  }

  setClassMap() {
    this.classMap[`${XCarouselPrefix}-${this.direction}`] = !XIsEmpty(this.direction);
  }

  getActivated(index: number) {
    return Number(this.active) === index;
  }

  trackByPanel(index: number, _item: any) {
    return index;
  }
}
