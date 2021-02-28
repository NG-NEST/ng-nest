import { HttpClient, HttpEventType, HttpRequest, HttpEvent } from '@angular/common/http';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { XUploadPrefix, XUploadNode, XUploadProperty, XUploadPortalPrefix } from './upload.property';
import { XIsTemplateRef, XValueAccessor } from '@ng-nest/ui/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { XI18nService, XI18nUpload } from '@ng-nest/ui/i18n';
import { XPortalOverlayRef, XPortalService } from '@ng-nest/ui/portal';
import { XUploadPortalComponent } from './upload-portal.component';

@Component({
  selector: `${XUploadPrefix}`,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XUploadComponent)]
})
export class XUploadComponent extends XUploadProperty {
  @ViewChild('file', { static: true }) file: ElementRef;
  files: XUploadNode[] = [];
  showUpload = false;
  uploadNodes: XUploadNode[] = [];
  locale: XI18nUpload = {};
  portal: XPortalOverlayRef<XUploadPortalComponent>;

  get getLabel() {
    return this.label || this.locale.uploadText;
  }

  get isTemplateLabel() {
    return XIsTemplateRef(this.getLabel);
  }

  private _unSubject = new Subject<void>();

  writeValue(value: XUploadNode[]) {
    this.value = value;
    this.setFiles();
    this.cdr.detectChanges();
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public http: HttpClient,
    public cdr: ChangeDetectorRef,
    public portalService: XPortalService,
    public viewContainerRef: ViewContainerRef,
    public i18n: XI18nService
  ) {
    super();
  }

  ngOnInit() {
    this.i18n.localeChange
      .pipe(
        map((x) => x.upload as XI18nUpload),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
    if (this.type === 'img') this.accept = 'image/*';
  }

  ngOnDestory() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setFiles() {
    if (!Array.isArray(this.value)) return;
    this.files = this.value.map((x) => {
      if (!x.state) x.state = 'success';
      return x;
    });
  }

  change(event: Event) {
    let input = event.target as HTMLInputElement;
    if (typeof input === 'undefined' || input.files?.length === 0) return;
    let files: XUploadNode[] = [];
    for (let i = 0; i < (input.files as FileList).length; i++) {
      let file: XUploadNode = (input.files as FileList).item(i) as XUploadNode;
      file.state = 'ready';
      files = [...files, file];
    }
    if (files.length > 0) this.showUpload = true;
    this.files = files;
    this.value = [];
    this.uploading();
    input.value = '';
    this.cdr.detectChanges();
  }

  remove(file: XUploadNode, index: number) {
    this.files.splice(index, 1);
    if (this.files.length === 0) this.file.nativeElement.value = '';
    this.showUpload = this.files.find((x) => x.state === 'ready') != null;
    this.removeClick.emit({ file: file, index: index });
    this.cdr.detectChanges();
  }

  uploadClick() {
    if (this.disabled) return;
    this.file.nativeElement.click();
  }

  uploading() {
    if (!this.action) return;
    let readyFiles = this.files.filter((x) => x.state === 'ready');
    readyFiles.forEach((x) => {
      let formData = new FormData();
      formData.append('file', x);
      const req = new HttpRequest('POST', this.action, formData, {
        reportProgress: true,
        responseType: 'arraybuffer'
      });
      this.http
        .request(req)
        .pipe(
          map((event) =>
            this.getEventMessage(event, x, (body: BlobPart) => {
              let blob = new Blob([body]);
              let reader = new FileReader();
              reader.readAsText(blob, 'utf-8');
              reader.onload = () => {
                x.url = JSON.parse(reader.result as string)[0];
                this.value.push(x);
                this.cdr.detectChanges();
              };
            })
          )
        )
        .subscribe(
          () => {
            this.showUpload = this.files.find((y) => y.state === 'ready') != null;
            this.cdr.detectChanges();
          },
          () => {
            x.state = 'error';
            this.cdr.detectChanges();
          }
        );
    });
  }

  getEventMessage(event: HttpEvent<any>, file: XUploadNode, fun: Function) {
    switch (event.type) {
      case HttpEventType.Sent:
        file.state = 'ready';
        return `开始上传文件`;
      case HttpEventType.UploadProgress:
        file.state = 'uploading';
        if (event.total) file.percent = Math.round((100 * event.loaded) / event.total);
        return `上传中`;
      case HttpEventType.Response:
        file.state = 'success';
        fun(event.body);
        return `文件上传完毕`;
    }
    return;
  }

  trackByItem(index: number, item: XUploadNode) {
    return `${item.name}-${item.lastModified}`;
  }

  onImgCut(file: XUploadNode, index: number) {
    this.portal = this.portalService.attach({
      content: XUploadPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        panelClass: [XUploadPortalPrefix],
        hasBackdrop: true,
        positionStrategy: this.portalService.setPlace('center')
      }
    });
    this.setInstance(file);
  }

  setInstance(file: XUploadNode) {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    Object.assign(componentRef.instance, {
      file: file,
      closePortal: () => this.closePortal(),
      destroyPortal: () => this.destroyPortal()
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.detach();
      this.cdr.detectChanges();
      return true;
    }
    return false;
  }

  destroyPortal() {
    this.portal?.overlayRef?.dispose();
  }
}
