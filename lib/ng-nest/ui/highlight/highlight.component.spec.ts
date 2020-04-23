import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XHighlightComponent } from './highlight.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XHighlightModule } from '@ng-nest/ui/highlight';
import { XHighlightPrefix } from './highlight.property';

describe(XHighlightPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XHighlightModule],
      declarations: [TestXHighlightComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXHighlightComponent>;
    let testComponent: TestXHighlightComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXHighlightComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XHighlightComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-highlight',
  template: ` <x-highlight *ngFor="let item of list" [type]="item.type" [data]="item.data"></x-highlight> `
})
class TestXHighlightComponent {
  list = [
    {
      type: 'html',
      data: `<div class="row">
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
  <x-button icon="fto-trash" type="info" circle></x-button>
</div>`
    },
    {
      type: 'scss',
      data: `:host {
        .row:not(:last-child) {
          margin-bottom: 1rem;
        }
        .row > x-button:not(:first-child) {
          margin-left: 1rem;
        }
      }`
    },
    {
      type: 'typescript',
      data: `import { Component } from '@angular/core';

      @Component({
        selector: 'ex-default',
        templateUrl: './default.component.html',
        styleUrls: ['./default.component.scss']
      })
      export class ExDefaultComponent {}`
    }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.list[0] = {
        type: 'js',
        data: `var ji='wdasd';
      var sjdi='ssd';`
      };
      this.cdr.detectChanges();
    }, 2000);
  }
}
