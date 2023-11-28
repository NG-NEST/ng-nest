import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCrumbComponent } from '@ng-nest/ui/crumb';
import { XCrumbPrefix } from './crumb.property';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XTagModule } from '@ng-nest/ui/tag';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XCrumbPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeModule,
        XCrumbComponent,
        XIconComponent,
        XTagModule
      ],
      declarations: [TestXCrumbComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXCrumbComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCrumbComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XCrumbComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-crumb',
  template: `
    <x-theme showDark></x-theme>
    <x-crumb [data]="data"></x-crumb>
    <x-crumb [data]="dataIcon"></x-crumb>
    <x-crumb [data]="data" separator="·"></x-crumb>
    <x-crumb [data]="data" [separator]="separatorTpl"></x-crumb>
    <ng-template #separatorTpl>
      <x-icon type="fto-chevron-right"></x-icon>
    </ng-template>
    <x-crumb [data]="data" [nodeTpl]="nodeTpl"></x-crumb>
    <ng-template #nodeTpl let-node="$node">
      <x-tag>{{ node.label }}</x-tag>
    </ng-template>
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
class TestXCrumbComponent {
  data = ['首页', '用户管理', '用户列表', '用户详情'];
  dataIcon = [{ icon: 'fto-home' }, { label: '用户管理', icon: 'fto-user' }, '用户列表', '用户详情'];
  nodeClick() {}
}
