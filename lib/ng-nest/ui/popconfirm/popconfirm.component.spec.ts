import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XPopconfirmComponent } from './popconfirm.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XPopconfirmModule } from './popconfirm.module';
import { FormsModule } from '@angular/forms';
import { XPopconfirmPrefix } from './popconfirm.type';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';
import { interval } from 'rxjs';

describe(XPopconfirmPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XPopconfirmModule, XButtonModule, XContainerModule, XFenceModule, XIconModule],
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
      <x-popconfirm title="确定删除吗？" (ok)="ok()" (cancel)="cancel()">
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
  ok() {
    console.log('ok');
  }
  cancel() {
    console.log('cancel');
  }
}
