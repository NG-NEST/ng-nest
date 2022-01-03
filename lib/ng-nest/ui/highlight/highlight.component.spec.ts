import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XHighlightComponent } from './highlight.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XHighlightModule } from '@ng-nest/ui/highlight';
import { XHighlightPrefix, XHighlightLines } from './highlight.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(XHighlightPrefix, () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, XHighlightModule],
      declarations: [TestXHighlightComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXHighlightComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXHighlightComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XHighlightComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-highlight',
  template: `
    <x-theme showDark></x-theme>
    <x-highlight *ngFor="let item of list" [type]="item.type" [data]="item.data" [highlightLines]="item.highlightLines"></x-highlight>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
    `
  ]
})
class TestXHighlightComponent {
  highlightLines: XHighlightLines = { danger: '1, 2, 4', primary: '7-10, 12, 15-20' };

  list = [
    {
      type: 'html',
      highlightLines: this.highlightLines,
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

  constructor() {}

  ngOnInit() {
    // setTimeout(() => {
    //   this.list[0] = {
    //     type: 'js',
    //     data: `var ji='wdasd';
    //   var sjdi='ssd';`
    //   };
    //   this.cdr.detectChanges();
    // }, 2000);
  }
}
