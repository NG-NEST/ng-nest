import { Subject } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges,
  QueryList,
  ElementRef,
  ViewChild,
  HostBinding,
  HostListener,
  ViewChildren,
  inject
} from '@angular/core';
import { XListPrefix, XListNode, XListProperty } from './list.property';
import {
  XIsChange,
  XSetData,
  XConfigService,
  XIsEmpty,
  XIsUndefined,
  XIsNull,
  XResize,
  XResizeObserver
} from '@ng-nest/ui/core';
import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { XListOptionComponent } from './list-option.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';
import { map, takeUntil, debounceTime } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XI18nList, XI18nService } from '@ng-nest/ui/i18n';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { XListDropGroup, X_LIST_DROP_GROUP } from './list-drop-group.directive';
import { CommonModule } from '@angular/common';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: `${XListPrefix}`,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
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
export class XListComponent extends XListProperty implements OnInit, OnChanges {
  nodes: XListNode[] = [];
  selectedNodes: XListNode[] = [];
  @ViewChild('headerRef') headerRef!: ElementRef<HTMLElement>;
  @ViewChild('footerRef') footerRef!: ElementRef<HTMLElement>;
  @ViewChild('selectAllRef') selectAllRef!: ElementRef<HTMLElement>;
  @ViewChild('loadMoreRef') loadMoreRef!: ElementRef<HTMLElement>;
  @ViewChild('virtualBody') virtualBody!: CdkVirtualScrollViewport;
  @ViewChild(CdkDropList) dropList!: CdkDropList;
  @ViewChild('listItems') listItems!: ElementRef<HTMLElement>;
  @ViewChildren(XListOptionComponent)
  options!: QueryList<XListOptionComponent>;
  keyManager!: ActiveDescendantKeyManager<XListOptionComponent>;
  isSelectAll = false;
  locale: XI18nList = {};
  loadMoreIndex = 0;
  icon: string = '';
  iconSpin: boolean = false;
  private _resizeObserver!: XResizeObserver;

  @HostBinding('attr.role') role = 'listbox';
  @HostBinding('attr.tabindex') tabindex = -1;

  @HostListener('keydown', ['$event']) keydown($event: KeyboardEvent) {
    this.keyManager.onKeydown($event);
    const activeIndex = this.keyManager.activeItemIndex as number;
    if ($event.keyCode === ENTER && !XIsUndefined(activeIndex)) {
      this.setUnActive(activeIndex);
      this.onNodeClick($event, this.nodes[activeIndex]);
    }
  }

  itemSizeMap: { [key: string]: number } = {
    mini: 22,
    small: 24,
    medium: 28,
    large: 32,
    big: 36
  };

  get getItemSize() {
    return this.itemSizeMap[this.size];
  }

  get isEmpty() {
    return XIsEmpty(this.nodes);
  }

  get getSelectAllText() {
    return this.selectAllText || this.locale.selectAllText;
  }

  get getLoadMoreText() {
    return this.loadMoreText || this.locale.loadMoreText;
  }

  get getLoadingMoreText() {
    return this.loadingMoreText || this.locale.loadingMoreText;
  }

  get getVirtualScrollHeight() {
    let headerH = 0,
      footerH = 0,
      selectAllH = 0,
      loadMoreH = 0;
    if (this.headerRef) headerH = this.headerRef.nativeElement.clientHeight;
    if (this.footerRef) footerH = this.footerRef.nativeElement.clientHeight;
    if (this.selectAllRef) selectAllH = this.selectAllRef.nativeElement.clientHeight;
    if (this.loadMoreRef) loadMoreH = this.loadMoreRef.nativeElement.clientHeight;

    return Number(this.scrollHeight) - headerH - footerH - selectAllH - loadMoreH;
  }

  override writeValue(value: any): void {
    this.value = value;
    this.setSelected();
    this.setKeyManager();
    this.cdr.detectChanges();
  }

  private _unSubject = new Subject<void>();
  override cdr = inject(ChangeDetectorRef);
  private i18n = inject(XI18nService);
  private group = inject<XListDropGroup>(X_LIST_DROP_GROUP, { optional: true, skipSelf: true });
  configService = inject(XConfigService);

  ngOnInit() {
    this.i18n.localeChange
      .pipe(
        map((x) => x.list as XI18nList),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngAfterViewInit() {
    this.initKeyManager();
    if (this.virtualScroll && this.heightAdaption) {
      this.setVirtualScrollHeight();
      XResize(this.heightAdaption as HTMLElement)
        .pipe(debounceTime(30), takeUntil(this._unSubject))
        .subscribe((x) => {
          this._resizeObserver = x.resizeObserver;
          this.setVirtualScrollHeight();
        });
    }
    if (this.group && this.dropList) {
      this.group.dropLists.add(this.dropList);
      this.group.setConnectedTo();
    }
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this._resizeObserver?.disconnect();
    this.group?.dropLists.delete(this.dropList);
  }

  private setVirtualScrollHeight() {
    this.scrollHeight = (this.heightAdaption as HTMLElement).clientHeight;
    this.minBufferPx = this.getVirtualScrollHeight;
    this.maxBufferPx = this.getVirtualScrollHeight * 1.2;
    this.virtualBody['_scrollStrategy']['_minBufferPx'] = this.minBufferPx;
    this.virtualBody['_scrollStrategy']['_maxBufferPx'] = this.maxBufferPx;
    this.cdr.detectChanges();
  }

  private setData() {
    if (this.loadMore) {
      this.icon = 'fto-loader';
      this.iconSpin = true;
    }
    XSetData<XListNode>(this.data, this._unSubject, true, this.loadMoreIndex).subscribe((x) => {
      if (this.loadMore) {
        this.nodes = [...this.nodes, ...x];
        this.icon = '';
        this.iconSpin = false;
      } else {
        this.nodes = x;
      }
      this.setSelected();
      this.setKeyManager();
      this.cdr.detectChanges();
    });
  }

  private initKeyManager() {
    this.keyManager = new ActiveDescendantKeyManager<XListOptionComponent>(this.options).withWrap();

    this.keyManager.tabOut.pipe(takeUntil(this._unSubject)).subscribe(() => {
      this.setUnActive(this.keyManager.activeItemIndex as number);
      this.keyManagerTabOut.emit();
    });

    this.keyManager.change.pipe(takeUntil(this._unSubject)).subscribe((num: number) => {
      this.setScorllTop(num);
      this.keyManagerChange.emit(num);
    });
  }

  setScorllTop(_num: number) {
    if (!this.scrollElement || !this.keyManager.activeItem) return;
    let ele = this.keyManager.activeItem!.elementRef.nativeElement as HTMLElement;
    let list = this.scrollElement;
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
    if (this.nodes.length > 0) {
      this.nodes
        .filter((x) => x.selected)
        .map((x) => {
          x.selected = false;
        });
      let valArry: any[] = [];
      if (this.value instanceof Array) {
        valArry = this.value;
        if (valArry.length === this.nodes.length) {
          this.isSelectAll = true;
        }
      } else {
        valArry = [this.value];
      }

      let ids = [];
      let selectedNodes = [];
      if (this.objectArray) {
        ids = valArry.filter((x) => !XIsUndefined(x) && !XIsNull(x)).map((x) => x.id);
      } else {
        ids = valArry;
      }
      for (let id of ids) {
        let node = this.nodes.find((x) => x.id === id);
        if (node) {
          node.selected = true;
          selectedNodes.push(node);
        }
      }
      this.selectedNodes = selectedNodes;
    }
  }

  setKeyManager() {
    if (XIsUndefined(this.keyManager) || XIsUndefined(this.nodes) || this.nodes.length === 0) return;
    let activeIndex = 0;
    if (XIsEmpty(this.value)) {
      this.keyManager.updateActiveItem(activeIndex);
      return;
    }
    let valArry: any[] = [];
    if (this.value instanceof Array) {
      valArry = this.value;
    } else {
      valArry = [this.value];
    }
    const first = valArry[0];
    if (this.objectArray) {
      activeIndex = this.nodes.findIndex((x) => x.id === first.id);
    } else {
      activeIndex = this.nodes.findIndex((x) => x.id === first);
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
    if (node.selected && this.multiple === 1) {
      node.event = event;
      this.nodeClick.emit(node);
      return;
    }
    const selected = !node.selected;
    if (selected) {
      if (this.selectedNodes.length < Number(this.multiple) || this.multiple === 0) {
        node.selected = selected;
        this.selectedNodes = [...this.selectedNodes, node];
        if (this.selectedNodes.length === this.nodes.length) {
          this.isSelectAll = true;
        }
        this.cdr.detectChanges();
      } else if (this.multiple === 1 && this.selectedNodes.length === 1) {
        node.selected = selected;
        this.selectedNodes[0].selected = false;
        this.selectedNodes[0] = node;
        this.cdr.detectChanges();
      } else {
        return;
      }
    } else {
      node.selected = selected;
      this.selectedNodes.splice(
        this.selectedNodes.findIndex((x) => x.id == node.id),
        1
      );
      this.isSelectAll = false;
    }
    if (this.multiple === 1 && this.selectedNodes.length === 1) {
      this.value = this.objectArray ? this.selectedNodes[0] : this.selectedNodes[0].id;
    } else {
      this.value = this.objectArray ? this.selectedNodes : this.selectedNodes.map((x) => x.id);
    }
    if (this.onChange) this.onChange(this.value);
    this.cdr.detectChanges();
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
    moveItemInArray(this.nodes, event.previousIndex, event.currentIndex);
    this.dropListDropped.emit({
      data: this.nodes,
      current: this.nodes[event.currentIndex],
      currentIndex: event.currentIndex,
      event: event
    });
    this.cdr.detectChanges();
  }

  predicate(_drag: CdkDrag<XListNode>, _drop: CdkDropList<XListNode>) {
    return true;
  }

  onSelectAllNodes() {
    this.isSelectAll = !this.isSelectAll;
    if (this.isSelectAll) {
      this.nodes.map((x) => {
        x.selected = true;
        return x;
      });
      this.selectedNodes = [...this.nodes];
    } else {
      this.nodes.map((x) => {
        x.selected = false;
        return x;
      });
      this.selectedNodes = [];
    }
    this.value = this.objectArray ? this.selectedNodes : this.selectedNodes.map((x) => x.id);
    if (this.onChange) this.onChange(this.value);
    this.onSelectAll.emit(this.isSelectAll);
  }

  onLoadMore() {
    this.loadMoreIndex++;
    this.setData();
  }

  trackByNode(_index: number, item: XListNode) {
    return item.id;
  }

  setUnActive(num: number) {
    if (num > -1) this.nodes[num].active = false;
  }
}
