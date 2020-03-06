import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XButtonComponent } from './button.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XButtonModule } from './button.module';
import { XButtonPrefix } from './button.type';

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
    it('should create.', () => {
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
    it('should create.', () => {
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
    it('should create.', () => {
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
    it('should create.', () => {
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
    it('should create.', () => {
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
    it('should create.', () => {
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
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-button',
  template: `
    <div class="row">
      <x-button>默认按钮</x-button>
      <x-button type="primary">主要按钮</x-button>
      <x-button type="success">成功按钮</x-button>
      <x-button type="warning">警告按钮</x-button>
      <x-button type="danger">危险按钮</x-button>
      <x-button type="info">信息按钮</x-button>
    </div>
    <div class="row">
      <x-button plain>朴素按钮</x-button>
      <x-button type="primary" plain>主要按钮</x-button>
      <x-button type="success" plain>成功按钮</x-button>
      <x-button type="warning" plain>警告按钮</x-button>
      <x-button type="danger" plain>危险按钮</x-button>
      <x-button type="info" plain>信息按钮</x-button>
    </div>
    <div class="row">
      <x-button round>圆角按钮</x-button>
      <x-button type="primary" round>主要按钮</x-button>
      <x-button type="success" round>成功按钮</x-button>
      <x-button type="warning" round>警告按钮</x-button>
      <x-button type="danger" round>危险按钮</x-button>
      <x-button type="info" round>信息按钮</x-button>
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
  selector: 'test-x-disabled-button',
  template: `
    <div class="row">
      <x-button disabled>默认按钮</x-button>
      <x-button type="primary" disabled>主要按钮</x-button>
      <x-button type="success" disabled>成功按钮</x-button>
      <x-button type="warning" disabled>警告按钮</x-button>
      <x-button type="danger" disabled>危险按钮</x-button>
      <x-button type="info" disabled>信息按钮</x-button>
    </div>
    <div class="row">
      <x-button plain disabled>朴素按钮</x-button>
      <x-button type="primary" plain disabled>主要按钮</x-button>
      <x-button type="success" plain disabled>成功按钮</x-button>
      <x-button type="warning" plain disabled>警告按钮</x-button>
      <x-button type="danger" plain disabled>危险按钮</x-button>
      <x-button type="info" plain disabled>信息按钮</x-button>
    </div>
    <div class="row">
      <x-button round disabled>圆角按钮</x-button>
      <x-button type="primary" round disabled>主要按钮</x-button>
      <x-button type="success" round disabled>成功按钮</x-button>
      <x-button type="warning" round disabled>警告按钮</x-button>
      <x-button type="danger" round disabled>危险按钮</x-button>
      <x-button type="info" round disabled>信息按钮</x-button>
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
  selector: 'test-x-text-button',
  template: `
    <div class="row">
      <x-button type="text">文字按钮</x-button>
      <x-button type="text" disabled>文字按钮</x-button>
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
  selector: 'test-x-icon-button',
  template: `
    <div class="row">
      <x-button icon="fto-edit-3" onlyIcon></x-button>
      <x-button icon="fto-edit-3" type="primary"></x-button>
      <x-button icon="fto-share" type="primary"></x-button>
      <x-button icon="fto-trash-2" type="primary"></x-button>
      <x-button icon="fto-search" type="primary">搜索</x-button>
      <x-button icon="fto-upload-cloud" direction="row-reverse" type="primary">上传</x-button>
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
  selector: 'test-x-group-button',
  template: `
    <div class="row">
      <x-buttons>
        <x-button>A</x-button>
        <x-button>B</x-button>
        <x-button>C</x-button>
        <x-button>D</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-chevron-left">上一页</x-button>
        <x-button icon="fto-chevron-right" direction="row-reverse">下一页</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3"></x-button>
        <x-button icon="fto-share"></x-button>
        <x-button icon="fto-trash-2"></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button type="primary">A</x-button>
        <x-button type="primary">B</x-button>
        <x-button type="primary">C</x-button>
        <x-button type="primary">D</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-chevron-left" type="primary">上一页</x-button>
        <x-button icon="fto-chevron-right" direction="row-reverse" type="primary">下一页</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" type="primary"></x-button>
        <x-button icon="fto-share" type="primary"></x-button>
        <x-button icon="fto-trash-2" type="primary"></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button plain>A</x-button>
        <x-button plain>B</x-button>
        <x-button plain>C</x-button>
        <x-button plain>D</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-chevron-left" plain>上一页</x-button>
        <x-button icon="fto-chevron-right" direction="row-reverse" plain>下一页</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" plain></x-button>
        <x-button icon="fto-share" plain></x-button>
        <x-button icon="fto-trash-2" plain></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button type="primary" plain>A</x-button>
        <x-button type="primary" plain>B</x-button>
        <x-button type="primary" plain>C</x-button>
        <x-button type="primary" plain>D</x-button>
      </x-buttons>
      <x-buttons>
        <x-button type="primary" icon="fto-chevron-left" plain>上一页</x-button>
        <x-button type="primary" icon="fto-chevron-right" direction="row-reverse" plain>下一页</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" type="primary" plain></x-button>
        <x-button icon="fto-share" type="primary" plain></x-button>
        <x-button icon="fto-trash-2" type="primary" plain></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button round>A</x-button>
        <x-button round>B</x-button>
        <x-button round>C</x-button>
        <x-button round>D</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-chevron-left" round>上一页</x-button>
        <x-button icon="fto-chevron-right" direction="row-reverse" round>下一页</x-button>
      </x-buttons>
      <x-buttons>
        <x-button icon="fto-edit-3" round></x-button>
        <x-button icon="fto-share" round></x-button>
        <x-button icon="fto-trash-2" round></x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-buttons>
        <x-button type="primary" round>A</x-button>
        <x-button type="primary" round>B</x-button>
        <x-button type="primary" round>C</x-button>
        <x-button type="primary" round>D</x-button>
      </x-buttons>
      <x-buttons>
        <x-button type="primary" icon="fto-chevron-left" round>上一页</x-button>
        <x-button type="primary" icon="fto-chevron-right" direction="row-reverse" round>下一页</x-button>
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
  selector: 'test-x-loading-button',
  template: `
    <div class="row">
      <x-button icon="fto-save" type="primary" [loading]="loading" (click)="save()">保存</x-button>
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
  selector: 'test-x-size-button',
  template: `
    <div class="row">
      <x-button size="large">大型按钮</x-button>
      <x-button size="medium">中等按钮</x-button>
      <x-button>默认按钮</x-button>
      <x-button size="small">小型按钮</x-button>
      <x-button size="mini">迷你按钮</x-button>
    </div>
    <div class="row">
      <x-button type="primary" size="large">大型按钮</x-button>
      <x-button type="primary" size="medium">中等按钮</x-button>
      <x-button type="primary">默认按钮</x-button>
      <x-button type="primary" size="small">小型按钮</x-button>
      <x-button type="primary" size="mini">迷你按钮</x-button>
    </div>
    <div class="row">
      <x-button type="primary" size="large" round>大型按钮</x-button>
      <x-button type="primary" size="medium" round>中等按钮</x-button>
      <x-button type="primary" round>默认按钮</x-button>
      <x-button type="primary" size="small" round>小型按钮</x-button>
      <x-button type="primary" size="mini" round>迷你按钮</x-button>
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
