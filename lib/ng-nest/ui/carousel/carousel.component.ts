import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  PLATFORM_ID,
  inject,
  computed,
  viewChild,
  signal
} from '@angular/core';
import { XCarouselPrefix, XCarouselProperty } from './carousel.property';
import { XIsUndefined, XIsChange, XIsEmpty, XResize } from '@ng-nest/ui/core';
import { Subject, Subscription, interval } from 'rxjs';
import { takeUntil, debounceTime, tap } from 'rxjs/operators';
import { NgClass, isPlatformBrowser } from '@angular/common';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XProgressComponent } from '@ng-nest/ui/progress';
import type { XResizeObserver } from '@ng-nest/ui/core';

@Component({
  selector: `${XCarouselPrefix}`,
  standalone: true,
  imports: [NgClass, XButtonComponent, XProgressComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCarouselComponent extends XCarouselProperty {
  carousel = viewChild.required<ElementRef<HTMLElement>>('carousel');
  content = viewChild.required<ElementRef<HTMLElement>>('content');
  start = signal(-1);
  before = signal(-1);
  timer?: Subscription;
  precentTimer?: Subscription;
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  percent = signal(0);
  count = signal(0);
  panels = signal<object[]>([]);
  private unSubject = new Subject<void>();
  private resizeObserver!: XResizeObserver;

  classMapSignal = computed(() => ({
    [`${XCarouselPrefix}-${this.direction}`]: !XIsEmpty(this.direction)
  }));

  updatePanel = new Subject<void>();

  page = computed(() => this.active() + 1);

  ngAfterViewInit() {
    this.autoplay() && this.resetInterval();
    XResize(this.content().nativeElement)
      .pipe(
        debounceTime(30),
        tap(({ resizeObserver }) => {
          this.resizeObserver = resizeObserver;
          this.updatePanel.next();
        }),
        takeUntil(this.unSubject)
      )
      .subscribe();
  }

  ngOnChanges(simples: SimpleChanges): void {
    const { active } = simples;
    XIsChange(active) && this.setActiveItem(this.active());
  }

  ngOnDestroy(): void {
    this.timer?.unsubscribe();
    this.precentTimer?.unsubscribe();
    this.unSubject.next();
    this.unSubject.complete();
    this.resizeObserver?.disconnect();
    this.updatePanel.complete();
  }

  action(index: number, increase: number, event?: string): void {
    if (!XIsUndefined(event) && this.trigger() !== event) return;
    this.autoplay() && this.resetInterval();
    this.setActiveItem(index + increase);
  }

  resetInterval(): void {
    if (!this.isBrowser) return;
    this.timer?.unsubscribe();
    if (this.progress()) {
      this.precentTimer?.unsubscribe();
      this.percent.set(0);
      const js = this.interval() / 100;
      this.precentTimer = interval(js)
        .pipe(takeUntil(this.unSubject))
        .subscribe(() => {
          this.percent.update((x) => x + 1);
        });
    }
    this.timer = interval(this.interval())
      .pipe(takeUntil(this.unSubject))
      .subscribe(() => {
        this.percent.set(0);
        this.setActiveItem(this.active() + 1);
      });
  }

  setActiveItem(index: number): void {
    if (this.start() === -1) return;
    this.before.set(this.active());
    const nextValue = index > this.start() ? 0 : index < 0 ? this.start() : index;
    this.active.set(nextValue);
    this.updatePanel.next();
  }

  getActivated(index: number) {
    return this.active() === index;
  }
}
