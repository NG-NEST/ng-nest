import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { XTransferPrefix, XTransferNode, XTransferSource, XTransferProperty, XTransferType } from './transfer.property';
import { XIsChange, XIsEmpty, XSetData, XConfigService, XRemove, XIsArray } from '@ng-nest/ui/core';
import { interval, of, Subject } from 'rxjs';
import { delay, map, takeUntil } from 'rxjs/operators';
import { transferArrayItem, moveItemInArray, CdkDragDrop, CdkDrag } from '@angular/cdk/drag-drop';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XI18nService, XI18nTransfer } from '@ng-nest/ui/i18n';
import { XTreeNode } from '@ng-nest/ui/tree';

@Component({
  selector: `${XTransferPrefix}`,
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XTransferComponent)]
})
export class XTransferComponent extends XTransferProperty implements OnInit, OnChanges, OnDestroy {
  nodes: XTransferNode[] = [];
  left: XTransferSource = {
    list: [],
    searchList: [],
    checkedCount: 0,
    disabledButton: true
  };
  right: XTransferSource = {
    list: [],
    searchList: [],
    checkedCount: 0,
    disabledButton: true
  };
  searchInput: string = '';
  locale: XI18nTransfer = {};
  private get localTitle() {
    if (this.type === 'tree') {
      return this.locale.treeTitle;
    } else if (this.type === 'table') {
      return this.locale.tableTitle;
    } else {
      return this.locale.listTitle;
    }
  }
  private _unSubject = new Subject<void>();
  treeActivatedId: any[] = [];
  override writeValue(value: any[]): void {
    this.value = value;
    if (XIsArray(value)) {
      this.treeActivatedId = [...value];
    }
    this.setList();
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public override cdr: ChangeDetectorRef,
    public configService: XConfigService,
    public i18n: XI18nService
  ) {
    super();
    interval(1000).subscribe(() => {
      console.log(this.value);
    });
  }

  ngOnInit() {
    this.setTitles();
    this.i18n.localeChange
      .pipe(
        map((x) => x.transfer as XI18nTransfer),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        XIsEmpty(this.titles) && this.setTitles();
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  searchInputChange(source: XTransferSource) {
    source.list = source.searchList?.filter((x) => x.label.indexOf(source.searchInput) >= 0);
    this.cdr.detectChanges();
  }

  checkedAllChange($event: boolean, source: XTransferSource, arrow: 'left' | 'right') {
    let list: XTransferNode[] = (source.list?.filter((x) => !x.disabled) as XTransferNode[]).map((x) => {
      x.checked = $event;
      return x;
    });
    if (this.type === 'tree' && arrow === 'left') {
      this.treeActivatedId = $event ? source.list?.map((x) => x.id)! : list.map((x) => x.id);
    }
    source.checkedCount = $event ? list.length : 0;
    source.indeterminate = $event;
    this.setButtonDisabled(source);
    this.cdr.detectChanges();
  }

  checkedChange($event: boolean, source: XTransferSource) {
    if (!$event) (source.checkedCount as number)--;
    else (source.checkedCount as number)++;
    this.setCheckedAll(source);
    this.setButtonDisabled(source);
    this.cdr.detectChanges();
  }

  move(from: XTransferSource, to: XTransferSource, arrow: 'right' | 'left') {
    if (from.disabledButton) return;
    switch (this.type) {
      case 'list':
        this.moveList(from, to);
        break;
      case 'tree':
        this.moveTree(from, to, arrow);
        break;
    }
  }

  moveList(from: XTransferSource, to: XTransferSource) {
    let checkedItems = from.list?.filter((x) => !x.disabled && x.checked)!;
    let j = 0;
    checkedItems.forEach((x) => {
      const index = from.list?.indexOf(x) as number;
      x.checked = false;
      transferArrayItem(from.list!, to.list!, index, j);
      j++;
    });
    from.list = [...from.list!];
    to.list = [...to.list!];
    this.setCheckedCount('list', from, to);
    this.setCheckedAll(from, to);
    this.setButtonDisabled(from, to);
    this.setSearchList(from, to);
    this.setValue();
    this.cdr.detectChanges();
  }

  moveTree(from: XTransferSource, to: XTransferSource, arrow: 'right' | 'left') {
    let checkedItems: XTransferNode[] = [];
    if (arrow === 'right') {
      checkedItems = from.list?.filter((x) => !x.disabled && !XIsEmpty(this.treeActivatedId) && this.treeActivatedId.includes(x.id))!;
      checkedItems.forEach((x: XTreeNode) => {
        x.disabled = true;
        x.change && x.change();
      });
      to.list?.unshift(
        ...checkedItems.map((x) => {
          let res = { ...x };
          res.checked = false;
          res.disabled = false;
          return res;
        })
      );
      this.setCheckedCount('tree', from);
      this.setCheckedCount('list', to);
    } else {
      checkedItems = XRemove(from.list!, (x) => !x.disabled && x.checked!);
      for (let item of checkedItems) {
        let node: XTreeNode = to.list?.find((x) => x.id === item.id)!;
        if (node) {
          node.checked = false;
          node.disabled = false;
          const idx = this.treeActivatedId.findIndex((x) => x === node.id);
          if (idx >= 0) {
            this.treeActivatedId.splice(idx, 1);
          }
          node.change && node.change();
        }
      }
      this.setCheckedCount('tree', to);
      this.setCheckedCount('list', from);
    }
    this.setCheckedAll(from, to);
    this.setButtonDisabled(from, to);
    this.setSearchList(from, to);
    this.setValue();
  }

  dropCdk(event: CdkDragDrop<XTransferNode[] | undefined, any>) {
    const ev = event as CdkDragDrop<XTransferNode[]>;
    if (ev.previousContainer === ev.container) {
      moveItemInArray(ev.container.data, ev.previousIndex, ev.currentIndex);
    } else {
      transferArrayItem(ev.previousContainer.data, ev.container.data, ev.previousIndex, ev.currentIndex);
      this.setCheckedCount('list', this.left, this.right);
      this.setCheckedAll(this.left, this.right);
      this.setButtonDisabled(this.left, this.right);
    }
    this.setSearchList(this.left, this.right);
    this.setValue();
    this.cdr.detectChanges();
  }

  predicate(item: CdkDrag<XTransferNode>) {
    return !item.data.disabled;
  }

  trackByNode(_index: number, item: XTransferNode) {
    return item.id;
  }

  getListNotDisabledCount(list: XTransferNode[]) {
    return list?.filter((x) => !x.disabled).length;
  }

  onTreeNodeClick(_node: XTreeNode) {
    this.setCheckedCount('tree', this.left);
    this.setCheckedAll(this.left);
    this.setButtonDisabled(this.left);
  }

  private setCheckedAll(...sources: XTransferSource[]) {
    for (let source of sources) {
      if ((source.checkedCount as number) > 0) {
        if (source.checkedCount === source.list?.filter((x) => !x.disabled).length) {
          source.checkedAll = true;
        } else {
          source.checkedAll = false;
          source.indeterminate = true;
        }
      } else {
        source.checkedAll = false;
        source.indeterminate = false;
      }
    }
  }

  private setCheckedCount(type: XTransferType = 'list', ...sources: XTransferSource[]) {
    for (let source of sources) {
      if (type === 'list') {
        source.checkedCount = source.list?.filter((x) => !x.disabled && x.checked).length;
      } else if (type === 'tree') {
        source.checkedCount = source.list?.filter(
          (x) => !x.disabled && !XIsEmpty(this.treeActivatedId) && this.treeActivatedId.includes(x.id)
        ).length;
      }
    }
  }

  private setButtonDisabled(...sources: XTransferSource[]) {
    for (let source of sources) source.disabledButton = source.checkedCount === 0;
  }

  private setValue() {
    this.value = this.right.list?.map((x) => x.id) as any[];
    this.onChange(this.value);
  }

  private setSearchList(...sources: XTransferSource[]) {
    if (this.search) {
      for (let source of sources) {
        if (XIsEmpty(source.searchInput)) {
          source.searchList = [...(source.list as XTransferNode[])];
        }
      }
    }
  }

  private setData() {
    XSetData<XTransferNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.setList();
    });
  }

  private setList() {
    switch (this.type) {
      case 'list':
        if (!XIsEmpty(this.value)) {
          this.left.list = this.nodes.filter((x) => this.value.indexOf(x.id) < 0);
          this.right.list = this.nodes.filter((x) => this.value.indexOf(x.id) >= 0);
        } else {
          this.left.list = [...this.nodes];
        }
        this.setSearchList(this.left, this.right);
        // ToDo: x-checkbox error. Attempt to use a destroyed view: detectChanges
        of(true)
          .pipe(delay(0), takeUntil(this._unSubject))
          .subscribe(() => this.cdr.detectChanges());
        break;
      case 'tree':
        this.setTreeNodeDisabled();
        this.left.list = [...this.nodes];
        if (!XIsEmpty(this.value)) {
          this.right.list = this.nodes
            .filter((x) => this.value.indexOf(x.id) >= 0)
            .map((x) => {
              let res = { ...x };
              res.checked = false;
              res.disabled = false;
              return res;
            });
        }
        break;
    }
  }

  private setTitles() {
    let titles: string[] = [];
    if (XIsEmpty(this.titles)) {
      titles = [this.localTitle!, this.locale.selectedTitle!];
    } else {
      titles = this.titles;
    }
    if (titles.length > 0) this.left.title = titles[0];
    if (titles.length > 1) this.right.title = titles[1];
    this.cdr.detectChanges();
  }

  private setTreeNodeDisabled() {
    if (!XIsEmpty(this.value) && this.nodes) {
      for (let item of this.nodes) {
        let hasIn = this.value.indexOf(item.id) >= 0;
        item.disabled = hasIn;
        item.checked = hasIn;
      }
    }
  }
}
