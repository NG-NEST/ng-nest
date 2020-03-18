import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTransferComponent } from './transfer.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XTransferModule } from './transfer.module';
import { FormsModule } from '@angular/forms';
import { XTransferPrefix } from './transfer.type';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';

describe(XTransferPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XTransferModule, XButtonModule, XContainerModule, XFenceModule, XIconModule],
      declarations: [TestXTransferComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTransferComponent>;
    let transfer: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTransferComponent);
      fixture.detectChanges();
      transfer = fixture.debugElement.query(By.directive(XTransferComponent));
    });
    it('should create.', () => {
      expect(transfer).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-transfer> </x-transfer>
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXTransferComponent {}
