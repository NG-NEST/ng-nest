import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  inject,
  signal,
  computed
} from '@angular/core';
import { XAvatarPrefix, XAvatarProperty } from './avatar.property';
import { XIsEmpty, XIsNumber, XIsString, XResize, XIsObject, XIsChange } from '@ng-nest/ui/core';
import { DOCUMENT, NgClass, NgStyle } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import type { XClassMap, XResizeObserver, XResponseSize } from '@ng-nest/ui/core';

@Component({
  selector: `${XAvatarPrefix}`,
  standalone: true,
  imports: [NgClass, NgStyle, XOutletDirective, XIconComponent],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAvatarComponent extends XAvatarProperty implements OnDestroy, OnChanges, AfterViewInit {
  isImgError = signal(false);
  styleMap = computed(() => {
    const size = this.size();
    if (XIsNumber(size)) {
      return {
        height: `${size}px`,
        width: `${size}px`,
        lineHeight: `${size}px`,
        fontSize: `${size * 0.6}px`
      };
    } else if (XIsObject<XResponseSize>(size)) {
      const { xs, sm, md, lg, xl } = size;
      let nsize = 40;
      const width = this.documentWidth();
      if (xs && width < 768) {
        nsize = xs;
      }
      if (sm && width >= 768) {
        nsize = sm;
      }
      if (md && width >= 992) {
        nsize = md;
      }
      if (lg && width >= 1200) {
        nsize = lg;
      }
      if (xl && width >= 1920) {
        nsize = xl;
      }
      return {
        height: `${nsize}px`,
        width: `${nsize}px`,
        lineHeight: `${nsize}px`,
        fontSize: `${nsize * 0.6}px`
      };
    } else {
      return {};
    }
  });

  classMapSignal = computed(() => {
    const classMap: XClassMap = {
      [`${XAvatarPrefix}-${this.shape()}`]: !XIsEmpty(this.shape())
    };
    const size = this.size();
    if (XIsString(size)) {
      classMap[`${XAvatarPrefix}-${size}`] = !XIsEmpty(size);
    } else if (XIsObject<XResponseSize>(size)) {
      classMap[`${XAvatarPrefix}-medium`] = true;
    }

    return classMap;
  });
  document = inject(DOCUMENT);
  documentWidth = signal(this.document.documentElement.clientWidth);
  private _unSubject = new Subject<void>();
  private _resizeObserver!: XResizeObserver;

  @ViewChild('labelRef') labelRef!: ElementRef<HTMLElement>;

  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.complete();
    this._resizeObserver?.disconnect();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let { label } = changes;
    XIsChange(label) && setTimeout(() => this.setLabel());
  }

  ngAfterViewInit(): void {
    this.setLabel();
    XResize(this.document.documentElement)
      .pipe(takeUntil(this._unSubject))
      .subscribe((x) => {
        this._resizeObserver = x.resizeObserver;
        this.documentWidth.set(this.document.documentElement.clientWidth);
      });
  }

  setLabel() {
    if (!this.label) return;
    if (!this.elementRef || !this.labelRef) return;
    const eleWidth = this.elementRef.nativeElement.clientWidth;
    const labelWidth = this.labelRef.nativeElement.clientWidth;
    let scale = (eleWidth - Number(this.gap()) * 2) / labelWidth;
    scale = scale > 1 ? 1 : scale;
    this.renderer.setStyle(this.labelRef.nativeElement, 'transform', `scale(${scale})`);
  }

  imgError() {
    this.isImgError.set(true);
  }
}
