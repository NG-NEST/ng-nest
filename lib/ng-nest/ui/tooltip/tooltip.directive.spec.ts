import { XButtonComponent } from '@ng-nest/ui/button';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectorRef, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTooltipDirective } from '@ng-nest/ui/tooltip';
import { XTooltipPrefix } from './tooltip.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XTooltipPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXTooltipComponent],
      imports: [BrowserAnimationsModule,  BrowserAnimationsModule, XTooltipDirective, XButtonComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTooltipComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTooltipComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XTooltipDirective));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-tooltip',
  template: `
    
    <div class="box">
      <div class="top">
        <x-button x-tooltip content="上左上左上左上左上左上左上左上左上左上左" placement="top-start">上左</x-button>
        <x-button x-tooltip content="上中上中上中上中上中上中上中上中上中上中" placement="top">上中</x-button>
        <x-button x-tooltip content="上右上右上右上右上右上右上右上右上右上右" placement="top-end">上右</x-button>
      </div>
      <div class="left">
        <x-button x-tooltip content="左上左上左上左上左上左上左上左上左上左上" placement="left-start">左上</x-button
        ><x-button x-tooltip content="左中左中左中左中左中左中左中左中左中左中" placement="left">左中</x-button
        ><x-button x-tooltip content="左下左下左下左下左下左下左下左下左下左下" placement="left-end">左下</x-button>
      </div>
      <div class="right">
        <x-button x-tooltip content="右上右上右上右上右上右上右上右上右上右上" placement="right-start">右上</x-button
        ><x-button x-tooltip content="右中右中右中右中右中右中右中右中右中右中" placement="right">右中</x-button
        ><x-button x-tooltip content="右下右下右下右下右下右下右下右下右下右下" placement="right-end">右下</x-button>
      </div>
      <div class="bottom">
        <x-button x-tooltip content="下左下左下左下左下左下左下左下左下左下左" placement="bottom-start">下左</x-button
        ><x-button x-tooltip content="下中下中下中下中下中下中下中下中下中下中" placement="bottom">下中</x-button
        ><x-button x-tooltip content="下右下右下右下右下右下右下右下右下右下右" placement="bottom-end">下右</x-button>
      </div>
    </div>
    <div class="row">
      <x-button x-tooltip content="自定义控制显示/隐藏" [visible]="visible" (click)="custom()" manual
        >自定义控制显示/隐藏</x-button
      >
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .box {
        padding: 5rem 10rem;
        width: 45rem;
      }
      .box .top {
        text-align: center;
      }
      .box .left {
        float: left;
        width: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .box .right {
        float: right;
        width: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .box .bottom {
        clear: both;
        text-align: center;
      }
    `
  ]
})
class TestXTooltipComponent {
  visible = false;
  constructor(private cdr: ChangeDetectorRef) {}

  custom() {
    this.visible = !this.visible;
    this.cdr.detectChanges();
  }
}
