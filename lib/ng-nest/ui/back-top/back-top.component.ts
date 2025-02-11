import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  inject,
  viewChild,
  computed,
  effect,
  signal
} from '@angular/core';
import { XBackTopPrefix, XBackTopProperty } from './back-top.property';
import { XRequestAnimationFrame, XIsNumber, XIsString } from '@ng-nest/ui/core';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil, map, tap } from 'rxjs/operators';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: `${XBackTopPrefix}`,
  imports: [NgTemplateOutlet, XLinkComponent],
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XBackTopComponent extends XBackTopProperty implements OnDestroy {
  backTopTpl = viewChild.required<TemplateRef<void>>('backTopTpl');
  visiable = signal(false);
  scrolling = signal(false);
  portalRef!: XPortalOverlayRef<any>;
  private doc = inject(DOCUMENT);
  private portal = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private unSubject = new Subject<void>();

  scroll = computed(() => {
    const tg = this.target();
    if (!tg) return this.doc?.defaultView;
    return XIsString(tg) ? this.doc?.querySelector(tg) : tg;
  });

  constructor() {
    super();
    effect(() => this.addEvent());
  }

  ngOnDestroy() {
    this.unSubject.next();
    this.unSubject.complete();
  }

  onBackTop() {
    if (!this.scrolling()) {
      this.scrolling.set(true);
      this.scrollTo(0, 200);
    }
  }

  private addEvent() {
    this.unSubject.next();
    fromEvent(this.scroll()!, 'scroll')
      .pipe(
        throttleTime(20),
        map(() => this.scrollTop()),
        tap((x) => this.setVisible(x)),
        takeUntil(this.unSubject)
      )
      .subscribe();
  }

  private scrollTop() {
    if (this.scroll() === this.doc.defaultView) {
      return this.doc.documentElement.scrollTop;
    } else {
      return (this.scroll() as HTMLElement).scrollTop;
    }
  }

  private setVisible(scrollTop: number) {
    const visible = scrollTop >= (this.visibilityHeight() as number);
    console.log(this.visibilityHeight(), scrollTop, visible);
    if (this.visiable() !== visible) {
      this.visiable.set(visible);
      if (this.visiable()) {
        this.portalRef = this.portal.attach({
          content: this.backTopTpl(),
          viewContainerRef: this.viewContainerRef,
          overlayConfig: {
            width: '2.5rem',
            height: '2.5rem',
            positionStrategy: this.portal.setPlace('bottom-end', ...['0', this.right(), this.bottom(), '0'])
          }
        });
      } else {
        this.portalRef?.overlayRef?.hasAttached() && this.portalRef.overlayRef.detach();
      }
    }
  }

  private scrollTo(to: number, duration: number) {
    const difference = to - this.scrollTop();
    const perTick = (difference / duration) * 10;
    XRequestAnimationFrame(() => {
      const num = this.scrollTop() + perTick;
      if (XIsNumber(num) && num !== Infinity) {
        this.setScrollTop(num);
      }
      if (this.scrollTop() === to || duration <= 0) {
        this.scrolling.set(false);
        return;
      } else {
        this.scrollTo(to, duration - 10);
      }
    });
  }

  private setScrollTop(top: number) {
    if (this.scroll() === this.doc.defaultView) {
      this.doc.documentElement!.scrollTop = top!;
    } else {
      (this.scroll() as HTMLElement).scrollTop = top!;
    }
  }
}
