import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  ElementRef,
  provideZonelessChangeDetection,
  signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTreeAction, XTreeComponent, XTreeNode, XTreeNodeDragEvent, XTreePrefix } from '@ng-nest/ui/tree';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XAlign, XComputedStyle, XData, XIsObjectArray, XSleep } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  imports: [XTreeComponent],
  template: ` <x-tree> </x-tree> `
})
class XTestTreeComponent {}

@Component({
  imports: [XTreeComponent, XIconComponent],
  template: `
    <div #scrollRef [class.scroll]="isScroll()">
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
    </div>

    <ng-template #labelTemplate let-node="$node">
      <span>{{ node.label }} tpl</span>
    </ng-template>

    <ng-template #expandedIconTpl let-node="$node">
      <x-icon [type]="!node.open ? 'fto-plus-square' : 'fto-minus-square'"></x-icon>
    </ng-template>
  `,
  styles: `
    :host .scroll {
      height: 100px;
      overflow: auto;
    }
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
  labelTemplate = viewChild.required<TemplateRef<void>>('labelTemplate');
  nodeHeight = signal('');
  allowManyActivated = signal(false);
  drag = signal(false);

  activatedChangeIndex = signal(0);
  activatedChangeResult = signal<XTreeNode | null>(null);
  activatedChange(node: XTreeNode) {
    this.activatedChangeIndex.update((x) => x + 1);
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
  isScroll = signal(false);
  scrollRef = viewChild.required<ElementRef<HTMLDivElement>>('scrollRef');

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
  expandedIconTpl = viewChild.required<TemplateRef<void>>('expandedIconTpl');
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

xdescribe(XTreePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTreeComponent, XTestTreePropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTreePropertyComponent>;
    let component: XTestTreePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTreePropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const data: XTreeNode[] = [
      { id: 1, label: 'node1' },
      { id: 2, label: 'node2' },
      { id: 3, label: 'node3' },
      { id: 4, pid: 1, label: 'node4' },
      { id: 5, pid: 2, label: 'node5' },
      { id: 6, label: 'node6' },
      { id: 7, label: 'node7' }
    ];
    it('data.', () => {
      component.data.set(data);
      fixture.detectChanges();
      const tree = fixture.debugElement.query(By.css('.x-tree'));
      expect(tree.nativeElement.innerText.trim()).toBe('node1\nnode2\nnode3\nnode6\nnode7');
    });
    it('checkbox.', () => {
      component.data.set(data);
      component.checkbox.set(true);
      fixture.detectChanges();
      const checkbox = fixture.debugElement.queryAll(By.css('x-checkbox'));
      expect(checkbox).toBeDefined();
      expect(checkbox.length).toBe(5);
    });
    it('lazy.', async () => {
      component.data.set((pid?: string): Observable<XTreeNode[]> => {
        return new Observable((x) => {
          let result = data
            .filter((y) => y.pid === pid)
            .map((x) => {
              x.leaf = data.find((y) => y.pid === x.id) ? false : true;
              return x;
            });
          setTimeout(() => {
            x.next(result);
            x.complete();
          }, 500);
        });
      });
      component.lazy.set(true);
      fixture.detectChanges();
      await XSleep(600);
      const icon = fixture.debugElement.query(By.css('.x-tree-node-content .x-tree-node-right'));
      icon.nativeElement.click();
      fixture.detectChanges();
      const loading = fixture.debugElement.query(By.css('.x-tree-node-loading'));
      expect(loading).toBeTruthy();
      await XSleep(600);
      const tree = fixture.debugElement.query(By.css('.x-tree'));
      expect(tree.nativeElement.innerText.trim()).toBe('node1\nnode4\nnode2\nnode3\nnode6\nnode7');
    });
    it('activatedId.', () => {
      component.data.set(data);
      component.activatedId.set(1);
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css('.x-tree-node-content.x-activated'));
      expect(content.nativeElement.innerText).toBe('node1');
    });
    it('expanded.', () => {
      component.data.set(data);
      component.expanded.set([1]);
      fixture.detectChanges();
      const tree = fixture.debugElement.query(By.css('.x-tree'));
      expect(tree.nativeElement.innerText.trim()).toBe('node1\nnode4\nnode2\nnode3\nnode6\nnode7');
    });
    it('checked.', async () => {
      component.data.set([{ id: 1, label: 'node1' }]);
      component.checkbox.set(true);
      component.checked.set([1]);
      fixture.detectChanges();
      await XSleep(200);
      const checkbox = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-checkbox-row-item'));
      expect(checkbox.nativeElement).toHaveClass('x-checked');
    });
    it('expandedAll.', () => {
      component.data.set(data);
      component.expandedAll.set(true);
      fixture.detectChanges();
      const tree = fixture.debugElement.query(By.css('.x-tree'));
      expect(tree.nativeElement.innerText.trim()).toBe('node1\nnode4\nnode2\nnode5\nnode3\nnode6\nnode7');
    });
    it('expandedLevel.', () => {
      component.data.set(data);
      component.expandedLevel.set(0);
      fixture.detectChanges();
      const tree = fixture.debugElement.query(By.css('.x-tree'));
      expect(tree.nativeElement.innerText.trim()).toBe('node1\nnode4\nnode2\nnode5\nnode3\nnode6\nnode7');
    });
    it('nodeOpen.', async () => {
      component.data.set([
        { id: 1, label: 'node1' },
        { id: 2, pid: 1, label: 'node2' }
      ]);
      component.nodeOpen.set(true);
      fixture.detectChanges();
      const content1 = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-tree-node-content'));
      content1.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);
      const tree = fixture.debugElement.query(By.css('.x-tree'));
      expect(tree.nativeElement.innerText.trim()).toBe('node1\nnode2');
    });
    it('spacing.', () => {
      component.data.set(data);
      component.spacing.set('50px');
      fixture.detectChanges();
      const right = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-tree-node-right'));
      expect(right.nativeElement.clientWidth).toBe(50);
    });
    it('labelTpl.', () => {
      component.data.set(data);
      component.labelTpl.set(component.labelTemplate());
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-tree-node-content'));
      expect(content.nativeElement.innerText).toBe('node1 tpl');
    });
    it('nodeHeight.', () => {
      component.data.set(data);
      component.nodeHeight.set('50px');
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-tree-node-content'));
      expect(content.nativeElement.clientHeight).toBe(50);
    });
    it('allowManyActivated.', () => {
      component.data.set(data);
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-tree-node-content'));
      content.nativeElement.click();
      fixture.detectChanges();
      expect(component.activatedChangeIndex()).toBe(1);
      content.nativeElement.click();
      fixture.detectChanges();
      expect(component.activatedChangeIndex()).toBe(1);
      component.allowManyActivated.set(true);
      fixture.detectChanges();
      content.nativeElement.click();
      fixture.detectChanges();
      expect(component.activatedChangeIndex()).toBe(2);
    });
    it('drag.', () => {
      // cdk drag
      expect(true).toBe(true);
    });
    it('activatedChange.', () => {
      component.data.set(data);
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-tree-node-content'));
      content.nativeElement.click();
      fixture.detectChanges();
      expect(component.activatedChangeResult()!.id).toBe(1);
    });
    it('checkboxChange.', () => {
      component.data.set(data);
      component.checkbox.set(true);
      fixture.detectChanges();
      const checkbox = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-checkbox-row-item'));
      checkbox.nativeElement.click();
      fixture.detectChanges();
      expect(checkbox.nativeElement).toHaveClass('x-checked');
      expect(component.checkboxChangeResult()!.id).toBe(1);
    });
    it('manual.', () => {
      component.data.set((): Observable<XTreeNode[]> => {
        return new Observable((x) => {
          x.next([{ id: 1, label: 'node1' }]);
          x.complete();
        });
      });
      component.manual.set(false);
      fixture.detectChanges();
      let tree = fixture.debugElement.query(By.css('x-tree'));
      expect(tree.nativeElement.innerText.trim()).toBe('');
      component.manual.set(true);
      fixture.detectChanges();
      expect(tree.nativeElement.innerText.trim()).toBe('node1');
    });
    it('levelCheck.', async () => {
      component.data.set(data);
      component.expandedAll.set(true);
      component.checkbox.set(true);
      fixture.detectChanges();
      await XSleep(100);
      const checkbox1 = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-checkbox-row-item'));
      checkbox1.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);
      const checkbox2 = fixture.debugElement.query(By.css('x-tree-node:nth-child(2) .x-checkbox-row-item'));
      expect(checkbox2.nativeElement).toHaveClass('x-checked');

      component.levelCheck.set(false);
      fixture.detectChanges();
      const checkbox3 = fixture.debugElement.query(By.css('x-tree-node:nth-child(3) .x-checkbox-row-item'));
      checkbox3.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);
      const checkbox4 = fixture.debugElement.query(By.css('x-tree-node:nth-child(4) .x-checkbox-row-item'));
      expect(checkbox4.nativeElement).not.toHaveClass('x-checked');
    });
    it('nodeNowrap.', () => {
      component.data.set(data);
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('.x-tree-node-label'));
      expect(label.nativeElement).toHaveClass('nowrap');

      component.nodeNowrap.set(false);
      fixture.detectChanges();
      expect(label.nativeElement).not.toHaveClass('nowrap');
    });
    it('nodeAlignItems.', () => {
      component.data.set(data);
      component.nodeAlignItems.set('start');
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-tree-node-content'));
      expect(XComputedStyle(content.nativeElement, 'align-items')).toBe('start');
    });
    it('actions.', () => {
      let handlerValue: any = null;
      component.data.set(data);
      component.actions.set([
        {
          id: 'add',
          label: 'add',
          handler: (value: XTreeNode) => {
            handlerValue = value;
          }
        }
      ]);
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-tree-node-content'));
      content.nativeElement.dispatchEvent(new Event('mouseenter'));

      const link = fixture.debugElement.query(By.css('.x-tree-node-operations x-link'));
      link.nativeElement.click();
      fixture.detectChanges();
      expect(handlerValue?.id).toBe(1);
    });
    it('scrollElement.', () => {
      // Initially, it is necessary to specify a scrolling container, which will only be used for the first execution of scrolling
      expect(true).toBe(true);
    });
    it('virtualScroll.', () => {
      component.data.set(
        Array.from({ length: 1000 }).map((_, index) => ({ id: index + 1, label: `node${index + 1}` }))
      );
      component.virtualScroll.set(true);
      fixture.detectChanges();
      const nodes = fixture.debugElement.queryAll(By.css('x-tree-node'));
      expect(nodes.length < 1000).toBeTrue();
    });

    it('virtualScrollHeight.', () => {
      component.data.set(
        Array.from({ length: 1000 }).map((_, index) => ({ id: index + 1, label: `node${index + 1}` }))
      );
      component.virtualScroll.set(true);
      component.virtualScrollHeight.set('200px');
      fixture.detectChanges();
      const scroll = fixture.debugElement.query(By.css('cdk-virtual-scroll-viewport'));
      expect(scroll.nativeElement.clientHeight).toBe(200);
    });
    it('heightAdaption.', () => {
      // Initially, it is necessary to specify a scrolling container, which will only be used for the first execution of scrolling
      expect(true).toBe(true);
    });
    it('itemSize.', () => {
      // cdk scroll param
      expect(true).toBe(true);
    });
    it('minBufferPx.', () => {
      // cdk scroll param
      expect(true).toBe(true);
    });
    it('maxBufferPx.', () => {
      // cdk scroll param
      expect(true).toBe(true);
    });
    it('multiple.', () => {
      component.data.set(data);
      component.multiple.set(true);
      fixture.detectChanges();
      const node1 = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-tree-node-content'));
      const node2 = fixture.debugElement.query(By.css('x-tree-node:nth-child(2) .x-tree-node-content'));
      const node3 = fixture.debugElement.query(By.css('x-tree-node:nth-child(3) .x-tree-node-content'));
      node1.nativeElement.click();
      node2.nativeElement.click();
      node3.nativeElement.click();
      fixture.detectChanges();
      expect(node1.nativeElement).toHaveClass('x-activated');
      expect(node2.nativeElement).toHaveClass('x-activated');
      expect(node3.nativeElement).toHaveClass('x-activated');
    });
    it('objectArray.', () => {
      component.data.set(data);
      component.multiple.set(true);
      component.objectArray.set(true);
      fixture.detectChanges();
      const node1 = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-tree-node-content'));
      const node2 = fixture.debugElement.query(By.css('x-tree-node:nth-child(2) .x-tree-node-content'));
      const node3 = fixture.debugElement.query(By.css('x-tree-node:nth-child(3) .x-tree-node-content'));
      node1.nativeElement.click();
      node2.nativeElement.click();
      node3.nativeElement.click();
      fixture.detectChanges();
      expect(XIsObjectArray(component.activatedId())).toBeTrue();
    });
    it('keywordText.', async () => {
      component.data.set([
        { id: 1, label: 'node1' },
        { id: 2, label: 'node2' }
      ]);
      fixture.detectChanges();
      component.keywordText.set('node');
      fixture.detectChanges();
      await XSleep(100);
      const keywordTexts = fixture.debugElement.queryAll(By.css('.x-keyword-text'));
      expect(keywordTexts.length).toBe(2);
    });
    it('caseSensitive.', async () => {
      component.data.set([
        { id: 1, label: 'node1' },
        { id: 2, label: 'Node2' }
      ]);
      fixture.detectChanges();
      component.keywordText.set('node');
      fixture.detectChanges();
      await XSleep(100);
      let keywordTexts = fixture.debugElement.queryAll(By.css('.x-keyword-text'));
      expect(keywordTexts.length).toBe(1);
      component.caseSensitive.set(false);
      fixture.detectChanges();
      await XSleep(100);
      keywordTexts = fixture.debugElement.queryAll(By.css('.x-keyword-text'));
      expect(keywordTexts.length).toBe(2);
    });
    it('onlyLeaf.', async () => {
      component.data.set([
        { id: 1, label: 'node1' },
        { id: 2, pid: 1, label: 'node2' }
      ]);
      component.expandedAll.set(true);
      component.onlyLeaf.set(true);
      fixture.detectChanges();
      const node1 = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-tree-node-content'));
      node1.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);
      expect(component.activatedId()).toBeNull();
      const node2 = fixture.debugElement.query(By.css('x-tree-node:nth-child(2) .x-tree-node-content'));
      node2.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);
      expect(component.activatedId()).toBe(2);
    });
    it('expandedIcon.', async () => {
      component.data.set([
        { id: 1, label: 'node1' },
        { id: 2, pid: 1, label: 'node2' }
      ]);
      component.expandedIcon.set(component.expandedIconTpl());
      fixture.detectChanges();
      await XSleep(100);
      const icon = fixture.debugElement.query(By.css('.fto-plus-square'));
      expect(icon).toBeTruthy();
    });
    it('showLine.', () => {
      component.data.set(data);
      component.showLine.set(true);
      component.expandedAll.set(true);
      fixture.detectChanges();
      const line = fixture.debugElement.query(By.css('.x-tree-node-line'));
      expect(line).toBeTruthy();
    });
    it('nodeClick.', () => {
      component.data.set(data);
      fixture.detectChanges();
      const node1 = fixture.debugElement.query(By.css('x-tree-node:nth-child(1) .x-tree-node-content'));
      node1.nativeElement.click();
      fixture.detectChanges();
      expect(component.nodeClickResult()!.id).toBe(1);
    });
    it('nodeDragStarted.', () => {
      // cdk drag
      expect(true).toBe(true);
    });
    it('nodeDragEnded.', () => {
      // cdk drag
      expect(true).toBe(true);
    });
    it('nodeDragMoved.', () => {
      // cdk drag
      expect(true).toBe(true);
    });
  });
});
