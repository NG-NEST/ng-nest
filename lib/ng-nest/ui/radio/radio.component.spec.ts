import { async, ComponentFixture, TestBed, fakeAsync, flush } from "@angular/core/testing";

import { XRadioComponent } from "./radio.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XGridModule } from "@ng-nest/ui/grid";
import { XRadioModule } from "./radio.module";
import { FormsModule } from "@angular/forms";
import { XDocModule } from "@ng-nest/ui/doc";
import { XRadioPrefix, XRadioNode } from "./radio.type";
import { XData } from "@ng-nest/ui/core";

describe(XRadioPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XRadioModule, XGridModule, XDocModule],
      declarations: [TestXRadioComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXRadioComponent>;
    let radio: DebugElement;
    let testComponent: TestXRadioComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadioComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(XRadioComponent));
      element = radio.nativeElement;
    });
    it("should create.", () => {
      expect(radio).toBeDefined();
    });
  });
});

const testXRadioNodes: XRadioNode[] = [
  { key: 1, label: "苹果" },
  { key: 2, label: "香蕉", disabled: true },
  { key: 3, label: "梨子" },
  { key: 4, label: "柚子" }
];

@Component({
  template: `
    <x-radio [data]="data" [(ngModel)]="model" (ngModelChange)="modelChange($event)" disabled></x-radio>
  `
})
class TestXRadioComponent {
  data: XData<XRadioNode[]> = testXRadioNodes;
  model = 2;
  modelChange(value) {
    console.log(value);
  }
}
