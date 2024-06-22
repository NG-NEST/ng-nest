import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTreeSelectComponent } from '@ng-nest/ui/tree-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XTreeSelectPrefix, XTreeSelectNode } from './tree-select.property';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XData } from '@ng-nest/ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XInputComponent } from '@ng-nest/ui/input';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XTreeSelectPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXTreeSelectComponent],
      imports: [
        BrowserAnimationsModule,
        XTreeSelectComponent,
        FormsModule,
        ReactiveFormsModule,
        XInputComponent,
        XRowComponent,
        XColComponent,
        XRadioComponent
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTreeSelectComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTreeSelectComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XTreeSelectComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const data: XData<XTreeSelectNode> = [
  'AAAA',
  'AAA',
  'BBBB',
  'CCCC',
  'DDDD',
  'EEEE',
  'FFFF',
  'GGGG',
  'HHHH',
  'IIII',
  'JJJJ'
];

@Component({
  template: ` <x-tree-select [data]="data"></x-tree-select> `,
  styles: [
    `
      :host {
        height: 900px;
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXTreeSelectComponent {
  data = data;
  constructor() {}
}
