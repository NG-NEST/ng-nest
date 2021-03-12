import { Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { XCorner, XPosition } from '@ng-nest/ui/core';
import { fromEvent, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { XUploadNode, XUploadPortalPrefix } from './upload.property';

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
  cutChange = false;
  cutType: XPosition | XCorner;
  cutDownEvent: MouseEvent;

  closePortal: () => void;
  destroyPortal: () => void;
  private _unSubject = new Subject<void>();

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setCut();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.complete();
  }

  setCut() {
    const width = this.imgRef.nativeElement.clientWidth;
    const height = this.imgRef.nativeElement.clientHeight;
    this.renderer.setStyle(this.cutRef.nativeElement, 'width', `${width / 2}px`);
    this.renderer.setStyle(this.cutRef.nativeElement, 'height', `${height / 2}px`);
    this.renderer.setStyle(this.boundaryRef.nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.boundaryRef.nativeElement, 'height', `${height}px`);
    this.renderer.setStyle(this.imgRef.nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.imgRef.nativeElement, 'height', `${height}px`);
    this.ready = true;
    this.cdr.detectChanges();

    // fromEvent(this.cutRef.nativeElement, 'mousedown')
    //   .pipe(
    //     map((mouse: MouseEvent) => {
    //       let className = (mouse.target as HTMLDivElement).className;
    //       let position = '';
    //       const spt = `${XUploadPortalPrefix}-cut-`;
    //       if (className.includes(spt)) position = className.replace(spt, '');
    //       return { startX: mouse.clientX, startY: mouse.clientY, position: position };
    //     }),
    //     tap((x) => {
    //       if (x.position) return;
    //     }),
    //     takeUntil(this._unSubject)
    //   )
    //   .subscribe((x) => {
    //     console.log(x);
    //   });
  }

  down(event: MouseEvent, type: XPosition | XCorner) {
    this.cutChange = true;
    this.cutDownEvent = event;
    this.cutType = type;
    this.cdr.detectChanges();
  }

  up(event: MouseEvent, type: XPosition | XCorner) {
    this.cutChange = false;
    this.cdr.detectChanges();
  }

  move(event: MouseEvent, type: XPosition | XCorner) {
    if (this.cutChange) {
      let height = event.clientY - this.cutDownEvent.clientY;
      let width = event.clientX - this.cutDownEvent.clientX;
      console.log(height);
      // this.setCutSize(height);
    }
  }

  setCutSize(height: number = 0, width: number = 0) {
    let ht = this.cutRef.nativeElement.clientHeight;
    let wt = this.cutRef.nativeElement.clientWidth;
    this.renderer.setStyle(this.cutRef.nativeElement, 'height', `${height + ht}px`);
    this.renderer.setStyle(this.cutRef.nativeElement, 'width', `${width + wt}px`);
  }
}
