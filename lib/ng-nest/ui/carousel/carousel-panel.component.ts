import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  inject,
  OnDestroy,
  signal,
  HostBinding,
  computed
} from '@angular/core';
import { XCarouselPanelPrefix, XCarouselPanelProperty } from './carousel.property';
import { XDropAnimation } from '@ng-nest/ui/core';
import { XCarouselComponent } from './carousel.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: `${XCarouselPanelPrefix}`,
  templateUrl: './carousel-panel.component.html',
  styleUrls: ['./carousel-panel.component.scss'],
  animations: [XDropAnimation],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCarouselPanelComponent extends XCarouselPanelProperty implements OnInit, OnDestroy {
  @HostBinding('class.x-carousel-card') get getCard() {
    return !!this.carousel?.card();
  }
  @HostBinding('class.x-activated') get getActivated() {
    return this.activeSignal();
  }
  @HostBinding('class.x-carousel-in-stage') get getInStage() {
    return this.inStage();
  }
  @HostBinding('class.x-carousel-animating') get getAnimating() {
    return this.animating();
  }
  @HostBinding('style.transform') get getTransform() {
    return `${this.translateType()}(${this.translate()}px) scale(${this.scale()})`;
  }
  index = signal(0);
  animating = signal(false);
  preTranslate!: number;
  cardScale = signal(0.83);
  scale = signal(1);
  translate = signal(0);
  translateType = signal('translateX');
  inStage = signal(false);
  unSubject = new Subject<void>();
  carousel = inject(XCarouselComponent, { optional: true, host: true });
  activeSignal = signal(this.active());
  card = computed(() => this.carousel?.card() ?? false);
  private elementRef = inject(ElementRef);

  ngOnInit() {
    if (!this.carousel) return;
    this.carousel.count.update((x) => x + 1);
    this.carousel.start.update((x) => x + 1);
    this.index.set(this.carousel.start());

    this.carousel.panels.update((x) => {
      x.push(this.elementRef);
      return [...x];
    });
    this.carousel.updatePanel.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.update();
    });
  }

  ngOnDestroy(): void {
    if (!this.carousel) return;
    this.carousel.start.update((x) => x - 1);
    const idx = this.carousel.panels().indexOf(this.elementRef);
    this.carousel.panels.update((x) => {
      x.splice(idx, 1);
      return [...x];
    });
  }

  setActive() {
    const isActive: boolean = this.carousel!.active() === this.index();
    if (this.activeSignal() !== isActive) {
      this.activeSignal.set(isActive);
    }
  }

  setStyles() {
    const width = this.elementRef.nativeElement.offsetWidth;
    const height = this.elementRef.nativeElement.offsetHeight;
    let offset = this.carousel!.active() - this.index();
    let distance = width;
    if (this.carousel!.card()) {
      if (this.carousel!.direction() === 'vertical') {
        console.warn('[x-carousel] vertical direction is not supported in card mode');
      }
      this.inStage.set(Math.round(Math.abs(offset)) <= 1);
      this.translate.set(this.calcCardTranslate(this.index(), this.carousel!.active())!);
      this.scale.set(offset === 0 ? 1 : this.cardScale());
    } else {
      if (this.carousel?.direction() === 'vertical') {
        distance = height;
        this.translateType.set('translateY');
      }
      const map: any = {
        '-2': -distance,
        '-1': distance,
        '0': 0,
        '1': 0 - distance,
        '2': distance
      };
      offset = offset < -2 ? -2 : offset > 2 ? 2 : offset;
      this.translate.set(map[offset]);
    }
    this.animating.set(
      this.carousel!.active() === this.index() ||
        this.carousel!.before() === this.index() ||
        this.carousel!.start() === Math.abs(offset) ||
        this.carousel!.card()
    );
  }

  calcCardTranslate(index: number, activeIndex: number) {
    const parentWidth = this.carousel!.carousel().nativeElement.offsetWidth;
    let offset: number = index - activeIndex;
    let activeFirstOrLast = this.carousel!.start() > 1 && this.carousel!.start() === Math.abs(offset);
    if (this.inStage() || activeFirstOrLast) {
      if (activeFirstOrLast) offset = offset < 0 ? 1 : -1;
      return (parentWidth * ((2 - this.cardScale()) * offset + 1)) / 4;
    } else if (index < activeIndex) {
      return (-(1 + this.cardScale()) * parentWidth) / 4;
    } else {
      return ((3 + this.cardScale()) * parentWidth) / 4;
    }
  }

  update() {
    this.setActive();
    this.setStyles();
  }

  panelClick() {
    if (this.carousel?.card() && this.carousel?.active() !== this.index()) {
      this.carousel?.autoplay() && this.carousel?.resetInterval();
      this.carousel?.setActiveItem(this.index());
    }
  }
}
