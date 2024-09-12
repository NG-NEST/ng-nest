import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XStepsComponent, XStepsLayout, XStepsNode, XStepsPrefix, XStepsStatus } from '@ng-nest/ui/steps';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XDataArray } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XStepsComponent],
  template: ` <x-steps> </x-steps> `
})
class XTestStepsComponent {}

@Component({
  standalone: true,
  imports: [XStepsComponent],
  template: `
    <x-steps
      [data]="data()"
      [layout]="layout()"
      [activatedIndex]="activatedIndex()"
      [startIndex]="startIndex()"
      [status]="status()"
      [customTpl]="customTpl()"
      [nodeStatus]="nodeStatus()"
    >
    </x-steps>
  `
})
class XTestStepsPropertyComponent {
  data = signal<XDataArray<XStepsNode>>([]);
  layout = signal<XStepsLayout>('row');
  activatedIndex = signal(0);
  startIndex = signal(0);
  status = signal<XStepsStatus | null>(null);
  customTpl = signal<TemplateRef<any> | null>(null);
  nodeStatus = signal(false);
}

describe(XStepsPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestStepsComponent, XTestStepsPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestStepsComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestStepsComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XStepsComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestStepsPropertyComponent>;
    // let component: XTestStepsPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestStepsPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('layout.', () => {
      expect(true).toBe(true);
    });
    it('activatedIndex.', () => {
      expect(true).toBe(true);
    });
    it('startIndex.', () => {
      expect(true).toBe(true);
    });
    it('status.', () => {
      expect(true).toBe(true);
    });
    it('customTpl.', () => {
      expect(true).toBe(true);
    });
    it('nodeStatus.', () => {
      expect(true).toBe(true);
    });
  });
});
