import { BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuPortalComponent } from "./nu-portal.component";
import {
  Component,
  DebugElement,
  TemplateRef,
  ViewContainerRef,
  ViewChild
} from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuPortalModule } from "./nu-portal.module";
import { PortalPrefix } from "./nu-portal.type";
import { NuData } from "@ng-nest/ui/core";
import { NuPortalService } from "./nu-portal.service";
import { Overlay } from "@angular/cdk/overlay";

describe(PortalPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuPortalModule],
      declarations: [TestNuPortalComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuPortalComponent>;
    let testComponent: TestNuPortalComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuPortalComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NuPortalComponent)
      );
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-nu-portal",
  template: `
    <nu-portal></nu-portal>
    <button (click)="showPortal()">打开模板</button>
    <ng-template #temp let-text="text">{{ text }}模板内容</ng-template>
  `
})
class TestNuPortalComponent {
  @ViewChild("temp", { static: false }) temp: TemplateRef<any>;
  constructor(
    private portal: NuPortalService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}
  showPortal() {
    this.portal.create({
      nuContent: this.temp,
      nuViewContainerRef: this.viewContainerRef,
      nuContext: { text: "名字" },
      nuOverlayConfig: {
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically()
      }
    });
  }
}
