import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  HostBinding,
  TemplateRef,
  OnChanges,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {
  TablePrefix,
  XTableOption,
  XTableColumn,
  XTableAction,
  XTableColumnTemplate
} from "./table.type";
import {
  fillDefault,
  XData,
  XQuery,
  XRepositoryAbstract,
  XInputNumber,
  XInputBoolean,
  XIsUndefined,
  XIsEmpty,
  XResultList
} from "@ng-nest/ui/core";
import { Subscription, BehaviorSubject, Subject, Observable } from "rxjs";
import * as _ from "lodash";
import { debounceTime, switchMap } from "rxjs/operators";

@Component({
  selector: "x-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTableComponent implements OnInit, OnChanges {
  @Input() data?: XData<any[]>;
  @Input() columns?: XTableColumn[];
  @Input() actions?: XTableAction[];
  @Input() @XInputNumber() index?: number;
  @Input() @XInputNumber() size?: number;
  @Input() @XInputNumber() total?: number;
  @Input() service?: XRepositoryAbstract;
  @Input() query?: XQuery;
  @Input() @XInputBoolean() tableHeaderHidden?: boolean;
  @Input() @XInputBoolean() tableFooterHidden?: boolean;
  @Input() @XInputBoolean() allowSelectRow?: boolean;
  @Input() @XInputBoolean() firstRowSelected?: boolean;
  @Input() rowPrimary?: string;
  @Input() activatedRow?: any;
  @Input() searchPlaceholder?: string = "查找";
  @Input() @XInputBoolean() serialNumberHidden?: boolean;
  @Input() headerColumnTpl?: XTableColumnTemplate = {};
  @Input() bodyColumnTpl?: XTableColumnTemplate = {};
  @Output() indexChange = new EventEmitter<number>();
  @Output() actionClick = new EventEmitter<XTableAction>();
  @Output() rowClick = new EventEmitter<any>();
  @Output() dataInit = new EventEmitter<any>();
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
  serialNumberText = "序号";
  serialNumberWidth = 5;
  searchInput: any;
  searchSub = new Subject();
  sortStr = "";
  private _search$: Subscription | null = null;
  private _data$: Subscription | null = null;
  private _default: XTableOption = {
    index: 1,
    size: 10,
    query: {},
    rowPrimary: "id"
  };
  private _isFirst = true;
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, TablePrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setActions();
    this.setData();
    this.setSubject();
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

  ngOnChanges(simples: SimpleChanges) {
    let rowPrimaryChange = simples.rowPrimary;
    if (
      rowPrimaryChange &&
      rowPrimaryChange.currentValue !== rowPrimaryChange.previousValue
    ) {
      this.setData(true);
    }
  }

  change(index) {
    this.index = index;
    this.indexChange.emit(index);
    this.setData();
  }

  searchChange(event) {
    if (XIsUndefined(event)) return;
    this.searchSub.next(event);
  }

  onSort(column: XTableColumn) {
    if (!column.sort) return;
    if (XIsEmpty(this.query.sort)) this.query.sort = [];
    let sort = this.query.sort.find(y => y.field === column.key);
    if (sort) {
      if (sort.value === "asc") {
        this.query.sort = [];
        this.sortStr = "";
      } else {
        sort.value = "asc";
      }
    } else {
      sort = { field: column.key, value: "desc" };
      this.query.sort = [sort];
    }
    if (!XIsEmpty(this.query.sort))
      this.sortStr = `${sort.field} ${sort.value}`;
    this.setData();
  }

  groupRowClick(row: any) {
    if (XIsEmpty(this.query.filter)) this.query.filter = [];
    let groupFilter = {
      field: this.groupQuery.group,
      value: row[this.groupQuery.group]
    };
    this.query.filter = _.unionBy(
      [groupFilter],
      this.query.filter,
      y => y.field
    );
    this.index = 1;
    this.setData();
  }

  actionEmit(action: XTableAction, event: Event) {
    action.event = event;
    if (action.actionLayoutType === "top-right-icon") {
      this.activatedAction.activated = false;
      action.activated = true;
      this.activatedAction = action;
      if (action.group) {
        _.remove(this.query.filter, x => x.field === this.groupQuery.group);
        this.groupQuery.filter = [];
        this.groupIndex = 1;
        this.groupQuery.group = action.group;
        this.groupQuery.sort = [{ field: "count", value: "desc" }];
        let groupColumn = _.cloneDeep(
          this.columns.find(x => x.key === action.group)
        );
        groupColumn.flex = 4;
        groupColumn.search = true;
        this.groupSearchPlaceholder = `查找${groupColumn.label}`;
        this.groupColumns = [groupColumn, { key: "count", flex: 1 }];
        this.cdr.detectChanges();
      } else if (this.groupQuery.group) {
        _.remove(this.query.filter, x => x.field === this.groupQuery.group);
        this.groupQuery.group = undefined;
        this.groupQuery.filter = [];
        this.setData();
      }
    }

    this.actionClick.emit(action);
  }

  rowEmit(row: any, event: Event) {
    row.event = event;
    this.activatedRow = row;
    this.rowClick.emit(row);
    this.cdr.detectChanges();
  }

  private removeListen() {
    if (this._data$) this._data$.unsubscribe();
    if (this._search$) this._search$.unsubscribe();
  }

  private setActions() {
    if (typeof this.actions === "undefined") return;
    this.topLeftActions = _.filter(
      this.actions,
      x =>
        typeof x.actionLayoutType === "undefined" ||
        x.actionLayoutType === "top-left"
    );
    this.topRightActions = _.filter(
      this.actions,
      x => x.actionLayoutType === "top-right"
    );
    this.topRightIconActions = _.filter(
      this.actions,
      x => x.actionLayoutType === "top-right-icon"
    );
    this.rowIconActions = _.filter(
      this.actions,
      x => x.actionLayoutType === "row-icon"
    );
    this.activatedAction = _.find(this.actions, x => x.activated);
    this.cdr.markForCheck();
  }

  private setData(first?: boolean) {
    if (this.service) {
      this.service.getList(this.index, this.size, this.query).subscribe(x => {
        if (first || (this._isFirst && this.firstRowSelected)) {
          let ft = _.first(x.list);
          if (ft) {
            this.rowEmit(_.first(x.list), null);
            this._isFirst = false;
          }
        }
        this.setDataChange(x);
      });
    }
  }

  private setSubject() {
    this._search$ = this.searchSub
      .asObservable()
      .pipe(debounceTime(200))
      .pipe(
        switchMap(x => {
          this.index = 1;
          this.setFilter(this.query, x);
          return this.service.getList(this.index, this.size, this.query);
        })
      )
      .subscribe(x => {
        this.setDataChange(x);
      });
  }

  private setDataChange(result: XResultList<any>) {
    this.total = result.total;
    this.tableData = result.list;
    this.cdr.detectChanges();
  }

  private setFilter(query: XQuery, value) {
    let searchColumns = this.columns.filter(x => x.search);
    if (XIsEmpty(query.filter)) query.filter = [];
    searchColumns.forEach(x => {
      let ft = query.filter.find(y => y.field === x.key);
      if (ft) {
        ft.value = value;
      } else {
        query.filter = [...query.filter, { field: x.key, value: value }];
      }
    });
  }
}
