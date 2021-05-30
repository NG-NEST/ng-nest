import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  Inject,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { XBackTopPrefix, XBackTopProperty } from './back-top.property';
import { XClassMap, reqAnimFrame, XConfigService, XIsChange } from '@ng-nest/ui/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';

@Component({
  selector: `${XBackTopPrefix}`,
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XBackTopComponent extends XBackTopProperty implements OnInit, OnChanges, OnDestroy {
  @ViewChild('backTopTpl') backTopTpl!: TemplateRef<void>;

  get scroll(): HTMLElement | Window {
    return this._target || window;
  }

  get scrollTop(): number {
    if (this.scroll === window) {
      return this.doc.documentElement!.scrollTop;
    } else {
      return (this.scroll as HTMLElement).scrollTop;
    }
  }

  set scrollTop(top: number) {
    if (this.scroll === window) {
      this.doc.documentElement!.scrollTop = top;
    } else {
      (this.scroll as HTMLElement).scrollTop = top;
    }
  }

  classMap: XClassMap = {};
  visiable = false;
  scrolling = false;
  portalRef!: XPortalOverlayRef<any>;
  private _unSubject = new Subject();
  private _target: HTMLElement | null = null;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public portal: XPortalService,
    public viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private doc: any,
    public configService: XConfigService
  ) {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (XIsChange(changes.target)) {
      this._target = typeof this.target === 'string' ? this.doc.querySelector(this.target) : this.target;
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
    fromEvent(this.scroll, 'scroll')
      .pipe(throttleTime(20), takeUntil(this._unSubject))
      .subscribe(() => {
        this.setScrolling();
      });
  }

  private setScrolling() {
    const scrollTop = this.scrollTop;
    const visible = scrollTop >= this.visibilityHeight;
    if (this.visiable !== visible) {
      this.visiable = visible;
      if (this.visiable) {
        this.portalRef = this.portal.attach({
          content: this.backTopTpl,
          viewContainerRef: this.viewContainerRef,
          overlayConfig: {
            positionStrategy: this.portal.setPlace('bottom-end', '2.5rem', '2.5rem', ...['0', this.right, this.bottom, '0'])
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
      this.scrollTop = this.scrollTop + perTick;
      if (this.scrollTop === to || duration <= 0) {
        return;
      } else {
        this.scrollTo(to, duration - 10);
      }
    });
  }
}
