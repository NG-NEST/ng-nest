import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XPopconfirmComponent } from './popconfirm.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XPopconfirmModule } from '@ng-nest/ui/popconfirm';
import { FormsModule } from '@angular/forms';
import { XPopconfirmPrefix } from './popconfirm.type';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';
import { interval } from 'rxjs';

describe(XPopconfirmPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XPopconfirmModule, XButtonModule, XContainerModule, XLayoutModule, XIconModule],
      declarations: [TestXPopconfirmComponent]
    }).compileComponents();
  }));
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
    interval(1).subscribe(x => {
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
