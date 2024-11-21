import { DOCUMENT } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  inject,
  AfterViewInit,
  OnDestroy,
  input,
  computed,
  viewChild,
  signal,
  output
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { XClamp } from '@ng-nest/ui/core';
import { XUploadCutType, XUploadNode, XUploadPortalPrefix } from './upload.property';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: `${XUploadPortalPrefix}`,
  imports: [XIconComponent],
  templateUrl: './upload-portal.component.html',
  styleUrls: ['./upload-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XUploadPortalComponent implements AfterViewInit, OnDestroy {
  file = input<XUploadNode>();
  name = computed(() => {
    return this.file()?.name;
  });
  url = computed(() => {
    return this.file()?.url;
  });
  imgRef = viewChild.required<ElementRef<HTMLElement>>('imgRef');
  imgClipRef = viewChild.required<ElementRef<HTMLElement>>('imgClipRef');
  boundaryRef = viewChild.required<ElementRef<HTMLElement>>('boundaryRef');
  cutRef = viewChild.required<ElementRef<HTMLElement>>('cutRef');
  ready = signal(false);
  cutType = signal<XUploadCutType>('');
  proportion = signal(1);
  originalSize = {
    width: 0,
    height: 0
  };
  boundaryBox = {
    width: 0,
    height: 0
  };
  cutBox = {
    width: 0,
    height: 0,
    x: 0,
    y: 0
  };
  clipRect!: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  doc = inject(DOCUMENT);

  closePortal = output<void>();
  surePortal = output<Blob>();
  private unSubject = new Subject<void>();
  private renderer = inject(Renderer2);

  ngAfterViewInit() {
    this.setCut();
  }

  ngOnDestroy() {
    this.unSubject.next();
    this.unSubject.complete();
  }

  setCut() {
    let width = this.imgRef().nativeElement.clientWidth;
    let height = this.imgRef().nativeElement.clientHeight;
    this.renderer.setStyle(this.cutRef().nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.cutRef().nativeElement, 'height', `${height}px`);
    this.renderer.setStyle(this.boundaryRef().nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.boundaryRef().nativeElement, 'height', `${height}px`);
    this.renderer.setStyle(this.imgRef().nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.imgRef().nativeElement, 'height', `${height}px`);
    this.renderer.setStyle(this.imgClipRef().nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.imgClipRef().nativeElement, 'height', `${height}px`);
    this.cutBox.width = width;
    this.cutBox.height = height;
    this.boundaryBox = { width, height };
    this.clipRect = {
      top: 0,
      right: width,
      bottom: height,
      left: 0
    };
    this.setOriginalSize();
    this.ready.set(true);

    const mouseDown = fromEvent<MouseEvent>(this.cutRef().nativeElement, 'mousedown').pipe(takeUntil(this.unSubject));

    mouseDown.subscribe((downMe: MouseEvent) => {
      let x = downMe.pageX;
      let y = downMe.pageY;
      let offsetX = 0;
      let offsetY = 0;
      const _unSub = new Subject<void>();
      let className = (downMe.target as HTMLDivElement).className;
      const spt = `${XUploadPortalPrefix}-cut-`;
      if (className.includes(spt)) {
        this.cutType.set(className.replace(spt, '') as XUploadCutType);
      }
      fromEvent<MouseEvent>(this.doc.documentElement, 'mousemove')
        .pipe(takeUntil(_unSub))
        .subscribe((moveMe: MouseEvent) => {
          offsetX = moveMe.pageX - x;
          offsetY = moveMe.pageY - y;
          x = moveMe.pageX;
          y = moveMe.pageY;
          this.setCutEle(this.cutType(), offsetX, offsetY);
        });
      fromEvent<MouseEvent>(this.doc.documentElement, 'mouseup')
        .pipe(takeUntil(_unSub))
        .subscribe(() => {
          this.cutType.set('');
          _unSub.next();
          _unSub.complete();
        });
    });
  }

  setOriginalSize() {
    const img = new Image();
    img.src = this.url()!;
    img.onload = () => {
      this.originalSize = { width: img.width, height: img.height };
      this.proportion.set(this.boundaryBox.width / this.originalSize.width);
    };
  }

  setCutEle(position: XUploadCutType, x: number, y: number) {
    switch (position) {
      case 'top-start':
        this.cutBox.width -= x;
        this.cutBox.height -= y;
        this.cutBox.x += x;
        this.cutBox.y += y;
        break;
      case 'top':
        this.cutBox.height -= y;
        this.cutBox.y += y;
        break;
      case 'top-end':
        this.cutBox.width += x;
        this.cutBox.height -= y;
        this.cutBox.y += y;
        break;
      case 'right':
        this.cutBox.width += x;
        break;
      case 'bottom-end':
        this.cutBox.width += x;
        this.cutBox.height += y;
        break;
      case 'bottom':
        this.cutBox.height += y;
        break;
      case 'bottom-start':
        this.cutBox.width -= x;
        this.cutBox.height += y;
        this.cutBox.x += x;
        break;
      case 'left':
        this.cutBox.width -= x;
        this.cutBox.x += x;
        break;
      case '':
        this.cutBox.x += x;
        this.cutBox.y += y;
        break;
    }
    const boundaryRect = this.boundaryRef().nativeElement.getBoundingClientRect();

    const maxY = boundaryRect.height - this.cutBox.height;
    const maxX = boundaryRect.width - this.cutBox.width;

    this.cutBox.x = XClamp(this.cutBox.x, 0, maxX);
    this.cutBox.y = XClamp(this.cutBox.y, 0, maxY);

    // const maxWidth = boundaryRect.height - this.cutBox.y;
    // const maxHeight = boundaryRect.width - this.cutBox.x;

    // this.cutBox.width = XClamp(this.cutBox.width, 0, maxWidth);
    // this.cutBox.height = XClamp(this.cutBox.width, 0, maxHeight);

    this.clipRect = {
      top: this.cutBox.y,
      right: this.cutBox.width + this.cutBox.x,
      bottom: this.cutBox.height + this.cutBox.y,
      left: this.cutBox.x
    };
    this.renderer.setStyle(
      this.imgClipRef().nativeElement,
      'clip',
      `rect(${this.clipRect.top}px,${this.clipRect.right}px,${this.clipRect.bottom}px,${this.clipRect.left}px)`
    );
    this.renderer.setStyle(this.cutRef().nativeElement, 'width', `${this.cutBox.width}px`);
    this.renderer.setStyle(this.cutRef().nativeElement, 'height', `${this.cutBox.height}px`);
    this.renderer.setStyle(
      this.cutRef().nativeElement,
      'transform',
      `translate3d(${this.cutBox.x}px, ${this.cutBox.y}px, 0)`
    );
  }

  sure() {
    const canvas = this.doc.createElement('canvas');
    canvas.width = this.cutBox.width / this.proportion();
    canvas.height = this.cutBox.height / this.proportion();
    const context = canvas.getContext('2d')!;
    const img = new Image();
    img.src = this.url()!;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      context.drawImage(img, -this.cutBox.x / this.proportion(), -this.cutBox.y / this.proportion());
      canvas.toBlob((blob) => {
        this.surePortal.emit(blob as Blob);
        this.closePortal.emit();
      });
    };
  }
}
