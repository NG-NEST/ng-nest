import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { XAvatarPrefix, XAvatarProperty } from './avatar.property';
import {
  XIsEmpty,
  XConfigService,
  XIsNumber,
  XIsString,
  XResize,
  XIsObject,
  XResponseSize,
  XIsChange,
  XResizeObserver
} from '@ng-nest/ui/core';
import { DOCUMENT } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: `${XAvatarPrefix}`,
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAvatarComponent extends XAvatarProperty implements OnDestroy, OnChanges, AfterViewInit {
  isImgError: boolean = false;

  styleMap: { [key: string]: any } = {};
  document = inject(DOCUMENT);
  private _unSubject = new Subject<void>();
  private _resizeObserver!: XResizeObserver;

  @ViewChild('labelRef') labelRef!: ElementRef<HTMLElement>;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

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
    this.setClassMap();
    this.setLabel();
  }

  setClassMap() {
    this.classMap = {
      [`${XAvatarPrefix}-${this.shape}`]: !XIsEmpty(this.shape)
    };
    if (XIsNumber(this.size)) {
      const nsize = Number(this.size);
      this.setStyleMap(nsize);
      this.cdr.detectChanges();
    } else if (XIsString(this.size)) {
      this.classMap[`${XAvatarPrefix}-${this.size}`] = !XIsEmpty(this.size);
      this.cdr.detectChanges();
    } else if (XIsObject(this.size)) {
      this.classMap[`${XAvatarPrefix}-medium`] = true;
      const sz = this.size as XResponseSize;
      let { xs, sm, md, lg, xl } = sz;
      if (!xs && !sm && !md && !lg && !xl) return;
      XResize(this.document.documentElement)
        .pipe(takeUntil(this._unSubject))
        .subscribe((x) => {
          this._resizeObserver = x.resizeObserver;
          const width = this.document.documentElement.clientWidth;
          let nsize = 40;
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
          this.setStyleMap(nsize);
          this.cdr.detectChanges();
          this.setLabel();
        });
    }
  }

  setStyleMap(size: number) {
    this.styleMap = {
      height: `${size}px`,
      width: `${size}px`,
      lineHeight: `${size}px`,
      fontSize: `${size * 0.6}px`
    };
  }

  setLabel() {
    if (!this.label) return;
    if (!this.elementRef || !this.labelRef) return;
    const eleWidth = this.elementRef.nativeElement.clientWidth;
    const labelWidth = this.labelRef.nativeElement.clientWidth;
    let scale = (eleWidth - Number(this.gap) * 2) / labelWidth;
    scale = scale > 1 ? 1 : scale;
    this.renderer.setStyle(this.labelRef.nativeElement, 'transform', `scale(${scale})`);
  }

  imgError() {
    this.isImgError = true;
    this.cdr.detectChanges();
  }
}
