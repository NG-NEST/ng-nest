import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTabsComponent } from './tabs.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTabsModule } from './tabs.module';
import { XTabsPrefix, XTabsLayoutType } from './tabs.type';

describe(XTabsPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XTabsModule],
      declarations: [TestXTabsComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTabsComponent>;
    let testComponent: TestXTabsComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTabsComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XTabsComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-tabs',
  template: `
    <div class="row">
      <x-tabs>
        <x-tab *ngFor="let label of labels" [label]="label">
          <div class="tab-content">{{ label }}</div>
        </x-tab>
      </x-tabs>
    </div>
    <div class="row">
      <x-tabs type="tag">
        <x-tab *ngFor="let label of labels" [label]="label">
          <div class="tab-content">{{ label }}</div>
        </x-tab>
      </x-tabs>
    </div>
    <div class="row">
      <x-tabs type="card">
        <x-tab *ngFor="let label of labels" [label]="label">
          <div class="tab-content">{{ label }}</div>
        </x-tab>
      </x-tabs>
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .tab-content {
        padding: 0.625rem;
      }
    `
  ]
})
class TestXTabsComponent {
  labels = ['用户管理', '配置管理', '角色管理', '任务'];
}
