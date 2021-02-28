import { XButtonModule } from '@ng-nest/ui/button';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XUploadComponent } from './upload.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XUploadModule } from '@ng-nest/ui/upload';
import { FormsModule } from '@angular/forms';
import { XUploadPrefix } from './upload.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XIconModule } from '@ng-nest/ui/icon';

describe(XUploadPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, XIconModule, XUploadModule, XButtonModule, XLayoutModule],
      declarations: [TestXUploadComponent, TestXUploadDisabledComponent, TestXUploadImgComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXUploadComponent>;
    let upload: DebugElement;
    let testComponent: TestXUploadComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXUploadComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      upload = fixture.debugElement.query(By.directive(XUploadComponent));
      element = upload.nativeElement;
    });
    it('should create.', () => {
      expect(upload).toBeDefined();
    });
  });
  fdescribe(`img.`, () => {
    let fixture: ComponentFixture<TestXUploadImgComponent>;
    let upload: DebugElement;
    let testComponent: TestXUploadImgComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXUploadImgComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      upload = fixture.debugElement.query(By.directive(XUploadComponent));
      element = upload.nativeElement;
    });
    it('should create.', () => {
      expect(upload).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXUploadDisabledComponent>;
    let upload: DebugElement;
    let testComponent: TestXUploadDisabledComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXUploadDisabledComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      upload = fixture.debugElement.query(By.directive(XUploadComponent));
      element = upload.nativeElement;
    });
    it('should create.', () => {
      expect(upload).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-upload action="http://localhost:3000/upload" multiple></x-upload>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
      x-row > x-col {
        width: 14rem;
      }
    `
  ]
})
class TestXUploadComponent {
  model = [];
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-upload disabled></x-upload>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXUploadDisabledComponent {
  model: any;
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-upload action="http://localhost:3000/upload" label="shangchuan" multiple></x-upload>
      </x-col>
      <x-col span="24">
        <x-upload action="http://localhost:3000/upload" [label]="labelTpl" type="img" multiple></x-upload>

        <ng-template #labelTpl>
          <x-icon class="upload-icon" type="fto-upload"></x-icon>
          <span>选择图片</span>
        </ng-template>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .upload-icon {
        font-size: 1.325rem;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
      x-row > x-col {
        width: 14rem;
      }
    `
  ]
})
class TestXUploadImgComponent {
  model = [];
}
