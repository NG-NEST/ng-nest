import { Observable, Subject, BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmTabsComponent } from "./nm-tabs.component";
import {
  Component,
  DebugElement,
  ContentChildren,
  ViewChildren
} from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmTabsModule } from "./nm-tabs.module";
import {
  TabsPrefix,
  NmTabsNode,
  NmTabsLayoutEnum,
  NmActivatedTab
} from "./nm-tabs.type";
import { NmData } from "../../../interfaces/data.type";

describe(TabsPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmTabsModule],
      declarations: [
        TestNmTabsComponent,
        TestEventNmTabsComponent,
        TestDataNmTabsComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmTabsComponent>;
    let testComponent: TestNmTabsComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmTabsComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmTabsComponent));
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(TabsPrefix);
    });
    it("should layout top.", () => {
      testComponent.layout = NmTabsLayoutEnum.Top;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${TabsPrefix}-${NmTabsLayoutEnum.Top}`
      );
    });
    it("should layout right.", () => {
      testComponent.layout = NmTabsLayoutEnum.Right;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${TabsPrefix}-${NmTabsLayoutEnum.Right}`
      );
    });
    it("should layout bottom.", () => {
      testComponent.layout = NmTabsLayoutEnum.Bottom;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${TabsPrefix}-${NmTabsLayoutEnum.Bottom}`
      );
    });
    it("should layout left.", () => {
      testComponent.layout = NmTabsLayoutEnum.Left;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${TabsPrefix}-${NmTabsLayoutEnum.Left}`
      );
    });
  });
});

const testNmTabsNode: NmTabsNode[] = [
  { nmKey: 1, nmLabel: "Home" },
  { nmKey: 2, nmLabel: "Docs" },
  { nmKey: 3, nmLabel: "Examples" },
  { nmKey: 4, nmLabel: "Api" }
];

@Component({
  selector: "test-nm-tabs",
  template: `
    <nm-tabs [nmLayout]="layout">
      <nm-tab [nmLabel]="'Home'">
        <nm-tabs [nmLayout]="'top'">
          <nm-tab [nmLabel]="'Home1'"><h1>1 Theme</h1></nm-tab>
          <nm-tab [nmLabel]="'Docs1'"><h1>2 Theme</h1></nm-tab>
          <nm-tab [nmLabel]="'Examples1'"><h1>3 Theme</h1></nm-tab>
          <nm-tab [nmLabel]="'Api1'"><h1>4 Theme</h1></nm-tab>
        </nm-tabs>
      </nm-tab>
      <nm-tab [nmLabel]="'Docs'">
        <nm-tabs [nmLayout]="'top'">
          <nm-tab [nmLabel]="'Home2'"><h1>1 Theme</h1></nm-tab>
          <nm-tab [nmLabel]="'Docs2'"><h1>2 Theme</h1></nm-tab>
          <nm-tab [nmLabel]="'Examples2'"><h1>3 Theme</h1></nm-tab>
          <nm-tab [nmLabel]="'Api2'"><h1>4 Theme</h1></nm-tab>
        </nm-tabs>
      </nm-tab>
      <nm-tab [nmLabel]="'Examples'">
        <h1>3 Theme</h1>
      </nm-tab>
      <nm-tab [nmLabel]="'Api'">
        <h1>4 Theme</h1>
      </nm-tab>
    </nm-tabs>
  `
})
class TestNmTabsComponent {
  layout: NmTabsLayoutEnum;
  position: NmTabsLayoutEnum;
  activatedIndex: number = 0;
}

// @Component({
//   selector: "test-nm-tabs",
//   template: `
//     <nm-tabs [nmLayout]="layout" (nmActivatedChange)="activatedChange($event)">
//       <nm-tab [nmLabel]="'Home'">
//         <nm-tabs #subTabs [nmLayout]="'top'">
//           <nm-tab [nmLabel]="'Home1'"><h1>1 Theme</h1></nm-tab>
//           <nm-tab [nmLabel]="'Docs1'"><h1>2 Theme</h1></nm-tab>
//           <nm-tab [nmLabel]="'Examples1'"><h1>3 Theme</h1></nm-tab>
//           <nm-tab [nmLabel]="'Api1'"><h1>4 Theme</h1></nm-tab>
//         </nm-tabs>
//       </nm-tab>
//       <nm-tab [nmLabel]="'Docs'">
//         <nm-tabs #subTabs [nmLayout]="'top'">
//           <nm-tab [nmLabel]="'Home2'"><h1>1 Theme</h1></nm-tab>
//           <nm-tab [nmLabel]="'Docs2'"><h1>2 Theme</h1></nm-tab>
//           <nm-tab [nmLabel]="'Examples2'"><h1>3 Theme</h1></nm-tab>
//           <nm-tab [nmLabel]="'Api2'"><h1>4 Theme</h1></nm-tab>
//         </nm-tabs>
//       </nm-tab>
//       <nm-tab [nmLabel]="'Examples'">
//         <h1>3 Theme</h1>
//       </nm-tab>
//       <nm-tab [nmLabel]="'Api'">
//         <h1>4 Theme</h1>
//       </nm-tab>
//     </nm-tabs>
//   `
// })
// class TestNmTabsComponent {
//   @ViewChildren("subTabs")
//   private _listTabs: Array<NmTabsComponent>;
//   get listTabs(): Array<NmTabsComponent> {
//     return this._listTabs;
//   }
//   set listTabs(value: Array<NmTabsComponent>) {
//     this._listTabs = value;
//   }
//   layout: NmTabsLayoutEnum;
//   position: NmTabsLayoutEnum;
//   activatedIndex: number = 0;
//   activatedChange($event: NmActivatedTab) {
//     let subTabs = this.listTabs.find((x, i) => i == $event.nmActivatedIndex);
//     if (subTabs) {
//       subTabs.slider.setHighlight();
//     }
//   }
// }

@Component({
  selector: "test-event-nm-tabs",
  template: `
    <nm-tabs
      [nmData]="data"
      (nmActivatedChange)="activatedChange($event)"
    ></nm-tabs>
  `
})
class TestEventNmTabsComponent {
  data: NmData<NmTabsNode[]> = testNmTabsNode;
  activatedChange($event: any) {}
}

@Component({
  selector: "test-data-nm-tabs",
  template: `
    <nm-tabs [nmData]="data"></nm-tabs>
  `
})
class TestDataNmTabsComponent {
  data: NmData<NmTabsNode[]> = new BehaviorSubject([]);
}
