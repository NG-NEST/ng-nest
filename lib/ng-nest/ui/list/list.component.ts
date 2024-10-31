import { Subject, Subscription } from 'rxjs';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  QueryList,
  ElementRef,
  HostBinding,
  HostListener,
  ViewChildren,
  inject,
  afterRender,
  viewChild,
  signal,
  computed
} from '@angular/core';
import { XListPrefix, XListNode, XListProperty } from './list.property';
import { XIsChange, XSetData, XIsEmpty, XIsUndefined, XIsNull, XResize, XResizeObserver } from '@ng-nest/ui/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { XListOptionComponent } from './list-option.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';
import { map, takeUntil, debounceTime } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XI18nList, XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { XListDropGroup, X_LIST_DROP_GROUP } from './list-drop-group.directive';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

@Component({
  selector: `${XListPrefix}`,
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag,
    ScrollingModule,
    XIconComponent,
    XEmptyComponent,
    XListOptionComponent,
    XOutletDirective
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XListComponent)]
})
export class XListComponent extends XListProperty implements OnChanges {
  private unSubject = new Subject<void>();
  private i18n = inject(XI18nService);
  private group = inject<XListDropGroup>(X_LIST_DROP_GROUP, { optional: true, skipSelf: true });
  nodes = signal<XListNode[]>([]);
  selectedNodes = signal<XListNode[]>([]);
  headerRef = viewChild<ElementRef<HTMLElement>>('headerRef');
  footerRef = viewChild<ElementRef<HTMLElement>>('footerRef');
  selectAllRef = viewChild<ElementRef<HTMLElement>>('selectAllRef');
  loadMoreRef = viewChild<ElementRef<HTMLElement>>('loadMoreRef');
  virtualBody = viewChild<CdkVirtualScrollViewport>('virtualBody');
  dropList = viewChild<CdkDropList>(CdkDropList);
  @ViewChildren(XListOptionComponent)
  options!: QueryList<XListOptionComponent>;
  keyManager!: ActiveDescendantKeyManager<XListOptionComponent>;
  isSelectAll = signal(false);
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.list as XI18nList)), { initialValue: zh_CN.list });
  loadMoreIndex = signal(0);
  icon = signal('');
  iconSpin = signal(false);
  scrollHeightSignal = signal(0);
  classMap = computed(() => ({
    [`${XListPrefix}-${this.size()}`]: this.size() ? true : false
  }));
  sizeChange: Subscription | null = null;
  private resizeObserver!: XResizeObserver;

  @HostBinding('attr.role') role = 'listbox';
  @HostBinding('attr.tabindex') tabindex = -1;

  @HostListener('keydown', ['$event']) keydown($event: KeyboardEvent) {
    this.keyManager.onKeydown($event);
    const activeIndex = this.keyManager.activeItemIndex as number;
    if ($event.keyCode === ENTER && !XIsUndefined(activeIndex)) {
      this.setUnActive(activeIndex);
      this.onNodeClick($event, this.nodes()[activeIndex]);
    }
  }

  itemSizeMap: { [key: string]: number } = {
    mini: 22,
    small: 24,
    medium: 28,
    large: 32,
    big: 36
  };

  itemSize = computed(() => this.itemSizeMap[this.size()]);
  isEmpty = computed(() => XIsEmpty(this.nodes()));
  getSelectAllText = computed(() => this.selectAllText() || this.locale().selectAllText);
  getLoadMoreText = computed(() => this.loadMoreText() || this.locale().loadMoreText);
  getLoadingMoreText = computed(() => this.loadingMoreText() || this.locale().loadingMoreText);

  getVirtualScrollHeight() {
    let headerH = 0,
      footerH = 0,
      selectAllH = 0,
      loadMoreH = 0;
    if (this.headerRef()) headerH = this.headerRef()!.nativeElement.clientHeight;
    if (this.footerRef()) footerH = this.footerRef()!.nativeElement.clientHeight;
    if (this.selectAllRef()) selectAllH = this.selectAllRef()!.nativeElement.clientHeight;
    if (this.loadMoreRef()) loadMoreH = this.loadMoreRef()!.nativeElement.clientHeight;

    return this.scrollHeightSignal() - headerH - footerH - selectAllH - loadMoreH;
  }

  override writeValue(value: any): void {
    this.value.set(value);
    this.setSelected();
    this.setKeyManager();
  }

  constructor() {
    super();
    afterRender({
      mixedReadWrite: () => {
        if (this.virtualScroll() && this.scrollHeight()) {
          this.virtualBody()?.checkViewportSize();
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data, scrollHeight, heightAdaption } = changes;
    XIsChange(data) && this.setData();
    XIsChange(scrollHeight) &&
      this.virtualScroll() &&
      !this.heightAdaption() &&
      this.scrollHeightSignal.set(this.scrollHeight());
    XIsChange(heightAdaption) && this.virtualScroll() && this.setHeightAdaption();
  }

  ngAfterViewInit() {
    this.initKeyManager();
    if (this.virtualScroll() && this.heightAdaption()) {
      this.setHeightAdaption();
    } else {
      this.scrollHeightSignal.set(this.scrollHeight());
    }
    if (this.group && this.dropList()) {
      this.group.dropLists.add(this.dropList()!);
      this.group.setConnectedTo();
    }
  }

  setHeightAdaption() {
    this.setVirtualScrollHeight();
    if (this.sizeChange) this.sizeChange.unsubscribe();
    this.sizeChange = XResize(this.heightAdaption() as HTMLElement)
      .pipe(debounceTime(30), takeUntil(this.unSubject))
      .subscribe((x) => {
        this.resizeObserver = x.resizeObserver;
        this.setVirtualScrollHeight();
      });
  }

  minBufferPxSignal = computed(() => {
    if (this.virtualScroll() && this.heightAdaption()) {
      return this.getVirtualScrollHeight();
    } else {
      return this.minBufferPx();
    }
  });
  maxBufferPxSignal = computed(() => {
    if (this.virtualScroll() && this.heightAdaption()) {
      return this.getVirtualScrollHeight() * 1.2;
    } else {
      return this.maxBufferPx();
    }
  });

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
    this.resizeObserver?.disconnect();
    this.group?.dropLists.delete(this.dropList()!);
  }

  private setVirtualScrollHeight() {
    this.scrollHeightSignal.set((this.heightAdaption() as HTMLElement).clientHeight);
    if (!this.virtualBody()) return;
    this.virtualBody()!['_scrollStrategy']['_minBufferPx'] = this.minBufferPxSignal();
    this.virtualBody()!['_scrollStrategy']['_maxBufferPx'] = this.maxBufferPxSignal();
  }

  private setData() {
    if (this.loadMore()) {
      this.icon.set('fto-loader');
      this.iconSpin.set(true);
    }
    XSetData<XListNode>(this.data(), this.unSubject, true, this.loadMoreIndex()).subscribe((x) => {
      if (this.loadMore()) {
        this.nodes.update((y) => [...y, ...x]);
        this.icon.set('');
        this.iconSpin.set(false);
      } else {
        this.nodes.set(x);
      }
      this.setSelected();
      this.setKeyManager();
    });
  }

  private initKeyManager() {
    this.keyManager = new ActiveDescendantKeyManager<XListOptionComponent>(this.options).withWrap();
    this.keyManager.tabOut.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.setUnActive(this.keyManager.activeItemIndex as number);
      this.keyManagerTabOut.emit();
    });
    this.keyManager.change.pipe(takeUntil(this.unSubject)).subscribe((num: number) => {
      this.setScorllTop(num);
      this.keyManagerChange.emit(num);
    });
  }

  setScorllTop(_num: number) {
    let list = this.scrollElement();
    if (!list || !this.keyManager.activeItem) return;
    let ele = this.keyManager.activeItem.elementRef.nativeElement as HTMLElement;
    let min = list.scrollTop;
    let max = list.scrollTop + list.clientHeight;
    if (ele.offsetTop + ele.clientHeight > max) {
      let scrollTop = ele.offsetTop + ele.clientHeight - list.clientHeight;
      list.scrollTop = scrollTop;
    }
    if (ele.offsetTop < min) {
      list.scrollTop = ele.offsetTop;
    }
  }

  setSelected() {
    const nodes = this.nodes();
    const value = this.value();
    const objectArray = this.objectArray();
    if (nodes.length > 0) {
      nodes
        .filter((x) => x.selected)
        .map((x) => {
          x.selected = false;
        });
      let valArry: any[] = [];
      if (value instanceof Array) {
        valArry = value;
        if (valArry.length === nodes.length) {
          this.isSelectAll.set(true);
        }
      } else {
        valArry = [value];
      }

      let ids = [];
      let selectedNodes = [];
      if (objectArray) {
        ids = valArry.filter((x) => !XIsUndefined(x) && !XIsNull(x)).map((x) => x.id);
      } else {
        ids = valArry;
      }
      for (let id of ids) {
        let node = nodes.find((x) => x.id === id);
        if (node) {
          node.selected = true;
          selectedNodes.push(node);
        }
      }
      this.selectedNodes.set(selectedNodes);
    }
  }

  setKeyManager() {
    if (XIsUndefined(this.keyManager) || XIsEmpty(this.nodes())) return;
    let activeIndex = 0;
    let value = this.value();
    let objectArray = this.objectArray();
    if (XIsEmpty(value)) {
      this.keyManager.updateActiveItem(activeIndex);
      return;
    }
    let valArry: any[] = [];
    if (value instanceof Array) {
      valArry = value;
    } else {
      valArry = [value];
    }
    const first = valArry[0];
    if (objectArray) {
      activeIndex = this.nodes().findIndex((x) => x.id === first.id);
    } else {
      activeIndex = this.nodes().findIndex((x) => x.id === first);
    }
    this.keyManager.updateActiveItem(activeIndex);
    this.setScorllTop(activeIndex);
  }

  onNodeClick(event: Event, node: XListNode) {
    if (XIsUndefined(node) || node.disabled) {
      event.stopPropagation();
      return;
    }
    if (node.disabled) return;
    if (node.selected && this.multiple() === 1) {
      node.event = event;
      this.nodeClick.emit(node);
      return;
    }
    const selected = !node.selected;
    if (selected) {
      if (this.selectedNodes().length < this.multiple() || this.multiple() === 0 || isNaN(this.multiple())) {
        node.selected = selected;
        this.selectedNodes.update((x) => [...x, node]);
        if (this.selectedNodes().length === this.nodes().length) {
          this.isSelectAll.set(true);
        }
      } else if (this.multiple() === 1 && this.selectedNodes().length === 1) {
        node.selected = selected;
        this.selectedNodes.update((x) => {
          x[0].selected = false;
          x[0] = node;
          return [...x];
        });
      } else {
        return;
      }
    } else {
      node.selected = selected;
      this.selectedNodes.update((x) => {
        x.splice(
          x.findIndex((x) => x.id == node.id),
          1
        );
        return [...x];
      });
      this.isSelectAll.set(false);
    }

    if (this.multiple() === 1 && this.selectedNodes().length === 1) {
      this.value.set(this.objectArray() ? this.selectedNodes()[0] : this.selectedNodes()[0].id);
    } else {
      this.value.set(this.objectArray() ? this.selectedNodes() : this.selectedNodes().map((x) => x.id));
    }
    if (this.onChange) this.onChange(this.value());
    node.event = event;
    this.nodeClick.emit(node);
  }

  onMouseenter(event: Event, node: XListNode) {
    if (node.disabled) {
      event.stopPropagation();
      return;
    }
    node.event = event;
    this.nodeMouseenter.emit(node);
  }

  onMouseleave(event: Event, node: XListNode) {
    if (node.disabled) {
      event.stopPropagation();
      return;
    }
    node.event = event;
    this.nodeMouseleave.emit(node);
  }

  dropCdk(event: CdkDragDrop<XListNode[]>) {
    this.nodes.update((x) => {
      moveItemInArray(x, event.previousIndex, event.currentIndex);
      return [...x];
    });
    this.dropListDropped.emit({
      data: this.nodes(),
      current: this.nodes()[event.currentIndex],
      currentIndex: event.currentIndex,
      event: event
    });
  }

  predicate(_drag: CdkDrag<XListNode>, _drop: CdkDropList<XListNode>) {
    return true;
  }

  onSelectAllNodes() {
    this.isSelectAll.update((x) => !x);
    if (this.isSelectAll()) {
      this.nodes.update((x) => {
        x.forEach((y) => (y.selected = true));
        return [...x];
      });
      this.selectedNodes.set(this.nodes());
    } else {
      this.nodes.update((x) => {
        x.forEach((y) => (y.selected = false));
        return [...x];
      });
      this.selectedNodes.set([]);
    }
    this.value.set(this.objectArray() ? this.selectedNodes() : this.selectedNodes().map((x) => x.id));
    if (this.onChange) this.onChange(this.value());
    this.onSelectAll.emit(this.isSelectAll());
  }

  onLoadMore() {
    this.loadMoreIndex.update((x) => x + 1);
    this.setData();
  }

  trackByNode(_index: number, item: XListNode) {
    return item.id;
  }

  setUnActive(num: number) {
    if (num > -1) this.nodes()[num].active = false;
  }
}
