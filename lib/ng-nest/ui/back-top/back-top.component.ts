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
  OnDestroy
} from '@angular/core';
import { XBackTopPrefix, XBackTopProperty } from './back-top.property';
import { XClassMap, reqAnimFrame } from '@ng-nest/ui/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XBackTopPrefix}`,
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XBackTopComponent extends XBackTopProperty implements OnInit, OnDestroy {
  @Input() set target(el: string | HTMLElement) {
    this._target = typeof el === 'string' ? this.doc.querySelector(el) : el;
    this.setScrollEvent();
  }

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
  private unSubject = new Subject();
  private _target: HTMLElement | null = null;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: Document
  ) {
    super();
  }

  ngOnInit() {
    this.setScrollEvent();
  }

  ngOnDestroy() {
    this.unSubject.next();
    this.unSubject.unsubscribe();
  }

  onBackTop() {
    this.scrolling = true;
    this.scrollTo(0, 200);
  }

  private setScrollEvent() {
    this.unSubject.next();
    fromEvent(this.scroll, 'scroll')
      .pipe(throttleTime(10), takeUntil(this.unSubject))
      .subscribe(() => {
        this.setScrolling();
      });
  }

  private setScrolling() {
    const scrollTop = this.scrollTop;
    const visible = scrollTop >= this.visibilityHeight;
    if (this.visiable !== visible) {
      this.visiable = visible;
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
