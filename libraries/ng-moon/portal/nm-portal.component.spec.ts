import { BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmPortalComponent } from "./nm-portal.component";
import {
  Component,
  DebugElement,
  TemplateRef,
  ViewContainerRef,
  ViewChild
} from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmPortalModule } from "./nm-portal.module";
import { PortalPrefix } from "./nm-portal.type";
import { NmData } from "ng-moon/core";
import { NmPortalService } from "./nm-portal.service";
import { Overlay } from "@angular/cdk/overlay";

describe(PortalPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmPortalModule],
      declarations: [TestNmPortalComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmPortalComponent>;
    let testComponent: TestNmPortalComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmPortalComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmPortalComponent)
      );
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-nm-portal",
  template: `
    <nm-portal></nm-portal>
    <button (click)="showPortal()">打开模板</button>
    <ng-template #temp let-text="text">{{ text }}模板内容</ng-template>
  `
})
class TestNmPortalComponent {
  @ViewChild("temp", { static: false }) temp: TemplateRef<any>;
  constructor(
    private portal: NmPortalService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}
  showPortal() {
    this.portal.create({
      nmContent: this.temp,
      nmViewContainerRef: this.viewContainerRef,
      nmContext: { text: "名字" },
      nmOverlayConfig: {
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically()
      }
    });
  }
}
