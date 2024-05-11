import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  inject,
  viewChild,
  signal,
  computed
} from '@angular/core';
import { XTransferPrefix, XTransferNode, XTransferSource, XTransferProperty, XTransferType } from './transfer.property';
import {
  XIsChange,
  XIsEmpty,
  XSetData,
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
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { transferArrayItem, moveItemInArray, CdkDragDrop, CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XI18nPipe, XI18nService, XI18nTransfer, zh_CN } from '@ng-nest/ui/i18n';
import { XTreeComponent, XTreeNode } from '@ng-nest/ui/tree';
import { XTableColumn, XTableComponent, XTableHeadCheckbox } from '@ng-nest/ui/table';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XInputComponent } from '@ng-nest/ui/input';
import { XKeywordDirective } from '@ng-nest/ui/keyword';
import { XLinkComponent } from '@ng-nest/ui/link';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XTransferPrefix}`,
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    FormsModule,
    DragDropModule,
    XOutletDirective,
    XCheckboxComponent,
    XButtonComponent,
    XInputComponent,
    XTreeComponent,
    XTableComponent,
    XKeywordDirective,
    XLinkComponent,
    XI18nPipe
  ],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XTransferComponent)]
})
export class XTransferComponent extends XTransferProperty implements OnInit, OnChanges, OnDestroy {
  private i18n = inject(XI18nService);

  leftTableCom = viewChild(XTableComponent);
  rightTableCom = viewChild(XTableComponent);
  nodes = signal<XTransferNode[]>([]);
  left = signal<XTransferSource>({
    list: [],
    searchList: [],
    checkedCount: 0,
    direction: 'left',
    disabledButton: true
  });
  right = signal<XTransferSource>({
    list: [],
    searchList: [],
    checkedCount: 0,
    direction: 'right',
    disabledButton: true
  });
  searchInput = signal('');
  searchInputLeftChange = new Subject<string>();
  searchInputRightChange = new Subject<string>();
  searchDebounceTime = signal(200);
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.transfer as XI18nTransfer)), {
    initialValue: zh_CN.transfer
  });
  localTitle = computed(() => {
    if (this.type() === 'tree') {
      return this.locale().treeTitle;
    } else {
      return this.locale().listTitle;
    }
  });
  private unSubject = new Subject<void>();
  treeActivatedId = signal<any[]>([]);
  tableData = signal<XTransferNode[]>([]);
  tableCheckboxColumn = signal<XTableColumn | null>(null);
  isObjectArray = signal(false);
  override writeValue(value: any[]): void {
    this.value.set(value);
    if (XIsArray(value)) {
      this.treeActivatedId.set([...value]);
      if (XIsObjectArray(value)) {
        this.isObjectArray.set(true);
      }
    }
    this.setList(this.nodes());
  }

  values = computed(() => {
    if (this.isObjectArray()) {
      return this.value().map((x: any) => x.id);
    } else {
      return this.value();
    }
  });

  ngOnInit() {
    this.setTitles();
    this.setListStyle();
    this.setHiddenCheckAll();
    this.getTableCheckColumn();
    this.setFooterTpl();
    this.setTableHeadSearchTpl();

    this.searchInputLeftChange
      .pipe(debounceTime(this.searchDebounceTime()), distinctUntilChanged(), takeUntil(this.unSubject))
      .subscribe(() => {
        this.setSearchInputChange(this.left());
      });
    this.searchInputRightChange
      .pipe(debounceTime(this.searchDebounceTime()), distinctUntilChanged(), takeUntil(this.unSubject))
      .subscribe(() => {
        this.setSearchInputChange(this.right());
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngOnDestroy() {
    this.unSubject.next();
    this.unSubject.complete();
  }

  onSearchInputChange(source: XTransferSource) {
    if (source.direction === 'left') {
      this.searchInputLeftChange.next(source.searchInput!);
    } else if (source.direction === 'right') {
      this.searchInputRightChange.next(source.searchInput!);
    }
  }

  setSearchInputChange(source: XTransferSource) {
    if (XIsUndefined(source.searchInput)) return;
    if (XIsEmpty(source.searchInput)) {
      source.list = [...source.searchList!];
    } else {
      switch (this.type()) {
        case 'list':
          source.list = source.searchList?.filter((x) => x.label.indexOf(source.searchInput) >= 0);
          break;
        case 'tree':
          if (source.direction === 'right') {
            source.list = source.searchList?.filter((x) => x.label.indexOf(source.searchInput) >= 0);
          } else if (source.direction === 'left') {
            let searchList = source.searchList?.filter((x) => x.label.indexOf(source.searchInput) >= 0)!;
            let parents: XTransferNode[] = [];
            const findParent = (item: XTransferNode) => {
              if (!item.pid) return;
              let parent = source.searchList?.find((x) => x.id === item.pid);
              if (parent && !parents.some((x) => x.id === parent!.id)) {
                parents.push(parent);
                findParent(parent);
              }
            };
            for (let item of searchList) {
              findParent(item);
            }
            source.list = [...searchList, ...parents];
          }
          break;
        case 'table':
          break;
      }
    }
    this.setListCount(this.type(), source);
  }

  checkedAllChange($event: boolean, source: XTransferSource) {
    let list: XTransferNode[] = (source.list?.filter((x) => !x.disabled) as XTransferNode[]).map((x) => {
      x.checked = $event;
      return x;
    });
    if (this.type() === 'tree' && source.direction === 'left') {
      this.treeActivatedId.set(
        $event ? source.list!.map((x) => x.id)! : source.list!.filter((x) => x.disabled).map((x) => x.id)
      );
    }
    source.checkedCount = $event ? list.length : 0;
    source.indeterminate = $event;
    this.setButtonDisabled(source);
  }

  checkedChange($event: boolean, source: XTransferSource) {
    if (!$event) (source.checkedCount as number)--;
    else (source.checkedCount as number)++;
    this.setCheckedAll(source);
    this.setButtonDisabled(source);
  }

  move(from: XTransferSource, to: XTransferSource) {
    if (from.disabledButton) return;
    switch (this.type()) {
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
      let index = from.list?.indexOf(x) as number;
      x.checked = false;
      transferArrayItem(from.list!, to.list!, index, j);
      if (this.search()) {
        index = from.searchList?.indexOf(x) as number;
        transferArrayItem(from.searchList!, to.searchList!, index, j);
      }
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
  }

  private moveTree(from: XTransferSource, to: XTransferSource) {
    let checkedItems: XTransferNode[] = [];
    if (to.direction === 'right') {
      checkedItems = from.list?.filter(
        (x) => !x.disabled && !XIsEmpty(this.treeActivatedId()) && this.treeActivatedId().includes(x.id)
      )!;
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
      if (this.search()) {
        XRemove(from.searchList!, (x) => !x.disabled && x.checked!);
      }
      for (let item of checkedItems) {
        let node: XTreeNode = to.list?.find((x) => x.id === item.id)!;
        if (node) {
          node.checked = false;
          node.disabled = false;
          const idx = this.treeActivatedId().findIndex((x) => x === node.id);
          if (idx >= 0) {
            this.treeActivatedId.update((x) => {
              x.splice(idx, 1);
              return x;
            });
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
      this.tableData.set([...from.list!]);
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
      this.tableData.set([...to.list!]);
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
      this.setCheckedCount('list', this.left(), this.right());
      this.setCheckedAll(this.left(), this.right());
      this.setListCount('list', this.left(), this.right());
      this.setButtonDisabled(this.left(), this.right());
    }
    this.setSearchList(this.left(), this.right());
    this.setValue();
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
          source.count = this.tableTotal() - this.right().list!.length || 0;
        } else {
          source.count = source.list?.filter((x) => !x.disabled).length;
        }
      }
    }
  }

  onTreeNodeClick(_node: XTreeNode) {
    this.setCheckedCount('tree', this.left());
    this.setCheckedAll(this.left());
    this.setButtonDisabled(this.left());
  }

  onTableCheckedRow(row: XTransferNode, source: XTransferSource) {
    if (!this.tableCheckboxColumn()) return;
    let checked = row[this.tableCheckboxColumn()!.id];
    row.checked = checked;
    this.setCheckedCount('table', source);
    this.setCheckedAll(source);
    this.setButtonDisabled(source);
  }

  onTableCheckedAll(row: XTableHeadCheckbox, source: XTransferSource) {
    if (!this.tableCheckboxColumn()) return;
    let checked = row.checkbox[this.tableCheckboxColumn()!.id];
    for (let item of source.list!) {
      if (!item.disabled) {
        item.checked = checked;
      }
    }
    this.setCheckedCount('table', source);
    this.setButtonDisabled(source);
  }

  onInverse(source: XTransferSource) {
    for (let item of source.list!) {
      if (!item.disabled) {
        item.checked = !item.checked;
      }
    }
    let type = `${this.type}` as XTransferType;
    if (type === 'tree' && source.direction === 'right') {
      type = 'list';
    }
    this.setCheckedCount(type, source);
    this.setCheckedAll(source);
    this.setButtonDisabled(source);
  }

  private getTableCheckColumn() {
    if (this.type() !== 'table' || XIsEmpty(this.tableColumns())) return;
    this.tableCheckboxColumn.set(this.tableColumns()!.find((x) => x.rowChecked)!);
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
          (x) => !x.disabled && !XIsEmpty(this.treeActivatedId()) && this.treeActivatedId().includes(x.id)
        ).length;
      }
    }
  }

  private setButtonDisabled(...sources: XTransferSource[]) {
    for (let source of sources) source.disabledButton = source.checkedCount === 0;
  }

  private setValue() {
    if (this.isObjectArray()) {
      this.value.set(this.right().list!);
    } else {
      this.value.set(this.right().list?.map((x) => x.id)!);
    }
    this.onChange && this.onChange(this.value());
  }

  private setSearchList(...sources: XTransferSource[]) {
    if (this.search()) {
      for (let source of sources) {
        if (XIsEmpty(source.searchInput)) {
          source.searchList = [...(source.list as XTransferNode[])];
        }
      }
    }
  }

  private setData() {
    if (this.type() === 'table') {
      this.getTableData();
      return;
    }
    XSetData<XTransferNode>(this.data(), this.unSubject).subscribe((x) => {
      this.setList(x);
    });
  }

  private setList(data: XTransferNode[]) {
    if (XIsEmpty(data)) return;
    switch (this.type()) {
      case 'list':
        this.nodes.set(data);
        if (!XIsEmpty(this.values())) {
          this.left.update((x) => {
            x.list = this.nodes().filter((x) => this.values().indexOf(x.id) < 0);
            return x;
          });
          this.right.update((x) => {
            x.list = this.nodes().filter((x) => this.values().indexOf(x.id) >= 0);
            return x;
          });
        } else {
          this.left.update((x) => {
            x.list = [...this.nodes()];
            return x;
          });
        }
        this.setSearchList(this.left(), this.right());
        this.setListCount(this.type(), this.left(), this.right());
        break;
      case 'tree':
        this.nodes.set(data);
        this.setTreeNodeDisabled();
        this.left.update((x) => {
          x.list = [...this.nodes()];
          return x;
        });
        if (!XIsEmpty(this.values())) {
          this.right.update((z) => {
            z.list = this.nodes()
              .filter((x) => this.values().indexOf(x.id) >= 0)
              .map((x) => {
                let res = { ...x };
                res.checked = false;
                res.disabled = false;
                return res;
              });
            return z;
          });
        }
        this.setSearchList(this.left(), this.right());
        this.setListCount(this.type(), this.left(), this.right());
        break;
      case 'table':
        this.nodes.set(data);
        this.setTableDataDisabled();
        this.left.update((x) => {
          x.list = [...this.nodes()];
          return x;
        });
        if (!XIsEmpty(this.values())) {
          if (this.isObjectArray()) {
            this.right.update((z) => {
              z.list = [
                ...this.value().map((x: any) => {
                  let res = { ...x };
                  res.disabled = false;
                  res.checked = false;
                  return res;
                })
              ];
              return z;
            });
          } else {
            this.right.update((x) => {
              x.list = [...this.value()];
              return x;
            });
          }
        }
        this.setSearchList(this.left(), this.right());
        this.setListCount(this.type(), this.left(), this.right());
        break;
    }
  }

  getTableData() {
    if (XIsFunction(this.data())) {
      (this.data() as Function)(this.tableIndex(), this.tableSize(), this.tableQuery()).subscribe(
        (x: XResultList<XTransferNode>) => {
          this.tableTotal.set(x.total!);
          this.tableData.set(x.list!);
          this.setList(x.list!);
        }
      );
    }
  }

  private setTitles() {
    let titles: string[] = [];
    if (XIsEmpty(this.titles())) {
      titles = [this.localTitle()!, this.locale().selectedTitle!];
    } else {
      titles = this.titles()!;
    }
    if (titles.length > 0) {
      this.left.update((x) => {
        x.title = titles[0];
        return x;
      });
    }
    if (titles.length > 1) {
      this.right.update((x) => {
        x.title = titles[1];
        return x;
      });
    }
    console.log(this.left(), this.right());
  }

  private setListStyle() {
    if (XIsEmpty(this.listStyle())) return;
    let styles: object[] = [];
    if (XIsObject(this.listStyle())) {
      styles = [this.listStyle()!, this.listStyle()!];
    } else if (XIsObjectArray(this.listStyle())) {
      styles = this.listStyle() as object[];
    }
    if (styles.length > 0)
      this.left.update((x) => {
        x.listStyle = styles[0];
        return x;
      });
    if (styles.length > 1)
      this.right.update((x) => {
        x.listStyle = styles[1];
        return x;
      });
  }

  private setTreeNodeDisabled() {
    if (!XIsEmpty(this.values()) && this.nodes()) {
      for (let item of this.nodes()) {
        let hasIn = this.values().indexOf(item.id) >= 0;
        item.disabled = hasIn;
        item.checked = hasIn;
      }
    }
  }

  private setTableDataDisabled() {
    if (!XIsEmpty(this.values()) && this.nodes()) {
      for (let item of this.nodes()) {
        let hasIn = this.values().indexOf(item.id) >= 0;
        item.disabled = hasIn;
        item.checked = hasIn;
      }
    }
  }

  private setHiddenCheckAll() {
    if (XIsEmpty(this.hiddenCheckAll())) return;
    if (this.hiddenCheckAll()!.length > 0 && XIsBoolean(this.hiddenCheckAll()![0])) {
      this.left.update((x) => {
        x.hiddenCheckAll = this.hiddenCheckAll()![0];
        return x;
      });
    }
    if (this.hiddenCheckAll()!.length > 1 && XIsBoolean(this.hiddenCheckAll()![1])) {
      this.right.update((x) => {
        x.hiddenCheckAll = this.hiddenCheckAll()![1];
        return x;
      });
    }
  }

  private setFooterTpl() {
    if (XIsUndefined(this.footerTpl())) return;
    if (this.footerTpl()!.length > 0) {
      this.left.update((x) => {
        x.footerTpl = this.footerTpl()![0];
        return x;
      });
    }
    if (this.footerTpl()!.length > 1) {
      this.right.update((x) => {
        x.footerTpl = this.footerTpl()![1];
        return x;
      });
    }
  }

  private setTableHeadSearchTpl() {
    if (XIsUndefined(this.tableHeadSearchTpl())) return;
    if (this.tableHeadSearchTpl()!.length > 0) {
      this.left.update((x) => {
        x.tableHeadSearchTpl = this.tableHeadSearchTpl()![0];
        return x;
      });
    }
    if (this.tableHeadSearchTpl()!.length > 1) {
      this.right.update((x) => {
        x.tableHeadSearchTpl = this.tableHeadSearchTpl()![1];
        return x;
      });
    }
  }
}
