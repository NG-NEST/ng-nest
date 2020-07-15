import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XCrumbComponent } from './crumb.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCrumbModule } from '@ng-nest/ui/crumb';
import { XCrumbPrefix } from './crumb.property';
import { XIconModule } from '@ng-nest/ui/icon';
import { XTagModule } from '@ng-nest/ui/tag';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(XCrumbPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, XCrumbModule, XIconModule, XTagModule],
      declarations: [TestXCrumbComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXCrumbComponent>;
    let testComponent: TestXCrumbComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCrumbComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XCrumbComponent));
      element = debugElement.nativeElement;
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
