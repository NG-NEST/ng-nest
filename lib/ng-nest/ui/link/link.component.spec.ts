import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XLinkComponent } from './link.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XLinkModule } from './link.module';
import { FormsModule } from '@angular/forms';
import { XLinkPrefix } from './link.type';

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
    it('should create.', () => {
      expect(link).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-link href="http://www.ng-nest.com" target="_blank">默认链接</x-link>
        <x-link type="primary">主要链接</x-link>
        <x-link type="success">成功链接</x-link>
        <x-link type="warning">警告链接</x-link>
        <x-link type="danger">危险链接</x-link>
        <x-link type="info">信息链接</x-link>
      </x-col>
      <x-col span="24">
        <x-link href="http://www.ng-nest.com" target="_blank" disabled>默认链接</x-link>
        <x-link type="primary" disabled>主要链接</x-link>
        <x-link type="success" disabled>成功链接</x-link>
        <x-link type="warning" disabled>警告链接</x-link>
        <x-link type="danger" disabled>危险链接</x-link>
        <x-link type="info" disabled>信息链接</x-link>
      </x-col>
      <x-col span="24">
        <x-link underline>有下划线</x-link>
        <x-link>无下划线</x-link>
      </x-col>
      <x-col span="24">
        <x-link icon="fto-chevron-left" underline>后退</x-link>
        <x-link icon="fto-chevron-right" underline iconRight>前进</x-link>
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
