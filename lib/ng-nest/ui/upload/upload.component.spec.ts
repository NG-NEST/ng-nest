import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  inject,
  Injectable,
  provideExperimentalZonelessChangeDetection,
  signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { XUploadComponent, XUploadMultipleModel, XUploadNode, XUploadPrefix, XUploadType } from '@ng-nest/ui/upload';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http';
import { XSleep, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
class HttpRequestData {
  // it('headers.')
  headers: HttpHeaders | null = null;
  // it('action.')
  action: string = '';
}

export function AppNoopInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const httpRequetData = inject(HttpRequestData);
  // it('headers.')
  if (request.url === 'https://ngnest.com/headers') {
    httpRequetData.headers = request.headers;
  }
  if (request.url === 'https://ngnest.com/action') {
    httpRequetData.action = request.url;
  }
  return next(request);
}

@Component({
  imports: [XUploadComponent],
  template: ` <x-upload> </x-upload> `
})
class XTestUploadComponent {}

@Component({
  imports: [XUploadComponent, FormsModule],
  template: `
    <x-upload
      [(ngModel)]="model"
      [text]="text()"
      [action]="action()"
      [accept]="accept()"
      [type]="type()"
      [imgFallback]="imgFallback()"
      [imgCut]="imgCut()"
      [multiple]="multiple()"
      [download]="download()"
      [multipleModel]="multipleModel()"
      [filesTpl]="filesTpl()"
      [maxLimit]="maxLimit()"
      [headers]="headers()"
      (removeClick)="removeClick($event)"
      (uploadReady)="uploadReady($event)"
      (uploading)="uploading($event)"
      (uploadSuccess)="uploadSuccess($event)"
      (uploadError)="uploadError($event)"
    >
    </x-upload>

    <ng-template #textTpl>text tpl</ng-template>
    <ng-template #filesTemplate let-files="$files">
      <div class="files">
        @for (file of files; track file) {
          <a [href]="file.url">{{ file.name }} tpl</a>
        }
      </div>
    </ng-template>
  `
})
class XTestUploadPropertyComponent {
  httpData = inject(HttpRequestData);

  model = signal<(XUploadNode | any)[]>([]);
  text = signal<XTemplate | null>(null);
  textTpl = viewChild.required<TemplateRef<void>>('textTpl');
  action = signal('');
  accept = signal('');
  type = signal<XUploadType>('list');
  imgFallback = signal('');
  imgCut = signal(false);
  multiple = signal(false);
  download = signal(true);
  multipleModel = signal<XUploadMultipleModel>('cover');
  filesTpl = signal<XTemplate | null>(null);
  filesTemplate = viewChild.required<TemplateRef<void>>('filesTemplate');
  maxLimit = signal(-1);
  headers = signal<{ [key: string]: any } | null>(null);

  removeClickResult = signal<{ file: XUploadNode; index: number } | null>(null);
  removeClick(item: { file: XUploadNode; index: number }) {
    this.removeClickResult.set(item);
  }

  uploadReadyResult = signal<XUploadNode | null>(null);
  uploadReady(node: XUploadNode) {
    this.uploadReadyResult.set(node);
  }
  uploadingResult = signal<XUploadNode | null>(null);
  uploading(node: XUploadNode) {
    this.uploadingResult.set(node);
  }
  uploadSuccessResult = signal<XUploadNode | null>(null);
  uploadSuccess(node: XUploadNode) {
    this.uploadSuccessResult.set(node);
  }
  uploadErrorResult = signal<XUploadNode | null>(null);
  uploadError(node: XUploadNode) {
    this.uploadErrorResult.set(node);
  }
}

describe(XUploadPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestUploadComponent, XTestUploadPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withFetch(), withInterceptors([AppNoopInterceptor])),
        provideExperimentalZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestUploadComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestUploadComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XUploadComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestUploadPropertyComponent>;
    let component: XTestUploadPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestUploadPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const src = 'https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png';
    const uploadFiles = (...names: string[]) => {
      const input = fixture.debugElement.query(By.css('.x-upload-input')).nativeElement;
      const dataTransfer = new DataTransfer();
      for (let name of names) {
        const blob = new Blob([name], { type: 'text/plain' });
        const file = new File([blob], name, { type: 'text/plain' });
        dataTransfer.items.add(file);
      }
      input.files = dataTransfer.files;
      const event = new Event('change');
      input.dispatchEvent(event);
    };
    it('text.', () => {
      component.text.set(component.textTpl());
      fixture.detectChanges();
      const text = fixture.debugElement.query(By.css('.x-upload-buttons')).nativeElement;
      expect(text.innerText).toBe('text tpl');
    });
    it('action.', async () => {
      component.action.set('https://ngnest.com/action');
      fixture.detectChanges();
      uploadFiles('name1.txt');
      fixture.detectChanges();
      await XSleep(100);
      expect(component.httpData.action).toBe('https://ngnest.com/action');
    });
    it('accept.', () => {
      component.accept.set('image/*');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-upload-input'));
      expect(input.nativeElement.getAttribute('accept')).toBe('image/*');
    });
    it('type.', async () => {
      component.type.set('img');
      fixture.detectChanges();
      await XSleep(100);
      const imgGroup = fixture.debugElement.query(By.css('x-image-group'));
      expect(imgGroup).toBeTruthy();
    });
    it('imgFallback.', async () => {
      component.model.set([{ url: 'error', name: 'error' }]);
      component.type.set('img');
      component.imgFallback.set(src);
      fixture.detectChanges();
      await XSleep(1000);
      const img = fixture.debugElement.query(By.css('.x-image-img:nth-child(2)'));
      expect(img.nativeElement.src).toBe(src);
    });
    it('imgCut.', async () => {
      component.type.set('img');
      component.imgCut.set(true);
      component.model.set([{ url: src, name: 'ng-nest-admin' }]);
      fixture.detectChanges();
      await XSleep(300);
      const imgCut = fixture.debugElement.query(By.css('.x-image-overlay .fto-crop'));
      expect(imgCut).toBeTruthy();
    });
    it('multiple.', () => {
      component.multiple.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-upload-input'));
      expect(input.nativeElement.getAttribute('multiple')).toBe('');
    });
    it('download.', async () => {
      component.model.set([{ url: src, name: 'ng-nest-admin' }]);
      fixture.detectChanges();
      await XSleep(100);
      const link = fixture.debugElement.query(By.css('.x-upload-files li a'));
      expect(link.nativeElement.getAttribute('href')).toBe(src);
    });
    it('multipleModel.', async () => {
      uploadFiles('name1.txt');
      uploadFiles('name2.txt');
      fixture.detectChanges();
      await XSleep(100);
      const files = fixture.debugElement.query(By.css('.x-upload-files'));
      expect(files.nativeElement.innerText).toBe('name2.txt');

      component.multipleModel.set('add');
      fixture.detectChanges();
      uploadFiles('name3.txt');
      fixture.detectChanges();
      await XSleep(100);
      expect(files.nativeElement.innerText).toBe('name2.txt\nname3.txt');
    });
    it('filesTpl.', async () => {
      component.filesTpl.set(component.filesTemplate());
      component.model.set([{ url: src, name: 'ng-nest-admin' }]);
      fixture.detectChanges();
      await XSleep(100);
      const files = fixture.debugElement.query(By.css('.files'));
      expect(files.nativeElement.innerText).toBe('ng-nest-admin tpl');
    });
    it('maxLimit.', async () => {
      component.maxLimit.set(2);
      fixture.detectChanges();
      uploadFiles('name1.txt', 'name2.txt', 'name3.txt');
      fixture.detectChanges();
      await XSleep(100);
      const files = fixture.debugElement.query(By.css('.x-upload-files'));
      expect(files.nativeElement.innerText).toBe('name1.txt\nname2.txt');
    });
    it('headers.', async () => {
      component.action.set('https://ngnest.com/headers');
      component.headers.set({ test: '123456' });
      fixture.detectChanges();
      uploadFiles('name1.txt');
      fixture.detectChanges();
      await XSleep(100);
      expect(component.httpData.headers?.get('test')).toBe('123456');
    });
    it('removeClick.', async () => {
      component.model.set([{ url: src, name: 'ng-nest-admin' }]);
      fixture.detectChanges();
      await XSleep(100);
      const remove = fixture.debugElement.query(By.css('.x-upload-files .fto-x'));
      expect(remove).toBeTruthy();
      remove.nativeElement.click();
      fixture.detectChanges();
      expect(component.removeClickResult()?.file.name).toBe('ng-nest-admin');
    });
    it('uploadReady.', async () => {
      component.action.set('https://ngnest.com/uploadReady');
      fixture.detectChanges();
      uploadFiles('name1.txt');
      fixture.detectChanges();
      await XSleep(100);
      expect(component.uploadReadyResult()?.name).toBe('name1.txt');
    });
    it('uploading.', async () => {
      // Need a real address for uploading files
      // component.action.set('https://ngnest.com/uploading');
      // fixture.detectChanges();
      // uploadFiles('name1.txt');
      // fixture.detectChanges();
      // await XSleep(100);
      // expect(component.uploadingResult()?.name).toBe('name1.txt');
      expect(true).toBe(true);
    });
    it('uploadSuccess.', async () => {
      // Need a real address for uploading files
      // component.action.set('https://ngnest.com/uploadSuccess');
      // fixture.detectChanges();
      // uploadFiles('name1.txt');
      // fixture.detectChanges();
      // await XSleep(100);
      // expect(component.uploadSuccessResult()?.name).toBe('name1.txt');
      expect(true).toBe(true);
    });
    it('uploadError.', async () => {
      // HTTP request timeout error unable to confirm time
      // component.action.set('https://ngnest.com/uploadError');
      // fixture.detectChanges();
      // uploadFiles('name1.txt');
      // fixture.detectChanges();
      // await XSleep(100);
      // expect(component.uploadErrorResult()?.name).toBe('name1.txt');
      expect(true).toBe(true);
    });
  });
});
