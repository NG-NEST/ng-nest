import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { XTablePrefix, XTableProperty, XTableColumn, XTableAction } from './table.property';
import { XQuery, XIsUndefined, XIsEmpty, XResultList, XIsChange, XFilter } from '@ng-nest/ui/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: `${XTablePrefix}`,
  templateUrl: './table.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTableComponent extends XTableProperty implements OnInit, OnChanges {
  tableData: any[] = [];
  groupData: any[] = [];
  topLeftActions: XTableAction[] = [];
  topRightActions: XTableAction[] = [];
  topRightIconActions: XTableAction[] = [];
  rowIconActions: XTableAction[] = [];
  activatedAction: XTableAction;
  groupIndex: number = 1;
  groupSize: number = 10;
  groupTotal: number = 0;
  groupQuery: XQuery = {};
  groupColumns: XTableColumn[] = [];
  groupActivatedRow: any;
  groupSearchPlaceholder: string;
  groupSearchSerialNumberHidden = true;
  serialNumberText = '序号';
  serialNumberWidth = 5;
  searchInput: any;
  searchSub = new Subject<string>();
  sortStr = '';
  private _unSubject = new Subject<void>();
  private _isFirst = true;
  constructor(private renderer: Renderer2, private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XTablePrefix);
  }

  ngOnInit() {
    this.setActions();
    this.setData();
    this.setSubject();
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.rowPrimary) && this.setData(true);
  }

  change(index: number) {
    this.index = index;
    this.indexChange.emit(index);
    this.setData();
  }

  searchChange(event: any) {
    if (XIsUndefined(event)) return;
    this.searchSub.next(event);
  }

  onSort(column: XTableColumn) {
    if (!column.sort) return;
    if (XIsEmpty(this.query.sort)) this.query.sort = [];
    let sort = this.query.sort?.find((y) => y.field === column.id);
    if (sort) {
      if (sort.value === 'asc') {
        this.query.sort = [];
        this.sortStr = '';
      } else {
        sort.value = 'asc';
      }
    } else {
      sort = { field: column.id, value: 'desc' };
      this.query.sort = [sort];
    }
    if (!XIsEmpty(this.query.sort)) this.sortStr = `${sort.field} ${sort.value}`;
    this.setData();
  }

  groupRowClick(row: any) {
    if (XIsEmpty(this.query.filter)) this.query.filter = [];
    let groupFilter = {
      field: this.groupQuery.group,
      value: row[this.groupQuery.group as string]
    };
    this.query.filter = _.unionBy([groupFilter], this.query.filter, (y) => y.field) as XFilter[];
    this.index = 1;
    this.setData();
  }

  actionEmit(action: XTableAction, event: Event) {
    action.event = event;
    if (action.actionLayoutType === 'top-right-icon') {
      this.activatedAction.activated = false;
      action.activated = true;
      this.activatedAction = action;
      if (action.group) {
        _.remove(this.query.filter as XFilter[], (x) => x.field === this.groupQuery.group);
        this.groupQuery.filter = [];
        this.groupIndex = 1;
        this.groupQuery.group = action.group;
        this.groupQuery.sort = [{ field: 'count', value: 'desc' }];
        let groupColumn = _.cloneDeep(this.columns?.find((x) => x.id === action.group));
        if (groupColumn) {
          groupColumn.flex = 4;
          groupColumn.search = true;
          this.groupSearchPlaceholder = `查找${groupColumn.label}`;
          this.groupColumns = [groupColumn, { id: 'count', flex: 1 }];
        }
        this.cdr.detectChanges();
      } else if (this.groupQuery.group) {
        _.remove(this.query.filter as XFilter[], (x) => x.field === this.groupQuery.group);
        this.groupQuery.group = undefined;
        this.groupQuery.filter = [];
        this.setData();
      }
    }

    this.actionClick.emit(action);
  }

  rowEmit(row: any, event?: Event) {
    row.event = event;
    this.activatedRow = row;
    this.rowClick.emit(row);
    this.cdr.detectChanges();
  }

  private removeListen() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  private setActions() {
    if (typeof this.actions === 'undefined') return;
    this.topLeftActions = _.filter(this.actions, (x) => typeof x.actionLayoutType === 'undefined' || x.actionLayoutType === 'top-left');
    this.topRightActions = _.filter(this.actions, (x) => x.actionLayoutType === 'top-right');
    this.topRightIconActions = _.filter(this.actions, (x) => x.actionLayoutType === 'top-right-icon');
    this.rowIconActions = _.filter(this.actions, (x) => x.actionLayoutType === 'row-icon');
    this.activatedAction = _.find(this.actions, (x) => x.activated) as XTableAction;
    this.cdr.markForCheck();
  }

  private setData(first?: boolean) {
    if (this.service) {
      this.service.getList(this.index, this.size, this.query).subscribe((x) => {
        if (first || (this._isFirst && this.firstRowSelected)) {
          let ft = _.first(x.list);
          if (ft) {
            this.rowEmit(_.first(x.list));
            this._isFirst = false;
          }
        }
        this.setDataChange(x);
      });
    }
  }

  private setSubject() {
    if (!this.service) return;
    const service = this.service;
    this.searchSub
      .asObservable()
      .pipe(
        debounceTime(200),
        switchMap((x: string) => {
          this.index = 1;
          this.setFilter(this.query, x);
          return service.getList(this.index, this.size, this.query);
        }),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.setDataChange(x);
      });
  }

  private setDataChange(result: XResultList<any>) {
    this.total = result.total as number;
    this.tableData = result.list as any[];
    this.cdr.detectChanges();
  }

  private setFilter(query: XQuery, value: string) {
    let searchColumns = this.columns.filter((x) => x.search);
    if (XIsEmpty(query.filter)) query.filter = [];
    searchColumns.forEach((x) => {
      let ft = query.filter?.find((y) => y.field === x.id);
      if (ft) {
        ft.value = value;
      } else {
        query.filter = [...(query.filter as XFilter[]), { field: x.id, value: value }];
      }
    });
  }
}
