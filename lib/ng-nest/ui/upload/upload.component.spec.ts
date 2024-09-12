import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XUploadComponent, XUploadMultipleModel, XUploadNode, XUploadPrefix, XUploadType } from '@ng-nest/ui/upload';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XUploadComponent],
  template: ` <x-upload> </x-upload> `
})
class XTestUploadComponent {}

@Component({
  standalone: true,
  imports: [XUploadComponent],
  template: `
    <x-upload
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
  `
})
class XTestUploadPropertyComponent {
  text = signal<XTemplate | null>(null);
  action = signal('');
  accept = signal('');
  type = signal<XUploadType>('list');
  imgFallback = signal('');
  imgCut = signal(false);
  multiple = signal(false);
  download = signal(true);
  multipleModel = signal<XUploadMultipleModel>('cover');
  filesTpl = signal<XTemplate | null>(null);
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
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
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
    // let component: XTestUploadPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestUploadPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('text.', () => {
      expect(true).toBe(true);
    });
    it('action.', () => {
      expect(true).toBe(true);
    });
    it('accept.', () => {
      expect(true).toBe(true);
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('imgFallback.', () => {
      expect(true).toBe(true);
    });
    it('imgCut.', () => {
      expect(true).toBe(true);
    });
    it('multiple.', () => {
      expect(true).toBe(true);
    });
    it('download.', () => {
      expect(true).toBe(true);
    });
    it('multipleModel.', () => {
      expect(true).toBe(true);
    });
    it('filesTpl.', () => {
      expect(true).toBe(true);
    });
    it('maxLimit.', () => {
      expect(true).toBe(true);
    });
    it('headers.', () => {
      expect(true).toBe(true);
    });
    it('removeClick.', () => {
      expect(true).toBe(true);
    });
    it('uploadReady.', () => {
      expect(true).toBe(true);
    });
    it('uploading.', () => {
      expect(true).toBe(true);
    });
    it('uploadSuccess.', () => {
      expect(true).toBe(true);
    });
    it('uploadError.', () => {
      expect(true).toBe(true);
    });
  });
});
