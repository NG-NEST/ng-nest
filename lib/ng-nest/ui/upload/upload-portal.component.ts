import { DOCUMENT } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  Inject
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { XUploadCutType, XUploadNode, XUploadPortalPrefix } from './upload.property';

@Component({
  selector: `${XUploadPortalPrefix}`,
  templateUrl: './upload-portal.component.html',
  styleUrls: ['./upload-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XUploadPortalComponent {
  file: XUploadNode;
  @ViewChild('imgRef') imgRef: ElementRef;
  @ViewChild('boundaryRef') boundaryRef: ElementRef;
  @ViewChild('cutRef') cutRef: ElementRef;
  ready = false;
  cutType: XUploadCutType = '';
  boundaryBox: {
    width: 0;
    height: 0;
  };
  cutBox = {
    width: 0,
    height: 0,
    x: 0,
    y: 0
  };

  doc: Document;

  closePortal: () => void;
  destroyPortal: () => void;
  private _unSubject = new Subject<void>();

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) document: any) {
    this.doc = document;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.setCut();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.complete();
  }

  setCut() {
    let width = this.imgRef.nativeElement.clientWidth;
    let height = this.imgRef.nativeElement.clientHeight;
    this.renderer.setStyle(this.cutRef.nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.cutRef.nativeElement, 'height', `${height}px`);
    this.renderer.setStyle(this.boundaryRef.nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.boundaryRef.nativeElement, 'height', `${height}px`);
    this.renderer.setStyle(this.imgRef.nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.imgRef.nativeElement, 'height', `${height}px`);
    this.ready = true;
    this.cutBox.width = width;
    this.cutBox.height = height;
    this.cdr.detectChanges();

    const mouseDown = fromEvent<MouseEvent>(this.cutRef.nativeElement, 'mousedown');

    mouseDown.subscribe((downMe: MouseEvent) => {
      let x = downMe.pageX;
      let y = downMe.pageY;
      let offsetX = 0;
      let offsetY = 0;
      const _unSub = new Subject<void>();
      let className = (downMe.target as HTMLDivElement).className;
      const spt = `${XUploadPortalPrefix}-cut-`;
      if (className.includes(spt)) {
        this.cutType = className.replace(spt, '') as XUploadCutType;
        this.cdr.detectChanges();
      }
      // if (this.cutType) {
      fromEvent<MouseEvent>(this.doc.documentElement, 'mousemove')
        .pipe(takeUntil(_unSub))
        .subscribe((moveMe: MouseEvent) => {
          offsetX = moveMe.pageX - x;
          offsetY = moveMe.pageY - y;
          x = moveMe.pageX;
          y = moveMe.pageY;
          this.setCutEle(this.cutType, offsetX, offsetY);
        });
      fromEvent<MouseEvent>(this.doc.documentElement, 'mouseup')
        .pipe(takeUntil(_unSub))
        .subscribe((x) => {
          this.cutType = '';
          this.cdr.detectChanges();
          _unSub.next();
          _unSub.complete();
        });
      // }
    });
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

    this.renderer.setStyle(this.cutRef.nativeElement, 'width', `${this.cutBox.width}px`);
    this.renderer.setStyle(this.cutRef.nativeElement, 'height', `${this.cutBox.height}px`);
    this.renderer.setStyle(this.cutRef.nativeElement, 'transform', `translate3d(${this.cutBox.x}px, ${this.cutBox.y}px, 0)`);
  }
}
