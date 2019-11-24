import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XColorComponent } from "./color.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XColorModule } from "./color.module";
import { XColorPrefix } from "./color.type";

describe(XColorPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XColorModule],
      declarations: [TestXColorComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXColorComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXColorComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XColorComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-x-color",
  template: `
    <x-color label="Primary"></x-color>
    <x-color label="Success" hex="#67c23a"></x-color>
    <x-color label="Warning" hex="#e6a23c"></x-color>
    <x-color label="Danger" hex="#f56c6c"></x-color>
    <x-color label="Info" hex="#909399"></x-color>
  `
})
class TestXColorComponent {}
