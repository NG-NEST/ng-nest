import { XButtonModule } from '@ng-nest/ui/button';
import { ComponentFixture, TestBed } from '@angular/core/testing';

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
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, XIconModule, XUploadModule, XButtonModule, XLayoutModule],
      declarations: [TestXUploadComponent, TestXUploadDisabledComponent, TestXUploadImgComponent, TestXUploadImgCutComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXUploadComponent>;
    let upload: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXUploadComponent);
      fixture.detectChanges();
      upload = fixture.debugElement.query(By.directive(XUploadComponent));
    });
    it('should create.', () => {
      expect(upload).toBeDefined();
    });
  });
  describe(`img.`, () => {
    let fixture: ComponentFixture<TestXUploadImgComponent>;
    let upload: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXUploadImgComponent);
      fixture.detectChanges();
      upload = fixture.debugElement.query(By.directive(XUploadComponent));
    });
    it('should create.', () => {
      expect(upload).toBeDefined();
    });
  });
  fdescribe(`imgCut.`, () => {
    let fixture: ComponentFixture<TestXUploadImgCutComponent>;
    let upload: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXUploadImgCutComponent);
      fixture.detectChanges();
      upload = fixture.debugElement.query(By.directive(XUploadComponent));
    });
    it('should create.', () => {
      expect(upload).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXUploadDisabledComponent>;
    let upload: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXUploadDisabledComponent);
      fixture.detectChanges();
      upload = fixture.debugElement.query(By.directive(XUploadComponent));
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
        <x-upload action="http://localhost:3000/upload" [text]="textTpl" type="img" multiple></x-upload>

        <ng-template #textTpl>
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

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-upload action="http://localhost:3000/upload" [text]="textTpl" type="img" [(ngModel)]="files" multiple imgCut></x-upload>

        <ng-template #textTpl>
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
    `
  ]
})
class TestXUploadImgCutComponent {
  files = [
    {
      name: '3.png',
      url: 'http://127.0.0.1:3000/upload/1614515464461-56.png'
    },
    {
      name: '2.png',
      url: 'http://127.0.0.1:3000/upload/1614515464444-2.png'
    },
    {
      name: '4.png',
      url: 'http://127.0.0.1:3000/upload/1614515464469-4.png'
    },
    {
      name: '433.png',
      url: 'http://127.0.0.1:3000/upload/1614515464498-433.png'
    }
  ];
}
