import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmIconComponent } from "./nm-icon.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmIconModule } from "./nm-icon.module";
import { IconPrefix } from "./nm-icon.type";

describe(IconPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmIconModule],
      declarations: [TestNmIconComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmIconComponent>;
    let testComponent: TestNmIconComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmIconComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmIconComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-nm-icon",
  template: `
    <nm-icon [nmType]="'adf-account-book'"></nm-icon>
    <nm-icon [nmType]="'ado-account-book'"></nm-icon>
    <nm-icon [nmType]="'adt-account-book'"></nm-icon>
    <br />
    <nm-icon [nmType]="'eaf-activity'"></nm-icon>
    <nm-icon [nmType]="'eao-activity'"></nm-icon>
    <br />
    <nm-icon [nmType]="'fto-activity'"></nm-icon>
    <br />
    <nm-icon [nmType]="'fab-accessible-icon'"></nm-icon>
    <nm-icon [nmType]="'far-address-book'"></nm-icon>
    <nm-icon [nmType]="'fas-address-book'"></nm-icon>
    <br />
    <nm-icon [nmType]="'ado-loading'" [nmSpin]="true"></nm-icon>
    <nm-icon [nmType]="'ado-loading-3-quarters'" [nmSpin]="true"></nm-icon>
    <br />
    <nm-icon [nmType]="'ado-plus'" [nmTo]="'ado-pause'"></nm-icon>
  `
})
class TestNmIconComponent {
  type: string;
}
