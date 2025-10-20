import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XStepsComponent, XStepsLayout, XStepsNode, XStepsPrefix, XStepsStatus } from '@ng-nest/ui/steps';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XDataArray } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XStepsComponent],
  template: ` <x-steps> </x-steps> `
})
class XTestStepsComponent {}

@Component({
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

    <ng-template #customTemplate let-node="$node">{{ node.status }}</ng-template>
  `
})
class XTestStepsPropertyComponent {
  data = signal<XDataArray<XStepsNode>>([]);
  layout = signal<XStepsLayout>('row');
  activatedIndex = signal(0);
  startIndex = signal(0);
  status = signal<XStepsStatus | null>(null);
  customTpl = signal<TemplateRef<any> | null>(null);
  customTemplate = viewChild.required<TemplateRef<any>>('customTemplate');
  nodeStatus = signal(false);
}

xdescribe(XStepsPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestStepsComponent, XTestStepsPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestStepsPropertyComponent>;
    let component: XTestStepsPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestStepsPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', async () => {
      component.data.set(['step1', 'step2', 'step3']);
      fixture.detectChanges();
      const steps = fixture.debugElement.queryAll(By.css('.x-steps-node'));
      expect(steps.length).toBe(3);
      expect(steps[0].nativeElement).toHaveClass('x-steps-process');
    });
    it('layout.', () => {
      component.data.set(['step1', 'step2', 'step3']);
      component.layout.set('column');
      fixture.detectChanges();
      const steps = fixture.debugElement.query(By.css('.x-steps'));
      expect(steps.nativeElement).toHaveClass('x-steps-column');
    });
    it('activatedIndex.', () => {
      component.data.set(['step1', 'step2', 'step3']);
      component.activatedIndex.set(1);
      fixture.detectChanges();
      const steps = fixture.debugElement.queryAll(By.css('.x-steps-node'));
      expect(steps[1].nativeElement).toHaveClass('x-steps-process');
    });
    it('startIndex.', () => {
      component.data.set(['step1', 'step2', 'step3']);
      component.startIndex.set(5);
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('.x-steps-icon'));
      expect(icon.nativeElement.innerText).toBe('6');
    });
    it('status.', () => {
      component.data.set(['step1', 'step2', 'step3']);
      component.status.set('error');
      fixture.detectChanges();
      const node = fixture.debugElement.query(By.css('.x-steps-node'));
      expect(node.nativeElement).toHaveClass('x-steps-error');
    });
    it('customTpl.', () => {
      component.data.set(['step1', 'step2', 'step3']);
      component.customTpl.set(component.customTemplate());
      fixture.detectChanges();
      const headers = fixture.debugElement.queryAll(By.css('.x-steps-header'));
      expect(headers.length).toBe(3);
      expect(headers[0].nativeElement.innerText).toBe('process');
      expect(headers[1].nativeElement.innerText).toBe('wait');
      expect(headers[2].nativeElement.innerText).toBe('wait');
    });
    it('nodeStatus.', () => {
      component.nodeStatus.set(true);
      component.data.set([
        { label: 'step1', status: 'process' },
        { label: 'step2', status: 'finish' },
        { label: 'step3', status: 'process' },
        { label: 'step4', status: 'finish' },
        { label: 'step5', status: 'error' },
        { label: 'step6', status: 'process' }
      ]);
      fixture.detectChanges();
      const nodes = fixture.debugElement.queryAll(By.css('.x-steps-node'));
      expect(nodes[0].nativeElement).toHaveClass('x-steps-process');
      expect(nodes[1].nativeElement).toHaveClass('x-steps-finish');
      expect(nodes[2].nativeElement).toHaveClass('x-steps-process');
      expect(nodes[3].nativeElement).toHaveClass('x-steps-finish');
      expect(nodes[4].nativeElement).toHaveClass('x-steps-error');
      expect(nodes[5].nativeElement).toHaveClass('x-steps-process');
    });
  });
});
