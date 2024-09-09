import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCrumbComponent, XCrumbNode, XCrumbPrefix } from '@ng-nest/ui/crumb';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XDataArray, XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XCrumbComponent],
  template: ` <x-crumb></x-crumb> `
})
class XTestCrumbComponent {}

@Component({
  standalone: true,
  imports: [XCrumbComponent],
  template: `
    <x-crumb [data]="data()" [nodeTpl]="nodeTpl()" [separator]="separator()" (nodeClick)="nodeClick($event)"> </x-crumb>

    <ng-template #nodeTemplate let-node="$node">{{ node.label }}</ng-template>
  `
})
class XTestCrumbPropertyComponent {
  data = signal<XDataArray<XCrumbNode>>([]);
  nodeTpl = signal<TemplateRef<any> | null>(null);
  nodeTemplage = viewChild<TemplateRef<void>>('nodeTemplate');
  separator = signal<XTemplate>('/');

  nodeClickResult = signal<XCrumbNode | null>(null);
  nodeClick(node: XCrumbNode) {
    this.nodeClickResult.set(node);
  }
}

describe(XCrumbPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCrumbComponent, XTestCrumbPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestCrumbComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCrumbComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XCrumbComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCrumbPropertyComponent>;
    // let component: XTestCrumbPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCrumbPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('nodeTpl.', () => {
      expect(true).toBe(true);
    });
    it('separator.', () => {
      expect(true).toBe(true);
    });
    it('nodeClick.', () => {
      expect(true).toBe(true);
    });
  });
});
