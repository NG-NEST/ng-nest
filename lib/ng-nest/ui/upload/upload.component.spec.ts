import { XButtonModule } from '@ng-nest/ui/button';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XUploadComponent } from './upload.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XUploadModule } from '@ng-nest/ui/upload';
import { FormsModule } from '@angular/forms';
import { XUploadPrefix } from './upload.property';

describe(XUploadPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XUploadModule, XButtonModule, XLayoutModule],
      declarations: [TestXUploadComponent, TestXUploadDisabledComponent]
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
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXUploadDisabledComponent {
  model: any;
}
