import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XIconComponent } from './icon.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XIconModule } from '@ng-nest/ui/icon';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XIconPrefix } from './icon.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(XIconPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, XIconModule, XLayoutModule],
      declarations: [TestXIconComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXIconComponent>;
    let testComponent: TestXIconComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXIconComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XIconComponent));
      element = debugElement.nativeElement;
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
      <x-icon type="ado-plus-123123" to="ado-pause"></x-icon>
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
      <x-icon type="ado-plus" to="ado-pause"></x-icon>

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
  type: string;
  spin = true;
  constructor(private cdr: ChangeDetectorRef) {
    setTimeout(() => {
      this.spin = false;
      this.cdr.detectChanges();
    }, 2000);
  }
}
