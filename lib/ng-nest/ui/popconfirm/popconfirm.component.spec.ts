import { XIconModule } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XPopconfirmComponent } from './popconfirm.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XPopconfirmModule } from '@ng-nest/ui/popconfirm';
import { FormsModule } from '@angular/forms';
import { XPopconfirmPrefix } from './popconfirm.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';
import { interval } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';
import { XSwitchModule } from '@ng-nest/ui/switch';
import { XMessageModule } from '@ng-nest/ui/message';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XPopconfirmPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeModule,
        FormsModule,
        XPopconfirmModule,
        XButtonModule,
        XContainerModule,
        XLayoutModule,
        XIconModule,
        XSwitchModule,
        XMessageModule
      ],
      declarations: [TestXPopconfirmComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXPopconfirmComponent>;
    let popconfirm: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXPopconfirmComponent);
      fixture.detectChanges();
      popconfirm = fixture.debugElement.query(By.directive(XPopconfirmComponent));
    });
    it('should create.', () => {
      expect(popconfirm).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-popconfirm title="确定删除吗？" (confirm)="confirm()" (cancel)="cancel()">
        <x-button icon="fto-trash-2">删除</x-button>
      </x-popconfirm>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row {
        padding-left: 5rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXPopconfirmComponent {
  constructor(public cdr: ChangeDetectorRef) {
    interval(1).subscribe(() => {
      this.cdr.detectChanges();
    });
  }
  confirm() {
    console.log('confirm');
  }
  cancel() {
    console.log('cancel');
  }
}
