import { interval } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement, ChangeDetectorRef, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XListComponent } from '@ng-nest/ui/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XListPrefix, XListNode } from './list.property';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XData } from '@ng-nest/ui/core';

import { XRadioComponent } from '@ng-nest/ui/radio';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XListPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXListComponent],
      imports: [
        BrowserAnimationsModule,
        
        XRadioComponent,
        XListComponent,
        FormsModule,
        ReactiveFormsModule,
        XRowComponent,
        XColComponent,
        XInputNumberComponent
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXListComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXListComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XListComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const data: XData<XListNode> = ['AAAA', 'BBBB', { label: 'CCCC', leaf: true }, 'DDDD'];

@Component({
  template: `
    
    <x-row space="1">
      <x-col span="6">
        <x-list [data]="data1" [(ngModel)]="model1" (ngModelChange)="change()" (nodeClick)="nodeEmit()"></x-list>
      </x-col>
      <x-col span="6">
        <x-list [data]="data2" [(ngModel)]="model2" (ngModelChange)="change()" (nodeClick)="nodeEmit()"></x-list>
      </x-col>
      <x-col span="6">
        <x-list
          [data]="data3"
          [(ngModel)]="model3"
          (ngModelChange)="change()"
          multiple
          (nodeClick)="nodeEmit()"
        ></x-list>
      </x-col>
      <x-col span="6">
        <x-list
          [data]="data4"
          [(ngModel)]="model4"
          multiple
          (ngModelChange)="change()"
          (nodeClick)="nodeEmit()"
        ></x-list>
      </x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6">
        <x-list
          [data]="data5"
          [(ngModel)]="model5"
          multiple="2"
          (ngModelChange)="change()"
          (nodeClick)="nodeEmit()"
        ></x-list>
      </x-col>
      <x-col span="6">
        <x-list
          [data]="data6"
          [(ngModel)]="model6"
          multiple="2"
          (ngModelChange)="change()"
          (nodeClick)="nodeEmit()"
        ></x-list>
      </x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6">
        <h6>上下拖动</h6>
        <div><x-list [data]="data7" [(ngModel)]="model7" drag></x-list></div>
      </x-col>
      <x-col span="6">
        <h6>模板</h6>
        <div><x-list [data]="data8" [(ngModel)]="model8" [nodeTpl]="nodeTpl"></x-list></div>
        <ng-template #nodeTpl let-node="$node"> {{ node.label }}<sup>2</sup> </ng-template>
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
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXListComponent {
  data1 = data;
  data2 = JSON.parse(JSON.stringify(data));
  data3 = JSON.parse(JSON.stringify(data));
  data4 = JSON.parse(JSON.stringify(data));
  data5 = JSON.parse(JSON.stringify(data));
  data6 = JSON.parse(JSON.stringify(data));
  data7 = JSON.parse(JSON.stringify(data));
  data8 = JSON.parse(JSON.stringify(data));
  model1: any;
  model2 = 'AAAA';
  model3: any;
  model4 = ['AAAA', 'BBBB'];
  model5: any;
  model6 = ['BBBB', 'CCCC'];
  model7 = 'BBBB';
  model8: any;
  constructor(private cdr: ChangeDetectorRef) {
    interval(0).subscribe(() => {
      this.cdr.detectChanges();
    });
  }
  change() {
    // console.log(val);
  }
  nodeEmit() {
    this.cdr.detectChanges();
  }
}
