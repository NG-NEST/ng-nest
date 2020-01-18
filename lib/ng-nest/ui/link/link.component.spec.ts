import { XIconModule } from "@ng-nest/ui/icon";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XLinkComponent } from "./link.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XFenceModule } from "@ng-nest/ui/fence";
import { XLinkModule } from "./link.module";
import { FormsModule } from "@angular/forms";
import { XLinkPrefix } from "./link.type";

describe(XLinkPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XLinkModule, XFenceModule, XIconModule],
      declarations: [TestXLinkComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXLinkComponent>;
    let link: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXLinkComponent);
      fixture.detectChanges();
      link = fixture.debugElement.query(By.directive(XLinkComponent));
    });
    it("should create.", () => {
      expect(link).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-link href="http://www.ng-nest.com" target="_blank" label="默认链接"></x-link>
        <x-link type="primary" label="主要链接"></x-link>
        <x-link type="success" label="成功链接"></x-link>
        <x-link type="warning" label="警告链接"></x-link>
        <x-link type="danger" label="危险链接"></x-link>
        <x-link type="info" label="信息链接"></x-link>
      </x-col>
      <x-col span="24">
        <x-link disabled label="默认链接"></x-link>
        <x-link type="primary" label="主要链接" disabled></x-link>
        <x-link type="success" label="成功链接" disabled></x-link>
        <x-link type="warning" label="警告链接" disabled></x-link>
        <x-link type="danger" label="危险链接" disabled></x-link>
        <x-link type="info" label="信息链接" disabled></x-link>
      </x-col>
      <x-col span="24">
        <x-link underline label="有下划线"></x-link>
        <x-link label="无下划线"></x-link>
      </x-col>
      <x-col span="24">
        <x-link label="后退" icon="fto-chevron-left" underline></x-link>
        <x-link label="前进" icon="fto-chevron-right" underline iconRight></x-link>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
      x-row > x-col > x-link:not(:first-child) {
        margin-left: 0.25rem;
      }
    `
  ]
})
class TestXLinkComponent {
  model = 3;
}
