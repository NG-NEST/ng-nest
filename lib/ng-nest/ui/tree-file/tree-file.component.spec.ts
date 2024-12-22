import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTreeFileComponent, XTreeFileNode, XTreeFilePrefix } from '@ng-nest/ui/tree-file';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XData } from '@ng-nest/ui/core';
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

describe(XTreeFilePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTreeFileComponent, XTestTreeFilePropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
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
  describe(`input.`, async () => {
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
      expect(true).toBe(true);
    });
    it('domain.', () => {
      expect(true).toBe(true);
    });
    it('toggle.', () => {
      expect(true).toBe(true);
    });
    it('showToggle.', () => {
      expect(true).toBe(true);
    });
    it('showTree.', () => {
      expect(true).toBe(true);
    });
    it('showCrumb.', () => {
      expect(true).toBe(true);
    });
    it('maxHeight.', () => {
      expect(true).toBe(true);
    });
    it('spacing.', () => {
      expect(true).toBe(true);
    });
    it('activatedId.', () => {
      expect(true).toBe(true);
    });
    it('expanded.', () => {
      expect(true).toBe(true);
    });
    it('expandedAll.', () => {
      expect(true).toBe(true);
    });
    it('expandedLevel.', () => {
      expect(true).toBe(true);
    });
  });
});
