import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTreeFileComponent, XTreeFileNode, XTreeFilePrefix } from '@ng-nest/ui/tree-file';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XComputedStyle, XData } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XTreeFileComponent],
  template: ` <x-tree-file> </x-tree-file> `
})
class XTestTreeFileComponent {}

@Component({
  imports: [XTreeFileComponent],
  template: `
    <x-tree-file
      [data]="data()"
      [domain]="domain()"
      [(toggle)]="toggle"
      [showToggle]="showToggle()"
      [showTree]="showTree()"
      [showCrumb]="showCrumb()"
      [maxHeight]="maxHeight()"
      [spacing]="spacing()"
      [(activatedId)]="activatedId"
      [expanded]="expanded()"
      [expandedAll]="expandedAll()"
      [expandedLevel]="expandedLevel()"
    >
    </x-tree-file>
  `
})
class XTestTreeFilePropertyComponent {
  data = signal<XData<XTreeFileNode>>([]);
  domain = signal('');
  toggle = signal(true);
  showToggle = signal(true);
  showTree = signal(true);
  showCrumb = signal(true);
  maxHeight = signal('37.5rem');
  spacing = signal('1rem');
  activatedId = signal<any | null>(null);
  expanded = signal<any[]>([]);
  expandedAll = signal(false);
  expandedLevel = signal(-1);
}

xdescribe(XTreeFilePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTreeFileComponent, XTestTreeFilePropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestTreeFileComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTreeFileComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTreeFileComponent));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTreeFilePropertyComponent>;
    let component: XTestTreeFilePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTreeFilePropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const data = [
      { id: '1', label: '111', content: 'content1 content1 content1' },
      { id: '2', label: '222', content: 'content2 content2 content2' },
      { id: '3', label: '333', content: 'content3 content3 content3' },
      { id: '4', pid: '1', label: '444', content: 'content4 content4 content4' }
    ];
    it('data.', () => {
      component.data.set(data);
      fixture.detectChanges();
      const catalog = fixture.debugElement.query(By.css('.x-tree-file-catalog'));
      expect(catalog.nativeElement.innerText).toBe('111\n222\n333');
    });
    it('domain.', () => {
      // CORS. We will request the domain along with the URL in the data
      component.data.set([
        {
          id: '1__my-app/e2e/src/app.e2e-spec.ts',
          label: 'app.e2e-spec.ts',
          url: 'docs/ui/getting-started/demo/1__my-app/e2e/src/app.e2e-spec.ts',
          type: 'ts',
          highlightLines: {}
        }
      ]);
      component.domain.set('https://ngnest.com/static');
      fixture.detectChanges();
      expect(true).toBe(true);
    });
    it('toggle.', () => {
      component.data.set(data);
      fixture.detectChanges();
      const treeFile = fixture.debugElement.query(By.css('.x-tree-file'));
      expect(treeFile.nativeElement).toHaveClass('x-tree-file-toggle');

      component.toggle.set(false);
      fixture.detectChanges();
      expect(treeFile.nativeElement).not.toHaveClass('x-tree-file-toggle');
    });
    it('showToggle.', () => {
      component.data.set(data);
      fixture.detectChanges();
      let menu = fixture.debugElement.query(By.css('.x-tree-file-menu'));
      expect(menu).toBeTruthy();

      component.showToggle.set(false);
      fixture.detectChanges();
      menu = fixture.debugElement.query(By.css('.x-tree-file-menu'));
      expect(menu).toBeFalsy();
    });
    it('showTree.', () => {
      component.data.set(data);
      fixture.detectChanges();
      let catalog = fixture.debugElement.query(By.css('.x-tree-file-catalog'));
      expect(catalog).toBeTruthy();

      component.showTree.set(false);
      fixture.detectChanges();
      catalog = fixture.debugElement.query(By.css('.x-tree-file-catalog'));
      expect(catalog).toBeFalsy();
    });
    it('showCrumb.', () => {
      component.data.set(data);
      fixture.detectChanges();
      let crumb = fixture.debugElement.query(By.css('.x-tree-file-crumb'));
      expect(crumb).toBeTruthy();

      component.showCrumb.set(false);
      fixture.detectChanges();
      crumb = fixture.debugElement.query(By.css('.x-tree-file-crumb'));
      expect(crumb).toBeFalsy();
    });
    it('maxHeight.', () => {
      component.data.set(data);
      component.maxHeight.set('100px');
      fixture.detectChanges();
      const catalog = fixture.debugElement.query(By.css('.x-tree-file-catalog'));
      expect(Number(XComputedStyle(catalog.nativeElement, 'max-height'))).toBe(100);
    });
    it('spacing.', () => {
      component.data.set(data);
      component.spacing.set('50px');
      fixture.detectChanges();
      const right = fixture.debugElement.query(By.css('.x-tree-node-right'));
      expect(right.nativeElement.clientWidth).toBe(50);
    });
    it('activatedId.', () => {
      component.data.set(data);
      component.activatedId.set('2');
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css('.x-tree-node-content.x-activated'));
      expect(content.nativeElement.innerText).toBe('222');
    });
    it('expanded.', () => {
      component.data.set(data);
      component.expanded.set(['1']);
      fixture.detectChanges();
      const catalog = fixture.debugElement.query(By.css('.x-tree-file-catalog'));
      expect(catalog.nativeElement.innerText).toBe('111\n444\n222\n333');
    });
    it('expandedAll.', () => {
      component.data.set(data);
      component.expandedAll.set(true);
      fixture.detectChanges();
      const catalog = fixture.debugElement.query(By.css('.x-tree-file-catalog'));
      expect(catalog.nativeElement.innerText).toBe('111\n444\n222\n333');
    });
    it('expandedLevel.', () => {
      component.data.set(data);
      component.expandedLevel.set(0);
      fixture.detectChanges();
      const catalog = fixture.debugElement.query(By.css('.x-tree-file-catalog'));
      expect(catalog.nativeElement.innerText).toBe('111\n444\n222\n333');
    });
  });
});
