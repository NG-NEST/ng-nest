import { interval, Observable } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XListComponent } from "./list.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XListModule } from "./list.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XListPrefix, XListNode } from "./list.type";
import { XFenceModule } from "@ng-nest/ui/fence";
import { XData } from "@ng-nest/ui/core";

describe(XListPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XListModule, FormsModule, ReactiveFormsModule, XFenceModule],
      declarations: [TestXListComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXListComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXListComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XListComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const data: XData<XListNode[]> = ["AAAA", "BBBB", { label: "CCCC", hasChild: true }, "DDDD"];

@Component({
  template: `
    <x-row space="1">
      <x-col span="6">
        <x-list
          [data]="data1"
          [(ngModel)]="model1"
          (ngModelChange)="change($event)"
          (nodeEmit)="nodeEmit($event)"
        ></x-list>
      </x-col>
      <x-col span="6">
        <x-list
          [data]="data2"
          [(ngModel)]="model2"
          (ngModelChange)="change($event)"
          (nodeEmit)="nodeEmit($event)"
        ></x-list>
      </x-col>
      <x-col span="6">
        <x-list
          [data]="data3"
          [(ngModel)]="model3"
          (ngModelChange)="change($event)"
          multiple
          (nodeEmit)="nodeEmit($event)"
        ></x-list>
      </x-col>
      <x-col span="6">
        <x-list
          [data]="data4"
          [(ngModel)]="model4"
          multiple
          (ngModelChange)="change($event)"
          (nodeEmit)="nodeEmit($event)"
        ></x-list>
      </x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6">
        <x-list
          [data]="data5"
          [(ngModel)]="model5"
          multiple="2"
          (ngModelChange)="change($event)"
          (nodeEmit)="nodeEmit($event)"
        ></x-list>
      </x-col>
      <x-col span="6">
        <x-list
          [data]="data6"
          [(ngModel)]="model6"
          multiple="2"
          (ngModelChange)="change($event)"
          (nodeEmit)="nodeEmit($event)"
        ></x-list>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
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
  model1: any;
  model2 = "AAAA";
  model3: any;
  model4 = ["AAAA", "BBBB"];
  model5: any;
  model6 = ["BBBB", "CCCC"];
  constructor(private cdr: ChangeDetectorRef) {
    // interval(500).subscribe(x => {
    //   this.cdr.detectChanges();
    // });
  }
  change(val) {
    // console.log(val);
  }
  nodeEmit(val) {
    this.cdr.detectChanges();
  }
}
