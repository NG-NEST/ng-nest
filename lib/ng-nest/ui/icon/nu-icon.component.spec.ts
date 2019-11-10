import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuIconComponent } from "./nu-icon.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuIconModule } from "./nu-icon.module";
import { IconPrefix } from "./nu-icon.type";

describe(IconPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuIconModule],
      declarations: [TestNuIconComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuIconComponent>;
    let testComponent: TestNuIconComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuIconComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuIconComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-nu-icon",
  template: `
    <div style="height: 2000px">
      <nu-icon [nuType]="'adf-account-book'"></nu-icon>
      <nu-icon [nuType]="'ado-account-book'"></nu-icon>
      <nu-icon [nuType]="'adt-account-book'"></nu-icon>
      <br />
      <nu-icon [nuType]="'eaf-activity'"></nu-icon>
      <nu-icon [nuType]="'eao-activity'"></nu-icon>
      <br />
      <nu-icon [nuType]="'fto-activity'"></nu-icon>
      <br />
      <nu-icon [nuType]="'fab-accessible-icon'"></nu-icon>
      <nu-icon [nuType]="'far-address-book'"></nu-icon>
      <nu-icon [nuType]="'fas-address-book'"></nu-icon>
      <br />
      <nu-icon [nuType]="'ado-loading'" [nuSpin]="true"></nu-icon>
      <nu-icon [nuType]="'ado-loading-3-quarters'" [nuSpin]="true"></nu-icon>
      <br />
      <nu-icon [nuType]="'ado-plus'" [nuTo]="'ado-pause'"></nu-icon>
      <div style="margin-top: 1000px">
        <nu-icon [nuType]="'adf-alert'"></nu-icon>
      </div>
    </div>
  `
})
class TestNuIconComponent {
  type: string;
}
