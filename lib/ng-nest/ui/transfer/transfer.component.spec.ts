import { XIconComponent } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XTransferComponent } from '@ng-nest/ui/transfer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XTransferPrefix, XTransferNode } from './transfer.property';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XContainerComponent } from '@ng-nest/ui/container';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeComponent } from '@ng-nest/ui/theme';
import { XTreeComponent } from '@ng-nest/ui/tree';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XInputComponent } from '@ng-nest/ui/input';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XTransferPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [TestXTransferComponent],
    imports: [BrowserAnimationsModule,
        XThemeComponent,
        FormsModule,
        ReactiveFormsModule,
        XTransferComponent,
        XButtonComponent,
        XContainerComponent,
        XRowComponent,
        XColComponent,
        XIconComponent,
        XTreeComponent,
        XSelectComponent,
        XInputComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });
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
    <x-theme showDark></x-theme>
    <div class="row">
      <x-transfer
        [data]="data"
        [(ngModel)]="value"
        (ngModelChange)="change($event)"
        [nodeTpl]="nodeTpl"
        [titleTpl]="titleTpl"
        [titles]="['用户列表', '已选用户']"
        drag
      >
      </x-transfer>
      <ng-template #nodeTpl let-item="$node">
        <x-icon [type]="item.node.icon" class="custom-icon"></x-icon>{{ item.node?.label }}
      </ng-template>
      <ng-template #titleTpl let-title="$title" let-count="$count" let-checkedCount="$checkedCount">
        <div class="custom-title">
          <span>{{ checkedCount <= 0 ? '' : checkedCount + ' /' }} {{ count }} 项</span>
          <span>{{ title }}</span>
        </div>
      </ng-template>
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
      .custom-icon {
        margin-right: 0.125rem;
        font-size: 0.925rem;
      }
      .custom-title {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `
  ]
})
class TestXTransferComponent {
  value = [1, 3, 7];
  data: XTransferNode[] = Array.from({ length: 15 }).map((_x, i) => {
    return {
      id: i + 1,
      label: '用户 ' + (i + 1),
      icon: 'fto-user',
      disabled: [3, 5, 9].indexOf(i + 1) >= 0
    };
  });
  constructor() {
    // interval(10).subscribe(x => {
    //   of(true)
    //     .pipe(delay(10))
    //     .subscribe(() => {
    //       this.cdr.detectChanges();
    //     });
    // });
  }
  change($event: any) {
    console.log($event);
  }
}
