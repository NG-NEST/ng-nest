import { HttpClient, HttpEventType, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  ViewContainerRef,
  inject,
  viewChild,
  signal,
  computed
} from '@angular/core';
import { XUploadPrefix, XUploadNode, XUploadProperty, XUploadPortalPrefix } from './upload.property';
import { XIsArray, XIsEmpty, XIsTemplateRef } from '@ng-nest/ui/core';
import { map } from 'rxjs/operators';
import { XI18nService, XI18nUpload, zh_CN } from '@ng-nest/ui/i18n';
import { XPortalOverlayRef, XPortalService } from '@ng-nest/ui/portal';
import { XUploadPortalComponent } from './upload-portal.component';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XImageComponent, XImageGroupComponent } from '@ng-nest/ui/image';
import { XProgressComponent } from '@ng-nest/ui/progress';
import { NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XUploadPrefix}`,
  imports: [
    NgTemplateOutlet,
    XIconComponent,
    XOutletDirective,
    XButtonComponent,
    XImageGroupComponent,
    XImageComponent,
    XProgressComponent
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XUploadComponent)]
})
export class XUploadComponent extends XUploadProperty {
  private http = inject(HttpClient, { optional: true });
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private i18n = inject(XI18nService);

  file = viewChild.required<ElementRef<HTMLInputElement>>('file');
  files = signal<XUploadNode[]>([]);
  showUpload = signal(false);
  uploadNodes = signal<XUploadNode[]>([]);
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.upload as XI18nUpload)), { initialValue: zh_CN.upload });
  portal!: XPortalOverlayRef<XUploadPortalComponent>;

  getText = computed(() => this.text() || this.locale().uploadText);

  isTemplateText = computed(() => XIsTemplateRef(this.getText()));

  override writeValue(value: XUploadNode[]) {
    this.value.set(value);
    this.setFiles();
  }

  acceptSignal = computed(() => {
    if (this.type() === 'img' && XIsEmpty(this.accept())) return 'image/*';
    return this.accept();
  });

  constructor() {
    super();
    if (!this.http) {
      throw new Error(
        `${XUploadPrefix}: Not found 'HttpClient', You can import 'HttpClientModule' in your root module.`
      );
    }
  }

  setFiles() {
    if (!Array.isArray(this.value())) return;
    this.files.set(
      this.value().map((x: XUploadNode) => {
        if (!x.state) x.state = 'success';
        return x;
      })
    );
  }

  change(event: Event) {
    let input = event.target as HTMLInputElement;
    if (typeof input === 'undefined' || input.files?.length === 0) return;
    let files: XUploadNode[] = [];
    let max = this.maxLimit() > -1 ? this.maxLimit() : (input.files as FileList).length;
    for (let i = 0; i < max; i++) {
      let file: XUploadNode = (input.files as FileList).item(i) as XUploadNode;
      file.state = 'ready';
      files = [...files, file];
    }
    if (files.length > 0) this.showUpload.set(true);
    if (this.multipleModel() === 'cover') {
      this.files.set(files);
    } else if (this.multipleModel() === 'add') {
      this.files.update((x) => [...x, ...files]);
    }
    this.value.set(this.files());
    this.onChange && this.onChange(this.value());
    this.onUploading();
    input.value = '';
  }

  remove(file: XUploadNode, index: number) {
    this.files.update((x) => {
      x.splice(index, 1);
      return [...x];
    });
    if (this.files().length === 0) this.file().nativeElement.value = '';
    this.showUpload.set(this.files().find((x) => x.state === 'ready') != null);
    const vindex = this.value().indexOf(file);
    if (vindex > -1) {
      this.value.update((x) => {
        x.splice(vindex, 1);
        return [...x];
      });
      this.onChange && this.onChange(this.value());
    }
    this.removeClick.emit({ file: file, index: index });
  }

  uploadClick() {
    if (this.disabledComputed()) return;
    this.file().nativeElement.click();
  }

  onUploading() {
    if (!this.action()) return;
    let readyFiles = this.files().filter((x) => x.state === 'ready');
    readyFiles.forEach((x) => {
      this.uploadFile(x);
    });
  }

  uploadFile(file: XUploadNode, index = -1) {
    let formData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', this.action()!, formData, {
      reportProgress: true,
      responseType: 'arraybuffer',
      withCredentials: false,
      headers: new HttpHeaders(this.headers())
    });
    this.http
      ?.request(req)
      .pipe(
        map((event) =>
          this.getEventMessage(event, file, (body: BlobPart) => {
            let blob = new Blob([body]);
            let reader = new FileReader();
            reader.readAsText(blob, 'utf-8');
            reader.onload = () => {
              let body = [];
              try {
                body = JSON.parse(reader.result as string);
                if (XIsArray(body) && body.length > 0) {
                  file.url = body[0] as string;
                }
                file.body = body;
              } catch (e) {
                console.error(e);
              }
              if (index !== -1) {
                this.files.update((x) => {
                  x[index] = file;
                  return [...x];
                });
              }
              this.uploadSuccess.emit(file);
            };
          })
        )
      )
      .subscribe({
        complete: () => {
          this.showUpload.set(this.files().find((y) => y.state === 'ready') != null);
        },
        error: () => {
          file.state = 'error';
          this.uploadError.emit(file);
        }
      });
  }

  getEventMessage(event: HttpEvent<any>, file: XUploadNode, successFunc: Function) {
    switch (event.type) {
      case HttpEventType.Sent:
        file.state = 'ready';
        this.uploadReady.emit(file);
        return this.locale().beginUploadText;
      case HttpEventType.UploadProgress:
        file.state = 'uploading';
        if (event.total) file.percent = Math.round((100 * event.loaded) / event.total);
        this.uploading.emit(file);
        return this.locale().uploadingText;
      case HttpEventType.Response:
        file.state = 'success';
        successFunc(event.body);
        return this.locale().uploadCompleted;
    }
    return;
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
    this.setInstance(file, index);
  }

  setInstance(file: XUploadNode, index: number) {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    componentRef.setInput('file', file);
    const { closePortal, surePortal } = componentRef.instance;
    closePortal.subscribe(() => this.closePortal());
    surePortal.subscribe((blob) => {
      const fl = new File([blob], file.name, { type: blob.type }) as XUploadNode;
      fl.state = 'ready';
      this.uploadFile(fl, index);
    });
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.detach();
      return true;
    }
    return false;
  }

  imgError(_event: ErrorEvent, file: XUploadNode) {
    file.state = 'error';
  }
  imgLoad(file: XUploadNode) {
    file.state = 'success';
  }
}
