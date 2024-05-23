import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XIconPrefix } from './icon.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeComponent } from '@ng-nest/ui/theme';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XIconPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [TestXIconComponent],
    imports: [BrowserAnimationsModule, XThemeComponent, XIconComponent, XRowComponent, XColComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXIconComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXIconComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XIconComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-icon',
  template: `
    <x-theme showDark></x-theme>
    <div style="height: 2000px">
      <x-icon type="ado-plus-123123"></x-icon>
      <x-icon type="adf-account-book"></x-icon>
      <x-icon type="ado-account-book"></x-icon>
      <x-icon type="adt-account-book"></x-icon>
      <br />
      <x-icon type="eaf-activity"></x-icon>
      <x-icon type="eao-activity"></x-icon>
      <br />
      <x-icon type="fto-activity"></x-icon>
      <br />
      <x-icon type="fab-accessible-icon"></x-icon>
      <x-icon type="far-address-book"></x-icon>
      <x-icon type="fas-address-book"></x-icon>
      <br />
      <x-icon type="ado-loading" [spin]="spin"></x-icon>
      <x-icon type="ado-loading-3-quarters" spin></x-icon>
      <br />
      <x-icon type="ado-plus"></x-icon>
      <br />
      <x-icon type="mdf-action-3d-rotation"></x-icon>

      <div style="margin-top: 1000px">
        <x-icon type="adf-alert"></x-icon>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
    `
  ]
})
class TestXIconComponent {
  type!: string;
  spin = true;
  constructor(private cdr: ChangeDetectorRef) {
    setTimeout(() => {
      this.spin = false;
      this.cdr.detectChanges();
    }, 2000);
  }
}
