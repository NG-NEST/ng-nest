import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCrumbComponent, XCrumbNode, XCrumbNodeClick, XCrumbPrefix } from '@ng-nest/ui/crumb';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XDataArray, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XCrumbComponent],
  template: ` <x-crumb></x-crumb> `
})
class XTestCrumbComponent {}

@Component({
  imports: [XCrumbComponent],
  template: `
    <x-crumb [data]="data()" [nodeTpl]="nodeTpl()" [separator]="separator()" (nodeClick)="nodeClick($event)"> </x-crumb>

    <ng-template #nodeTemplate let-node="$node">{{ node.label }} tpl</ng-template>
  `
})
class XTestCrumbPropertyComponent {
  data = signal<XDataArray<XCrumbNode>>([]);
  nodeTpl = signal<TemplateRef<any> | null>(null);
  nodeTemplage = viewChild.required<TemplateRef<void>>('nodeTemplate');
  separator = signal<XTemplate>('/');

  nodeClickResult = signal<XCrumbNodeClick | null>(null);
  nodeClick(node: XCrumbNodeClick) {
    this.nodeClickResult.set(node);
  }
}

xdescribe(XCrumbPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCrumbComponent, XTestCrumbPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCrumbPropertyComponent>;
    let component: XTestCrumbPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCrumbPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();

      const ul = fixture.debugElement.query(By.css('.x-crumb'));
      expect(ul.nativeElement.innerText).toBe('aa\n/\nbb\n/\ncc');
    });
    it('nodeTpl.', () => {
      component.data.set(['aa']);
      component.nodeTpl.set(component.nodeTemplage());
      fixture.detectChanges();

      const ul = fixture.debugElement.query(By.css('.x-crumb'));
      expect(ul.nativeElement.innerText).toBe('aa tpl');
    });
    it('separator.', () => {
      component.data.set(['aa', 'bb']);
      component.separator.set('>');
      fixture.detectChanges();
      const ul = fixture.debugElement.query(By.css('.x-crumb'));
      expect(ul.nativeElement.innerText).toBe('aa\n>\nbb');
    });
    it('nodeClick.', () => {
      component.data.set(['aa']);
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css('x-link'));
      link.nativeElement.click();
      fixture.detectChanges();
      expect(component.nodeClickResult()?.node.id).toBe('aa');
    });
  });
});
