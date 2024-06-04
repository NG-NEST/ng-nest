import { XIconComponent } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XLinkComponent } from '@ng-nest/ui/link';
import { FormsModule } from '@angular/forms';
import { XLinkPrefix } from './link.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeComponent } from '@ng-nest/ui/theme';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XLinkPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [TestXLinkComponent],
    imports: [BrowserAnimationsModule,
        XThemeComponent,
        FormsModule,
        XLinkComponent,
        XRowComponent,
        XColComponent,
        XIconComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });
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
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-link href="https://www.ngnest.com" target="_blank">默认链接</x-link>
        <x-link type="primary">主要链接</x-link>
        <x-link type="success">成功链接</x-link>
        <x-link type="warning">警告链接</x-link>
        <x-link type="danger">危险链接</x-link>
        <x-link type="info">信息链接</x-link>
      </x-col>
      <x-col span="24">
        <x-link href="https://www.ngnest.com" target="_blank" disabled>默认链接</x-link>
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
      x-row > x-col > x-link:not(:first-child) {
        margin-left: 1rem;
      }
    `
  ]
})
class TestXLinkComponent {
  model = 3;
}
