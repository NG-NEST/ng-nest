import { Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
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
  @ViewChild('cutRef') cutRef: ElementRef;
  ready = false;

  closePortal: () => void;
  destroyPortal: () => void;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setCut();
  }

  setCut() {
    const width = this.imgRef.nativeElement.clientWidth;
    const height = this.imgRef.nativeElement.clientHeight;
    this.renderer.setStyle(this.cutRef.nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.cutRef.nativeElement, 'height', `${height}px`);
    this.renderer.setStyle(this.imgRef.nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.imgRef.nativeElement, 'height', `${height}px`);
    this.ready = true;
    this.cdr.detectChanges();
  }
}
