import { XButtonModule } from "@ng-nest/ui/button";
import { Observable } from "rxjs";
import { async, ComponentFixture, TestBed, fakeAsync, flush } from "@angular/core/testing";

import { XUploadComponent } from "./upload.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XFenceModule } from "@ng-nest/ui/fence";
import { XUploadModule } from "./upload.module";
import { FormsModule } from "@angular/forms";
import { XUploadPrefix, XUploadNode } from "./upload.type";
import { XData } from "@ng-nest/ui/core";

describe(XUploadPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XUploadModule, XButtonModule, XFenceModule],
      declarations: [TestXUploadComponent, TestXUploadDisabledComponent, TestXUploadButtonComponent]
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
    it("should create.", () => {
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
    it("should create.", () => {
      expect(upload).toBeDefined();
    });
  });
  describe(`button.`, () => {
    let fixture: ComponentFixture<TestXUploadButtonComponent>;
    let upload: DebugElement;
    let testComponent: TestXUploadButtonComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXUploadButtonComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      upload = fixture.debugElement.query(By.directive(XUploadComponent));
      element = upload.nativeElement;
    });
    it("should create.", () => {
      expect(upload).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-upload></x-upload>
      </x-col>
      <x-col span="24">
        <x-upload [(ngModel)]="model"></x-upload>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
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
      <x-col span="24">
        <x-upload [(ngModel)]="model" disabled></x-upload>
      </x-col>
      <x-col span="24">
        <x-upload></x-upload>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXUploadDisabledComponent {
  model = "钉钉";
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-upload button></x-upload>
      </x-col>
      <x-col span="24">
        <x-upload [(ngModel)]="model" (ngModelChange)="change($event)" button></x-upload>
      </x-col>
      <x-col span="24">
        <x-upload button disabled></x-upload>
      </x-col>
      <x-col span="24">
        <x-upload [(ngModel)]="model" button disabled></x-upload>
      </x-col>
      <x-col span="24">
        <x-upload button></x-upload>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXUploadButtonComponent {
  constructor(public cdr: ChangeDetectorRef) {}

  model = "钉钉";
  change($event) {
    this.cdr.detectChanges();
  }
}
