import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, provideExperimentalZonelessChangeDetection, signal, TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XListComponent, XListDragDrop, XListNode, XListPrefix } from '@ng-nest/ui/list';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XData, XSize, XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XListComponent],
  template: ` <x-list></x-list> `
})
class XTestListComponent {}

@Component({
  standalone: true,
  imports: [XListComponent],
  template: `
    <x-list
      [data]="data()"
      [multiple]="multiple()"
      [selectAll]="selectAll()"
      [selectAllText]="selectAllText()"
      [checked]="checked()"
      [drag]="drag()"
      [objectArray]="objectArray()"
      [nodeTpl]="nodeTpl()"
      [header]="header()"
      [footer]="footer()"
      [scrollElement]="scrollElement()"
      [loadMore]="loadMore()"
      [loadMoreText]="loadMoreText()"
      [virtualScroll]="virtualScroll()"
      [scrollHeight]="scrollHeight()"
      [heightAdaption]="heightAdaption()"
      [minBufferPx]="minBufferPx()"
      [maxBufferPx]="maxBufferPx()"
      [keywordText]="keywordText()"
      [caseSensitive]="caseSensitive()"
      [inPortal]="inPortal()"
      (onSelectAll)="onSelectAll($event)"
      (nodeMouseenter)="nodeMouseenter($event)"
      (nodeMouseleave)="nodeMouseleave($event)"
      (nodeClick)="nodeClick($event)"
      (dropListDropped)="dropListDropped($event)"
      (keyManagerTabOut)="keyManagerTabOut()"
      (keyManagerChange)="keyManagerChange($event)"
      [size]="size()"
    >
    </x-list>
  `
})
class XTestListPropertyComponent {
  data = signal<XData<XListNode>>([]);
  multiple = signal(1);
  selectAll = signal(false);
  selectAllText = signal('');
  checked = signal(false);
  drag = signal(false);
  objectArray = signal(false);
  nodeTpl = signal<TemplateRef<any> | null>(null);
  header = signal<XTemplate>('');
  footer = signal<XTemplate>('');
  scrollElement = signal<HTMLElement | null>(null);
  loadMore = signal(false);
  loadMoreText = signal('');
  loadingMoreText = signal('');
  virtualScroll = signal(false);
  scrollHeight = signal(400);
  heightAdaption = signal<ElementRef<HTMLElement> | HTMLElement | null>(null);
  minBufferPx = signal(100);
  maxBufferPx = signal(200);
  keywordText = signal<string | string[]>('');
  caseSensitive = signal(true);
  inPortal = signal(false);

  onSelectAllResult = signal<boolean | null>(null);
  onSelectAll(selelcAll: boolean) {
    this.onSelectAllResult.set(selelcAll);
  }

  nodeMouseenterResult = signal<XListNode | null>(null);
  nodeMouseenter(node: XListNode) {
    this.nodeMouseenterResult.set(node);
  }

  nodeMouseleaveResult = signal<XListNode | null>(null);
  nodeMouseleave(node: XListNode) {
    this.nodeMouseleaveResult.set(node);
  }

  nodeClickResult = signal<XListNode | null>(null);
  nodeClick(node: XListNode) {
    this.nodeClickResult.set(node);
  }

  dropListDroppedResult = signal<XListDragDrop | null>(null);
  dropListDropped(node: XListDragDrop) {
    this.dropListDroppedResult.set(node);
  }

  keyManagerTabOut() {}

  keyManagerChangeResult = signal<number | null>(null);
  keyManagerChange(key: number) {
    this.keyManagerChangeResult.set(key);
  }

  size = signal<XSize>('medium');
}

describe(XListPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestListComponent, XTestListPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestListComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestListComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XListComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestListPropertyComponent>;
    // let component: XTestListPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestListPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('multiple.', () => {
      expect(true).toBe(true);
    });
    it('selectAll.', () => {
      expect(true).toBe(true);
    });
    it('selectAllText.', () => {
      expect(true).toBe(true);
    });
    it('checked.', () => {
      expect(true).toBe(true);
    });
    it('drag.', () => {
      expect(true).toBe(true);
    });
    it('objectArray.', () => {
      expect(true).toBe(true);
    });
    it('nodeTpl.', () => {
      expect(true).toBe(true);
    });
    it('header.', () => {
      expect(true).toBe(true);
    });
    it('footer.', () => {
      expect(true).toBe(true);
    });
    it('scrollElement.', () => {
      expect(true).toBe(true);
    });
    it('loadMore.', () => {
      expect(true).toBe(true);
    });
    it('loadMoreText.', () => {
      expect(true).toBe(true);
    });
    it('loadingMoreText.', () => {
      expect(true).toBe(true);
    });
    it('virtualScroll.', () => {
      expect(true).toBe(true);
    });
    it('scrollHeight.', () => {
      expect(true).toBe(true);
    });
    it('heightAdaption.', () => {
      expect(true).toBe(true);
    });
    it('minBufferPx.', () => {
      expect(true).toBe(true);
    });
    it('maxBufferPx.', () => {
      expect(true).toBe(true);
    });
    it('keywordText.', () => {
      expect(true).toBe(true);
    });
    it('caseSensitive.', () => {
      expect(true).toBe(true);
    });
    it('inPortal.', () => {
      expect(true).toBe(true);
    });
    it('onSelectAll.', () => {
      expect(true).toBe(true);
    });
    it('nodeMouseenter.', () => {
      expect(true).toBe(true);
    });
    it('nodeMouseleave.', () => {
      expect(true).toBe(true);
    });
    it('nodeClick.', () => {
      expect(true).toBe(true);
    });
    it('dropListDropped.', () => {
      expect(true).toBe(true);
    });
    it('keyManagerTabOut.', () => {
      expect(true).toBe(true);
    });
    it('keyManagerChange.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
  });
});
