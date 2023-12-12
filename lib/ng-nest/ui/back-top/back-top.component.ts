import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { XBackTopPrefix, XBackTopProperty } from './back-top.property';
import { reqAnimFrame, XConfigService, XIsChange, XIsNumber } from '@ng-nest/ui/core';
import { DOCUMENT, NgClass, NgTemplateOutlet } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: `${XBackTopPrefix}`,
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, XLinkComponent],
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XBackTopComponent extends XBackTopProperty implements OnInit, OnChanges, OnDestroy {
  @ViewChild('backTopTpl') backTopTpl!: TemplateRef<void>;

  get scroll(): HTMLElement | Window | null {
    return this._target || this.doc.defaultView;
  }

  get scrollTop(): number {
    if (this.scroll === this.doc.defaultView) {
      return this.doc.documentElement!.scrollTop;
    } else {
      return (this.scroll as HTMLElement).scrollTop;
    }
  }

  set scrollTop(top: number) {
    if (this.scroll === this.doc.defaultView) {
      this.doc.documentElement!.scrollTop = top!;
    } else {
      (this.scroll as HTMLElement).scrollTop = top!;
    }
  }

  visiable = false;
  scrolling = false;
  portalRef!: XPortalOverlayRef<any>;
  private doc = inject(DOCUMENT);
  private cdr = inject(ChangeDetectorRef);
  private portal = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private _unSubject = new Subject<void>();
  private _target: HTMLElement | null = null;
  configService = inject(XConfigService);

  ngOnChanges(changes: SimpleChanges): void {
    const { target } = changes;
    if (XIsChange(target)) {
      this._target = typeof this.target === 'string' ? this.doc.querySelector(this.target) : this.target!;
      this.setScrollEvent();
    }
  }

  ngOnInit() {
    this.setScrollEvent();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  onBackTop() {
    this.scrolling = true;
    this.scrollTo(0, 200);
  }

  private setScrollEvent() {
    this._unSubject.next();
    if (!this.scroll) return;
    fromEvent(this.scroll, 'scroll')
      .pipe(throttleTime(20), takeUntil(this._unSubject))
      .subscribe(() => {
        this.setScrolling();
      });
  }

  private setScrolling() {
    const scrollTop = this.scrollTop;
    const visible = scrollTop >= (this.visibilityHeight as number);
    if (this.visiable !== visible) {
      this.visiable = visible;
      if (this.visiable) {
        this.portalRef = this.portal.attach({
          content: this.backTopTpl,
          viewContainerRef: this.viewContainerRef,
          overlayConfig: {
            width: '2.5rem',
            height: '2.5rem',
            positionStrategy: this.portal.setPlace(
              'bottom-end',
              ...['0', this.right as string, this.bottom as string, '0']
            )
          }
        });
      } else {
        this.portalRef?.overlayRef?.hasAttached() && this.portalRef.overlayRef.detach();
      }
      this.cdr.detectChanges();
    }
  }

  private scrollTo(to: number, duration: number) {
    const difference = to - this.scrollTop;
    const perTick = (difference / duration) * 10;
    reqAnimFrame(() => {
      const num = this.scrollTop + perTick;
      if (XIsNumber(num) && num !== Infinity) {
        this.scrollTop = num;
      }
      if (this.scrollTop === to || duration <= 0) {
        return;
      } else {
        this.scrollTo(to, duration - 10);
      }
    });
  }
}
