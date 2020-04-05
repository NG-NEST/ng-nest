import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XLoadingComponent } from './loading.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XLoadingModule } from '@ng-nest/ui/loading';
import { FormsModule } from '@angular/forms';
import { XLoadingPrefix } from './loading.type';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe(XLoadingPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XLoadingModule, XButtonModule, XContainerModule, XFenceModule, XIconModule],
      declarations: [TestXLoadingComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXLoadingComponent>;
    let loading: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXLoadingComponent);
      fixture.detectChanges();
      loading = fixture.debugElement.query(By.directive(XLoadingComponent));
    });
    it('should create.', () => {
      expect(loading).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <div [x-loading]="true" size="large">
        <ng-container *ngTemplateOutlet="tableTpl"></ng-container>
      </div>
      <div [x-loading]="true" size="medium">
        <ng-container *ngTemplateOutlet="tableTpl"></ng-container>
      </div>
      <div [x-loading]="true">
        <ng-container *ngTemplateOutlet="tableTpl"></ng-container>
      </div>
      <div [x-loading]="true" size="small">
        <ng-container *ngTemplateOutlet="tableTpl"></ng-container>
      </div>
      <div [x-loading]="true" size="mini">
        <ng-container *ngTemplateOutlet="tableTpl"></ng-container>
      </div>
    </div>

    <div class="row">
      <div
        [x-loading]="true"
        background="rgba(0,0,0,0.9)"
        color="rgba(170,170,170,1)"
        icon="fto-loader"
        text="努力加载中"
      >
        <ng-container *ngTemplateOutlet="tableTpl"></ng-container>
      </div>
    </div>

    <ng-template #tableTpl>
      <table class="custom-table">
        <tr>
          <th>用户</th>
          <th>邮箱</th>
          <th>状态</th>
        </tr>
        <tr>
          <td>admin</td>
          <td>admin@admin.com</td>
          <td>启用</td>
        </tr>
        <tr>
          <td>john</td>
          <td>john@john.com</td>
          <td>禁用</td>
        </tr>
        <tr>
          <td>jack</td>
          <td>jack@jack.com</td>
          <td>启用</td>
        </tr>
      </table>
    </ng-template>

    <div class="row">
      <div [x-loading]="loading" full-screen>
        <x-button (click)="onLoading()">整页加载</x-button>
      </div>
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .row div {
        padding: 1rem;
      }

      .custom-table {
        border-collapse: collapse;
        width: 100%;
      }
      .custom-table tr {
        border-bottom: 0.0625rem solid var(--x-border);
      }
      .custom-table tr th,
      .custom-table tr td {
        padding: 0.25rem 0.325rem;
        text-align: left;
      }
    `
  ]
})
class TestXLoadingComponent {
  loading = false;
  constructor(private cdr: ChangeDetectorRef) {}
  onLoading() {
    this.loading = true;
    this.cdr.detectChanges();
    of(true)
      .pipe(delay(2000))
      .subscribe(x => {
        this.loading = false;
        this.cdr.detectChanges();
      });
  }
}
