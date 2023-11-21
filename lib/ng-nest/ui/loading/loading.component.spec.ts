import { XIconComponent } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XLoadingComponent } from './loading.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XLoadingModule } from '@ng-nest/ui/loading';
import { FormsModule } from '@angular/forms';
import { XLoadingPrefix } from './loading.property';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XLoadingPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeModule,
        FormsModule,
        BrowserAnimationsModule,
        XLoadingModule,
        XButtonComponent,
        XContainerModule,
        XRowComponent,
        XColComponent,
        XIconComponent
      ],
      declarations: [TestXLoadingComponent]
    }).compileComponents();
  });
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
    <x-theme showDark></x-theme>
    <div class="row">
      <div x-loading="true" size="big">
        <ng-container *ngTemplateOutlet="tableTpl"></ng-container>
      </div>
      <div x-loading="true" size="large">
        <ng-container *ngTemplateOutlet="tableTpl"></ng-container>
      </div>
      <div x-loading="true">
        <ng-container *ngTemplateOutlet="tableTpl"></ng-container>
      </div>
      <div x-loading="true" size="small">
        <ng-container *ngTemplateOutlet="tableTpl"></ng-container>
      </div>
      <div x-loading="true" size="mini">
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
          <td>admin&#64;admin.com</td>
          <td>启用</td>
        </tr>
        <tr>
          <td>john</td>
          <td>john&#64;john.com</td>
          <td>禁用</td>
        </tr>
        <tr>
          <td>jack</td>
          <td>jack&#64;jack.com</td>
          <td>启用</td>
        </tr>
      </table>
    </ng-template>

    <div class="row">
      <div [x-loading]="loading" fullScreen>
        <x-button (click)="onLoading()">整页加载</x-button>
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
      .subscribe(() => {
        this.loading = false;
        this.cdr.detectChanges();
      });
  }
}
