import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTreeAction, XTreeComponent, XTreeNode, XTreeNodeDragEvent, XTreePrefix } from '@ng-nest/ui/tree';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XData } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XTreeComponent],
  template: ` <x-tree> </x-tree> `
})
class XTestTreeComponent {}

@Component({
  standalone: true,
  imports: [XTreeComponent],
  template: `
    <x-tree
      [data]="data()"
      [checkbox]="checkbox()"
      [lazy]="lazy()"
      [(activatedId)]="activatedId"
      [expanded]="expanded()"
      [(checked)]="checked"
      [expandedAll]="expandedAll()"
      [expandedLevel]="expandedLevel()"
      [nodeOpen]="nodeOpen()"
      [spacing]="spacing()"
      [labelTpl]="labelTpl()"
      [nodeHeight]="nodeHeight()"
      [allowManyActivated]="allowManyActivated()"
      [drag]="drag()"
      (activatedChange)="activatedChange($event)"
      (checkboxChange)="checkboxChange($event)"
      [(manual)]="manual"
      [levelCheck]="levelCheck()"
      [nodeNowrap]="nodeNowrap()"
      [nodeAlignItems]="nodeAlignItems()"
      [actions]="actions()"
      [scrollElement]="scrollElement()"
      [virtualScroll]="virtualScroll()"
      [virtualScrollHeight]="virtualScrollHeight()"
      [heightAdaption]="heightAdaption()"
      [itemSize]="itemSize()"
      [minBufferPx]="minBufferPx()"
      [maxBufferPx]="maxBufferPx()"
      [multiple]="multiple()"
      [objectArray]="objectArray()"
      [keywordText]="keywordText()"
      [caseSensitive]="caseSensitive()"
      [onlyLeaf]="onlyLeaf()"
      [expandedIcon]="expandedIcon()"
      [showLine]="showLine()"
      (nodeClick)="nodeClick($event)"
      (nodeDragStarted)="nodeDragStarted($event)"
      (nodeDragEnded)="nodeDragEnded($event)"
      (nodeDragMoved)="nodeDragMoved($event)"
    >
    </x-tree>
  `
})
class XTestTreePropertyComponent {
  data = signal<XData<XTreeNode>>([]);
  checkbox = signal(false);
  lazy = signal(false);
  activatedId = signal<any>(null);
  expanded = signal<any[]>([]);
  checked = signal<any[]>([]);
  expandedAll = signal(false);
  expandedLevel = signal(-1);
  nodeOpen = signal(false);
  spacing = signal('1.5rem');
  labelTpl = signal<TemplateRef<void> | null>(null);
  nodeHeight = signal('');
  allowManyActivated = signal(false);
  drag = signal(false);
  activatedChangeResult = signal<XTreeNode | null>(null);
  activatedChange(node: XTreeNode) {
    this.activatedChangeResult.set(node);
  }

  checkboxChangeResult = signal<XTreeNode | null>(null);
  checkboxChange(node: XTreeNode) {
    this.checkboxChangeResult.set(node);
  }

  manual = signal(true);
  levelCheck = signal(true);
  nodeNowrap = signal(true);
  nodeAlignItems = signal<XAlign>('center');
  actions = signal<XTreeAction[]>([]);
  scrollElement = signal<HTMLElement | null>(null);
  virtualScroll = signal(false);
  virtualScrollHeight = signal('400px');
  heightAdaption = signal<HTMLElement | null>(null);
  itemSize = signal(34);
  minBufferPx = signal(100);
  maxBufferPx = signal(200);
  multiple = signal(false);
  objectArray = signal(false);
  keywordText = signal<string | string[] | null>(null);
  caseSensitive = signal(true);
  onlyLeaf = signal(false);
  expandedIcon = signal<TemplateRef<void> | null>(null);
  showLine = signal(false);

  nodeClickResult = signal<XTreeNode | null>(null);
  nodeClick(node: XTreeNode) {
    this.nodeClickResult.set(node);
  }

  nodeDragStartedResult = signal<XTreeNodeDragEvent | null>(null);
  nodeDragStarted(event: XTreeNodeDragEvent) {
    this.nodeDragStartedResult.set(event);
  }

  nodeDragEndedResult = signal<XTreeNodeDragEvent | null>(null);
  nodeDragEnded(event: XTreeNodeDragEvent) {
    this.nodeDragEndedResult.set(event);
  }

  nodeDragMovedResult = signal<XTreeNodeDragEvent | null>(null);
  nodeDragMoved(event: XTreeNodeDragEvent) {
    this.nodeDragMovedResult.set(event);
  }
}

describe(XTreePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTreeComponent, XTestTreePropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestTreeComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTreeComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTreeComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTreePropertyComponent>;
    // let component: XTestTreePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTreePropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('checkbox.', () => {
      expect(true).toBe(true);
    });
    it('lazy.', () => {
      expect(true).toBe(true);
    });
    it('activatedId.', () => {
      expect(true).toBe(true);
    });
    it('expanded.', () => {
      expect(true).toBe(true);
    });
    it('checked.', () => {
      expect(true).toBe(true);
    });
    it('expandedAll.', () => {
      expect(true).toBe(true);
    });
    it('expandedLevel.', () => {
      expect(true).toBe(true);
    });
    it('nodeOpen.', () => {
      expect(true).toBe(true);
    });
    it('spacing.', () => {
      expect(true).toBe(true);
    });
    it('labelTpl.', () => {
      expect(true).toBe(true);
    });
    it('nodeHeight.', () => {
      expect(true).toBe(true);
    });
    it('allowManyActivated.', () => {
      expect(true).toBe(true);
    });
    it('drag.', () => {
      expect(true).toBe(true);
    });
    it('activatedChange.', () => {
      expect(true).toBe(true);
    });
    it('checkboxChange.', () => {
      expect(true).toBe(true);
    });
    it('manual.', () => {
      expect(true).toBe(true);
    });
    it('levelCheck.', () => {
      expect(true).toBe(true);
    });
    it('nodeNowrap.', () => {
      expect(true).toBe(true);
    });
    it('nodeAlignItems.', () => {
      expect(true).toBe(true);
    });
    it('actions.', () => {
      expect(true).toBe(true);
    });
    it('scrollElement.', () => {
      expect(true).toBe(true);
    });
    it('virtualScroll.', () => {
      expect(true).toBe(true);
    });

    it('virtualScrollHeight.', () => {
      expect(true).toBe(true);
    });
    it('heightAdaption.', () => {
      expect(true).toBe(true);
    });
    it('itemSize.', () => {
      expect(true).toBe(true);
    });
    it('minBufferPx.', () => {
      expect(true).toBe(true);
    });
    it('maxBufferPx.', () => {
      expect(true).toBe(true);
    });
    it('multiple.', () => {
      expect(true).toBe(true);
    });
    it('objectArray.', () => {
      expect(true).toBe(true);
    });
    it('keywordText.', () => {
      expect(true).toBe(true);
    });
    it('caseSensitive.', () => {
      expect(true).toBe(true);
    });
    it('onlyLeaf.', () => {
      expect(true).toBe(true);
    });
    it('expandedIcon.', () => {
      expect(true).toBe(true);
    });
    it('showLine.', () => {
      expect(true).toBe(true);
    });
    it('nodeClick.', () => {
      expect(true).toBe(true);
    });
    it('nodeDragStarted.', () => {
      expect(true).toBe(true);
    });
    it('nodeDragEnded.', () => {
      expect(true).toBe(true);
    });
    it('nodeDragMoved.', () => {
      expect(true).toBe(true);
    });
  });
});
