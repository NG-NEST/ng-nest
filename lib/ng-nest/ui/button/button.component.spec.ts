import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XButtonComponent } from "./button.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XButtonModule } from "./button.module";
import { XButtonPrefix } from "./button.type";

describe(XButtonPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XButtonModule],
      declarations: [
        TestXButtonComponent,
        TestXButtonDiabledComponent,
        TestXButtonTextComponent,
        TestXButtonIconComponent,
        TestXButtonGroupComponent,
        TestXButtonLoadingComponent,
        TestXButtonSizeComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXButtonComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXButtonComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXButtonDiabledComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXButtonDiabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`text.`, () => {
    let fixture: ComponentFixture<TestXButtonTextComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXButtonTextComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`icon.`, () => {
    let fixture: ComponentFixture<TestXButtonIconComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXButtonIconComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`group.`, () => {
    let fixture: ComponentFixture<TestXButtonGroupComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXButtonGroupComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`loading.`, () => {
    let fixture: ComponentFixture<TestXButtonLoadingComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXButtonLoadingComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`size.`, () => {
    let fixture: ComponentFixture<TestXButtonSizeComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXButtonSizeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XButtonComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-x-button",
  template: `
    <div class="row">
      <x-button label="默认按钮"></x-button>
      <x-button label="主要按钮" type="primary"></x-button>
      <x-button label="成功按钮" type="success"></x-button>
      <x-button label="警告按钮" type="warning"></x-button>
      <x-button label="危险按钮" type="danger"></x-button>
      <x-button label="信息按钮" type="info"></x-button>
    </div>
    <div class="row">
      <x-button label="朴素按钮" plain></x-button>
      <x-button label="主要按钮" type="primary" plain></x-button>
      <x-button label="成功按钮" type="success" plain></x-button>
      <x-button label="警告按钮" type="warning" plain></x-button>
      <x-button label="危险按钮" type="danger" plain></x-button>
      <x-button label="信息按钮" type="info" plain></x-button>
    </div>
    <div class="row">
      <x-button label="圆角按钮" round></x-button>
      <x-button label="主要按钮" type="primary" round></x-button>
      <x-button label="成功按钮" type="success" round></x-button>
      <x-button label="警告按钮" type="warning" round></x-button>
      <x-button label="危险按钮" type="danger" round></x-button>
      <x-button label="信息按钮" type="info" round></x-button>
    </div>
    <div class="row">
      <x-button icon="fto-search" circle></x-button>
      <x-button icon="fto-edit-3" type="primary" circle></x-button>
      <x-button icon="fto-check" type="success" circle></x-button>
      <x-button icon="fto-star" type="warning" circle></x-button>
      <x-button icon="fto-trash-2" type="danger" circle></x-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > x-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXButtonComponent {}

@Component({
  selector: "test-x-disabled-button",
  template: `
    <div class="row">
      <x-button label="默认按钮" disabled></x-button>
      <x-button label="主要按钮" type="primary" disabled></x-button>
      <x-button label="成功按钮" type="success" disabled></x-button>
      <x-button label="警告按钮" type="warning" disabled></x-button>
      <x-button label="危险按钮" type="danger" disabled></x-button>
    </div>
    <div class="row">
      <x-button label="朴素按钮" plain disabled></x-button>
      <x-button label="主要按钮" type="primary" plain disabled></x-button>
      <x-button label="成功按钮" type="success" plain disabled></x-button>
      <x-button label="警告按钮" type="warning" plain disabled></x-button>
      <x-button label="危险按钮" type="danger" plain disabled></x-button>
    </div>
    <div class="row">
      <x-button label="圆角按钮" round disabled></x-button>
      <x-button label="主要按钮" type="primary" round disabled></x-button>
      <x-button label="成功按钮" type="success" round disabled></x-button>
      <x-button label="警告按钮" type="warning" round disabled></x-button>
      <x-button label="危险按钮" type="danger" round disabled></x-button>
    </div>
    <div class="row">
      <x-button icon="fto-search" circle disabled></x-button>
      <x-button icon="fto-edit-3" type="primary" circle disabled></x-button>
      <x-button icon="fto-check" type="success" circle disabled></x-button>
      <x-button icon="fto-star" type="warning" circle disabled></x-button>
      <x-button icon="fto-trash-2" type="danger" circle disabled></x-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > x-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXButtonDiabledComponent {}

@Component({
  selector: "test-x-text-button",
  template: `
    <div class="row">
      <x-button label="文字按钮" type="text"></x-button>
      <x-button label="文字按钮" type="text" disabled></x-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > x-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXButtonTextComponent {}

@Component({
  selector: "test-x-icon-button",
  template: `
    <div class="row">
      <x-button icon="fto-edit-3" onlyIcon></x-button>
      <x-button icon="fto-edit-3" type="primary"></x-button>
      <x-button icon="fto-share" type="primary"></x-button>
      <x-button icon="fto-trash-2" type="primary"></x-button>
      <x-button label="搜索" icon="fto-search" type="primary"></x-button>
      <x-button label="上传" icon="fto-upload-cloud" direction="row-reverse" type="primary"></x-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > x-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXButtonIconComponent {}

@Component({
  selector: "test-x-group-button",
  template: `
    <div class="row">
      <x-buttons>
        <x-button label="A"></x-button>
        <x-button label="B"></x-button>
        <x-button label="C"></x-button>
        <x-button label="D"></x-button>
      </x-buttons>
      <x-buttons>
        <x-button label="上一页" icon="fto-chevron-left"></x-button>
        <x-button label="下一页" icon="fto-chevron-right" direction="row-reverse"></x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3"></x-button>
        <x-button icon="fto-share"></x-button>
        <x-button icon="fto-trash-2"></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button label="A" type="primary"></x-button>
        <x-button label="B" type="primary"></x-button>
        <x-button label="C" type="primary"></x-button>
        <x-button label="D" type="primary"></x-button>
      </x-buttons>
      <x-buttons>
        <x-button label="上一页" icon="fto-chevron-left" type="primary"></x-button>
        <x-button label="下一页" icon="fto-chevron-right" direction="row-reverse" type="primary"></x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" type="primary"></x-button>
        <x-button icon="fto-share" type="primary"></x-button>
        <x-button icon="fto-trash-2" type="primary"></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button label="A" plain></x-button>
        <x-button label="B" plain></x-button>
        <x-button label="C" plain></x-button>
        <x-button label="D" plain></x-button>
      </x-buttons>
      <x-buttons>
        <x-button label="上一页" icon="fto-chevron-left" plain></x-button>
        <x-button label="下一页" icon="fto-chevron-right" direction="row-reverse" plain></x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" plain></x-button>
        <x-button icon="fto-share" plain></x-button>
        <x-button icon="fto-trash-2" plain></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button label="A" type="primary" plain></x-button>
        <x-button label="B" type="primary" plain></x-button>
        <x-button label="C" type="primary" plain></x-button>
        <x-button label="D" type="primary" plain></x-button>
      </x-buttons>
      <x-buttons>
        <x-button label="上一页" type="primary" icon="fto-chevron-left" plain></x-button>
        <x-button label="下一页" type="primary" icon="fto-chevron-right" direction="row-reverse" plain></x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" type="primary" plain></x-button>
        <x-button icon="fto-share" type="primary" plain></x-button>
        <x-button icon="fto-trash-2" type="primary" plain></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button label="A" round></x-button>
        <x-button label="B" round></x-button>
        <x-button label="C" round></x-button>
        <x-button label="D" round></x-button>
      </x-buttons>
      <x-buttons>
        <x-button label="上一页" icon="fto-chevron-left" round></x-button>
        <x-button label="下一页" icon="fto-chevron-right" direction="row-reverse" round></x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" round></x-button>
        <x-button icon="fto-share" round></x-button>
        <x-button icon="fto-trash-2" round></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button label="A" type="primary" round></x-button>
        <x-button label="B" type="primary" round></x-button>
        <x-button label="C" type="primary" round></x-button>
        <x-button label="D" type="primary" round></x-button>
      </x-buttons>
      <x-buttons>
        <x-button label="上一页" type="primary" icon="fto-chevron-left" round></x-button>
        <x-button label="下一页" type="primary" icon="fto-chevron-right" direction="row-reverse" round></x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" type="primary" round></x-button>
        <x-button icon="fto-share" type="primary" round></x-button>
        <x-button icon="fto-trash-2" type="primary" round></x-button>
      </x-buttons>
    </div>
  `,
  styles: [
    `
      .row {
        display: flex;
        align-items: center;
      }
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > x-buttons:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXButtonGroupComponent {}

@Component({
  selector: "test-x-loading-button",
  template: `
    <div class="row">
      <x-button label="保存" icon="fto-save" type="primary" [loading]="loading" (click)="save()"></x-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > x-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXButtonLoadingComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  loading: boolean = false;
  save() {
    if (this.loading) return;
    this.loading = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}

@Component({
  selector: "test-x-size-button",
  template: `
    <div class="row">
      <x-button label="大型按钮" size="large"></x-button>
      <x-button label="中等按钮" size="medium"></x-button>
      <x-button label="默认按钮"></x-button>
      <x-button label="小型按钮" size="small"></x-button>
      <x-button label="迷你按钮" size="mini"></x-button>
    </div>
    <div class="row">
      <x-button label="大型按钮" type="primary" size="large"></x-button>
      <x-button label="中等按钮" type="primary" size="medium"></x-button>
      <x-button label="默认按钮" type="primary"></x-button>
      <x-button label="小型按钮" type="primary" size="small"></x-button>
      <x-button label="迷你按钮" type="primary" size="mini"></x-button>
    </div>
    <div class="row">
      <x-button label="大型按钮" type="primary" size="large" round></x-button>
      <x-button label="中等按钮" type="primary" size="medium" round></x-button>
      <x-button label="默认按钮" type="primary" round></x-button>
      <x-button label="小型按钮" type="primary" size="small" round></x-button>
      <x-button label="迷你按钮" type="primary" size="mini" round></x-button>
    </div>
    <div class="row">
      <x-button icon="fto-share" type="primary" size="large"></x-button>
      <x-button icon="fto-share" type="primary" size="medium"></x-button>
      <x-button icon="fto-share" type="primary"></x-button>
      <x-button icon="fto-share" type="primary" size="small"></x-button>
      <x-button icon="fto-share" type="primary" size="mini"></x-button>
    </div>
  `,
  styles: [
    `
      .row:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .row > x-button:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXButtonSizeComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  loading: boolean = false;
  save() {
    if (this.loading) return;
    this.loading = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}
