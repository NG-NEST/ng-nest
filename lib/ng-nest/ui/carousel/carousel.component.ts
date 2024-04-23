import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  ViewChild,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { XCarouselPrefix, XCarouselProperty } from './carousel.property';
import { XIsUndefined, XIsChange, XIsEmpty, XNumber, XResize, XConfigService, XResizeObserver } from '@ng-nest/ui/core';
import { BehaviorSubject, Subject, Subscription, interval } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { NgClass, isPlatformBrowser } from '@angular/common';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XProgressComponent } from '@ng-nest/ui/progress';

@Component({
  selector: `${XCarouselPrefix}`,
  standalone: true,
  imports: [NgClass, XButtonComponent, XProgressComponent],
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
  timer?: Subscription;
  precentTimer?: Subscription;
  panelChanges: BehaviorSubject<any>[] = [];
  platformId = inject(PLATFORM_ID);
  isBrowser = true;
  percent = 0;
  count = 0;
  private _unSubject = new Subject<void>();
  private _resizeObserver!: XResizeObserver;
  private cdr = inject(ChangeDetectorRef);
  configService = inject(XConfigService);

  get page() {
    return Number(this.active) + 1;
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
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
    this.timer?.unsubscribe();
    this.precentTimer?.unsubscribe();
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
    if (!this.isBrowser) return;
    this.timer?.unsubscribe();
    if (this.progress) {
      this.precentTimer?.unsubscribe();
      this.percent = 0;
      const js = Number(this.interval) / 100;
      this.precentTimer = interval(js).subscribe(() => {
        this.percent += 1;
        this.cdr.markForCheck();
      });
    }
    this.timer = interval(Number(this.interval)).subscribe(() => {
      this.percent = 0;
      this.setActiveItem(Number(this.active) + 1);
    });
  }

  setActiveItem(index: number): void {
    if (this.start === -1) return;
    this.before = Number(this.active);
    const nextValue = index > this.start ? 0 : index < 0 ? this.start : index;
    this.active = nextValue;
    this.panelChanges.forEach((sub) => sub.next(true));
    this.activeChange.emit(this.active);
    this.cdr.markForCheck();
  }

  setClassMap() {
    this.classMap[`${XCarouselPrefix}-${this.direction}`] = !XIsEmpty(this.direction);
  }

  getActivated(index: number) {
    return Number(this.active) === index;
  }
}
