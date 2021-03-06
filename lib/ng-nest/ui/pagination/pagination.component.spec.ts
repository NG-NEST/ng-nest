import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XPaginationComponent } from './pagination.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPaginationModule } from '@ng-nest/ui/pagination';
import { XPaginationPrefix } from './pagination.property';
import { XI18nService, en_US, zh_CN } from '@ng-nest/ui/i18n';
import { XButtonModule } from '@ng-nest/ui/button';

describe(XPaginationPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XPaginationModule, XButtonModule],
      declarations: [TestXPaginationComponent, TestXPaginationStyleComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXPaginationComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXPaginationComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XPaginationComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  fdescribe(`style.`, () => {
    let fixture: ComponentFixture<TestXPaginationStyleComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXPaginationStyleComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XPaginationComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-pagination',
  template: `
    <x-button (click)="english()">切换为英文</x-button>
    <x-button (click)="chinese()">切换为中文</x-button>
    <div class="row">
      <x-pagination [index]="index" [size]="size" [total]="10" (indexChange)="change($event)"></x-pagination>
    </div>
    <div class="row">
      <x-pagination [index]="index" [size]="size" [total]="20" (indexChange)="change($event)"></x-pagination>
    </div>
    <div class="row">
      <x-pagination [index]="index" [size]="size" [total]="30" (indexChange)="change($event)"></x-pagination>
    </div>
    <x-pagination [index]="index" [size]="size" [total]="40" (indexChange)="change($event)"></x-pagination>
    <x-pagination [index]="index" [size]="size" [total]="50" (indexChange)="change($event)"></x-pagination>
    <x-pagination [index]="index" [size]="size" [total]="60" (indexChange)="change($event)"></x-pagination>
    <x-pagination [index]="index" [size]="size" [total]="70" (indexChange)="change($event)"></x-pagination>
    <x-pagination [index]="index" [size]="size" [total]="80" (indexChange)="change($event)"></x-pagination>
    <x-pagination [index]="index" [size]="size" [total]="90" (indexChange)="change($event)"></x-pagination>
    <x-pagination [index]="index" [size]="size" [total]="100" (indexChange)="change($event)"></x-pagination>
  `,
  styles: [
    `
      :host .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXPaginationComponent {
  index = 1;
  size = 10;
  total = 100;

  constructor(private i18nService: XI18nService, private cdr: ChangeDetectorRef) {}

  change(index: number) {
    // console.log(index);
  }

  english() {
    this.i18nService.setLocale(en_US);
    this.cdr.detectChanges();
  }

  chinese() {
    this.i18nService.setLocale(zh_CN);
    this.cdr.detectChanges();
  }
}

@Component({
  selector: 'test-x-pagination-style',
  template: `
    <x-pagination
      [index]="index"
      [size]="size"
      [total]="total"
      (indexChange)="change($event)"
      hiddenBorder
      showEllipsis="false"
      showTotal="false"
    ></x-pagination>
    <x-pagination
      [index]="index"
      [size]="size"
      [total]="10"
      (indexChange)="change($event)"
      hiddenBorder
      showEllipsis="false"
      showTotal="false"
    ></x-pagination>
    <x-pagination
      [index]="index"
      [size]="size"
      [total]="20"
      (indexChange)="change($event)"
      hiddenBorder
      showEllipsis="false"
      showTotal="false"
    ></x-pagination>
    <x-pagination
      [index]="index"
      [size]="size"
      [total]="30"
      (indexChange)="change($event)"
      hiddenBorder
      showEllipsis="false"
      showTotal="false"
    ></x-pagination>
    <x-pagination
      [index]="index"
      [size]="size"
      [total]="40"
      (indexChange)="change($event)"
      hiddenBorder
      showEllipsis="false"
      showTotal="false"
    ></x-pagination>
    <x-pagination
      [index]="index"
      [size]="size"
      [total]="50"
      (indexChange)="change($event)"
      hiddenBorder
      showEllipsis="false"
      showTotal="false"
    ></x-pagination>
    <x-pagination
      [index]="index"
      [size]="size"
      [total]="60"
      (indexChange)="change($event)"
      hiddenBorder
      showEllipsis="false"
      showTotal="false"
    ></x-pagination>
    <x-pagination
      [index]="index"
      [size]="size"
      [total]="70"
      (indexChange)="change($event)"
      hiddenBorder
      showEllipsis="false"
      showTotal="false"
    ></x-pagination>
    <x-pagination
      [index]="index"
      [size]="size"
      [total]="80"
      (indexChange)="change($event)"
      hiddenBorder
      showEllipsis="false"
      showTotal="false"
    ></x-pagination>
    <x-pagination
      [index]="index"
      [size]="size"
      [total]="90"
      (indexChange)="change($event)"
      hiddenBorder
      showEllipsis="false"
      showTotal="false"
    ></x-pagination>
    <x-pagination
      [index]="index"
      [size]="size"
      [total]="100"
      (indexChange)="change($event)"
      hiddenBorder
      showEllipsis="false"
      showTotal="false"
      pageLinkSize="1"
    ></x-pagination>
    <x-pagination
      [index]="index"
      [size]="size"
      [total]="100"
      (indexChange)="change($event)"
      hiddenBorder
      showEllipsis="false"
      showTotal="false"
      pageLinkSize="3"
    ></x-pagination>
    <x-pagination
      [index]="index"
      [size]="size"
      [total]="100"
      (indexChange)="change($event)"
      hiddenBorder
      showEllipsis="false"
      showTotal="false"
      pageLinkSize="7"
    ></x-pagination>
  `
})
class TestXPaginationStyleComponent {
  index = 1;
  size = 10;
  total = 100;

  constructor(private i18nService: XI18nService, private cdr: ChangeDetectorRef) {}

  change(index: number) {
    // console.log(index);
  }

  english() {
    this.i18nService.setLocale(en_US);
    this.cdr.detectChanges();
  }

  chinese() {
    this.i18nService.setLocale(zh_CN);
    this.cdr.detectChanges();
  }
}
