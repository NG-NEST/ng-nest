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
import {
  XIsChange,
  XIsEmpty,
  XSetData,
  XConfigService,
  XRemove,
  XIsArray,
  XIsObject,
  XIsObjectArray,
  XIsBoolean,
  XIsFunction,
  XResultList,
  XIsUndefined
} from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { transferArrayItem, moveItemInArray, CdkDragDrop, CdkDrag } from '@angular/cdk/drag-drop';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XI18nService, XI18nTransfer } from '@ng-nest/ui/i18n';
import { XTreeNode } from '@ng-nest/ui/tree';
import { XTableColumn } from '@ng-nest/ui/table';

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
    direction: 'left',
    disabledButton: true
  };
  right: XTransferSource = {
    list: [],
    searchList: [],
    checkedCount: 0,
    direction: 'right',
    disabledButton: true
  };
  searchInput: string = '';
  locale: XI18nTransfer = {};
  private get localTitle() {
    if (this.type === 'tree') {
      return this.locale.treeTitle;
    } else {
      return this.locale.listTitle;
    }
  }
  private _unSubject = new Subject<void>();
  treeActivatedId: any[] = [];
  tableData: XTransferNode[] = [];
  tableCheckboxColumn?: XTableColumn;
  isObjectArray = false;
  override writeValue(value: any[]): void {
    this.value = value;
    if (XIsArray(value)) {
      this.treeActivatedId = [...value];
      if (XIsObjectArray(value)) {
        this.isObjectArray = true;
      }
    }
    this.setList(this.nodes);
  }

  get values() {
    if (this.isObjectArray) {
      return this.value.map((x) => x.id);
    } else {
      return this.value;
    }
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public override cdr: ChangeDetectorRef,
    public configService: XConfigService,
    public i18n: XI18nService
  ) {
    super();
  }

  ngOnInit() {
    this.setTitles();
    this.setListStyle();
    this.setHiddenCheckAll();
    this.getTableCheckColumn();
    this.setFooterTpl();
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

  checkedAllChange($event: boolean, source: XTransferSource) {
    let list: XTransferNode[] = (source.list?.filter((x) => !x.disabled) as XTransferNode[]).map((x) => {
      x.checked = $event;
      return x;
    });
    if (this.type === 'tree' && source.direction === 'left') {
      this.treeActivatedId = $event ? source.list!.map((x) => x.id)! : source.list!.filter((x) => x.disabled).map((x) => x.id);
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

  move(from: XTransferSource, to: XTransferSource) {
    if (from.disabledButton) return;
    switch (this.type) {
      case 'list':
        this.moveList(from, to);
        break;
      case 'tree':
        this.moveTree(from, to);
        break;
      case 'table':
        this.moveTable(from, to);
    }
  }

  private moveList(from: XTransferSource, to: XTransferSource) {
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
    this.setListCount('list', from, to);
    this.setCheckedAll(from, to);
    this.setButtonDisabled(from, to);
    this.setSearchList(from, to);
    this.setValue();
    this.cdr.detectChanges();
  }

  private moveTree(from: XTransferSource, to: XTransferSource) {
    let checkedItems: XTransferNode[] = [];
    if (to.direction === 'right') {
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
    this.setListCount('list', from, to);
    this.setButtonDisabled(from, to);
    this.setSearchList(from, to);
    this.setValue();
  }

  private moveTable(from: XTransferSource, to: XTransferSource) {
    let checkedItems: XTransferNode[] = [];
    if (to.direction === 'right') {
      checkedItems = from.list?.filter((x) => !x.disabled && x.checked)!;
      to.list = [
        ...checkedItems.map((x) => {
          const res = { ...x };
          x.disabled = true;
          x.checked = true;
          res.disabled = false;
          res.checked = false;
          return res;
        }),
        ...to.list!
      ];
      this.tableData = [...from.list!];
      this.setCheckedCount('table', from);
      this.setCheckedCount('list', to);
    } else {
      checkedItems = XRemove(from.list!, (x) => !x.disabled && x.checked!);
      const ids = checkedItems.map((x) => x.id);
      for (let item of to.list!) {
        if (ids.includes(item.id)) {
          item.checked = false;
          item.disabled = false;
        }
      }
      from.list = [...from.list!];
      this.tableData = [...to.list!];
      this.setCheckedCount('table', to);
      this.setCheckedCount('list', from);
    }
    this.setListCount('table', from, to);
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
      this.setListCount('list', this.left, this.right);
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

  setListCount(type: XTransferType = 'list', ...sources: XTransferSource[]) {
    if (['list', 'tree'].includes(type)) {
      for (let source of sources) {
        source.count = source.list?.filter((x) => !x.disabled).length;
      }
    } else if (type === 'table') {
      for (let source of sources) {
        if (source.direction === 'left') {
          source.count = this.tableTotal - this.right.list!.length || 0;
        } else {
          source.count = source.list?.filter((x) => !x.disabled).length;
        }
      }
    }
  }

  onTreeNodeClick(_node: XTreeNode) {
    this.setCheckedCount('tree', this.left);
    this.setCheckedAll(this.left);
    this.setButtonDisabled(this.left);
  }

  onTableCheckedRow(row: XTransferNode, source: XTransferSource) {
    if (!this.tableCheckboxColumn) return;
    let checked = row[this.tableCheckboxColumn.id];
    row.checked = checked;
    this.setCheckedCount('table', source);
    this.setCheckedAll(source);
    this.setButtonDisabled(source);
  }

  onTableCheckedAll(row: { [prop: string]: boolean }, source: XTransferSource) {
    if (!this.tableCheckboxColumn) return;
    let checked = row[this.tableCheckboxColumn.id];
    for (let item of source.list!) {
      if (!item.disabled) {
        item.checked = checked;
      }
    }
    this.setCheckedCount('table', source);
    this.setButtonDisabled(source);
  }

  private getTableCheckColumn() {
    if (this.type !== 'table' || XIsEmpty(this.tableColumns)) return;
    this.tableCheckboxColumn = this.tableColumns?.find((x) => x.rowChecked);
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
      if (['table', 'list'].includes(type)) {
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
    if (this.isObjectArray) {
      this.value = this.right.list!;
    } else {
      this.value = this.right.list?.map((x) => x.id)!;
    }
    this.onChange(this.value);
  }

  private setSearchList(..._sources: XTransferSource[]) {
    // if (this.search) {
    //   for (let source of sources) {
    //     if (XIsEmpty(source.searchInput)) {
    //       source.searchList = [...(source.list as XTransferNode[])];
    //     }
    //   }
    // }
  }

  private setData() {
    if (this.type === 'table') {
      this.getTableData();
      return;
    }
    XSetData<XTransferNode>(this.data, this._unSubject).subscribe((x) => {
      this.setList(x);
    });
  }

  private setList(data: XTransferNode[]) {
    if (XIsEmpty(data)) return;
    switch (this.type) {
      case 'list':
        this.nodes = data;
        if (!XIsEmpty(this.values)) {
          this.left.list = this.nodes.filter((x) => this.values.indexOf(x.id) < 0);
          this.right.list = this.nodes.filter((x) => this.values.indexOf(x.id) >= 0);
        } else {
          this.left.list = [...this.nodes];
        }
        this.setSearchList(this.left, this.right);
        this.setListCount(this.type, this.left, this.right);
        break;
      case 'tree':
        this.nodes = data;
        this.setTreeNodeDisabled();
        this.left.list = [...this.nodes];
        if (!XIsEmpty(this.values)) {
          this.right.list = this.nodes
            .filter((x) => this.values.indexOf(x.id) >= 0)
            .map((x) => {
              let res = { ...x };
              res.checked = false;
              res.disabled = false;
              return res;
            });
        }
        this.setSearchList(this.left, this.right);
        this.setListCount(this.type, this.left, this.right);
        break;
      case 'table':
        this.nodes = data;
        this.setTableDataDisabled();
        this.left.list = [...this.nodes];
        if (!XIsEmpty(this.values)) {
          if (this.isObjectArray) {
            this.right.list = [
              ...this.value.map((x) => {
                let res = { ...x };
                res.disabled = false;
                res.checked = false;
                return res;
              })
            ];
          } else {
            this.right.list = [...this.value];
          }
        }
        this.setSearchList(this.left, this.right);
        this.setListCount(this.type, this.left, this.right);
        break;
    }
    this.cdr.detectChanges();
  }

  getTableData() {
    if (XIsFunction(this.data)) {
      (this.data as Function)(this.tableIndex, this.tableSize, this.tableQuery).subscribe((x: XResultList<XTransferNode>) => {
        this.tableTotal = x.total!;
        this.tableData = x.list!;
        this.setList(x.list!);
      });
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

  private setListStyle() {
    if (XIsEmpty(this.listStyle)) return;
    let styles: object[] = [];
    if (XIsObject(this.listStyle)) {
      styles = [this.listStyle, this.listStyle];
    } else if (XIsObjectArray(this.listStyle)) {
      styles = this.listStyle as object[];
    }
    if (styles.length > 0) this.left.listStyle = styles[0];
    if (styles.length > 1) this.right.listStyle = styles[1];
    this.cdr.detectChanges();
  }

  private setTreeNodeDisabled() {
    if (!XIsEmpty(this.values) && this.nodes) {
      for (let item of this.nodes) {
        let hasIn = this.values.indexOf(item.id) >= 0;
        item.disabled = hasIn;
        item.checked = hasIn;
      }
    }
  }

  private setTableDataDisabled() {
    if (!XIsEmpty(this.values) && this.nodes) {
      for (let item of this.nodes) {
        let hasIn = this.values.indexOf(item.id) >= 0;
        item.disabled = hasIn;
        item.checked = hasIn;
      }
    }
  }

  private setHiddenCheckAll() {
    if (XIsEmpty(this.hiddenCheckAll)) return;
    if (this.hiddenCheckAll!.length > 0 && XIsBoolean(this.hiddenCheckAll![0])) this.left.hiddenCheckAll = this.hiddenCheckAll![0];
    if (this.hiddenCheckAll!.length > 1 && XIsBoolean(this.hiddenCheckAll![1])) this.right.hiddenCheckAll = this.hiddenCheckAll![1];
    this.cdr.detectChanges();
  }

  private setFooterTpl() {
    if (XIsUndefined(this.footerTpl)) return;
    if (this.footerTpl!.length > 0) {
      this.left.footerTpl = this.footerTpl![0];
    }
    if (this.footerTpl!.length > 1) {
      this.right.footerTpl = this.footerTpl![1];
    }
  }
}
