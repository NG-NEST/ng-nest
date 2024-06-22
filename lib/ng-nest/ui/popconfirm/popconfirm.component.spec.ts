import { XIconComponent } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectorRef, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XPopconfirmComponent } from '@ng-nest/ui/popconfirm';
import { FormsModule } from '@angular/forms';
import { XPopconfirmPrefix } from './popconfirm.property';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XContainerComponent } from '@ng-nest/ui/container';
import { interval } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { XSwitchComponent } from '@ng-nest/ui/switch';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XPopconfirmPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXPopconfirmComponent],
      imports: [
        BrowserAnimationsModule,
        
        FormsModule,
        XPopconfirmComponent,
        XButtonComponent,
        XContainerComponent,
        XRowComponent,
        XColComponent,
        XIconComponent,
        XSwitchComponent
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
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
