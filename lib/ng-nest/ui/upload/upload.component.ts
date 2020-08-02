import { HttpClient, HttpEventType, HttpRequest, HttpEvent } from '@angular/common/http';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { XUploadPrefix, XUploadNode, XUploadProperty } from './upload.property';
import { XValueAccessor } from '@ng-nest/ui/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { XI18nService } from '@ng-nest/ui/i18n';

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

  private _unSubject = new Subject<void>();

  writeValue(value: XUploadNode[]) {
    this.value = value;
    this.cdr.detectChanges();
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public http: HttpClient,
    public cdr: ChangeDetectorRef,
    public i18n: XI18nService
  ) {
    super();
  }

  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntil(this._unSubject)).subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestory() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  change(event: Event) {
    let input = event.target as HTMLInputElement;
    if (typeof input === 'undefined') return;
    let files: XUploadNode[] = [];
    for (let i = 0; i < (input.files as FileList).length; i++) {
      let file: XUploadNode = (input.files as FileList).item(i) as XUploadNode;
      file.state = 'ready';
      files = [...files, file];
    }
    if (files.length > 0) this.showUpload = true;
    this.files = files;
    this.uploading();
    this.cdr.detectChanges();
  }

  remove(file: XUploadNode, index: number) {
    this.files.splice(index, 1);
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
}
