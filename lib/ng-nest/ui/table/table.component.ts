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
  HostBinding
} from "@angular/core";
import { TablePrefix, XTableOption, XTableColumn, XTableAction } from "./table.type";
import { fillDefault, XData, XQuery, XRepositoryAbstract } from "@ng-nest/ui/core";
import { Subscription } from "rxjs";
import * as _ from "lodash";

@Component({
  selector: "x-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTableComponent implements OnInit {
  @Input() data: XData<any[]>;
  @Input() columns: XTableColumn[];
  @Input() actions: XTableAction[];
  @Input() index?: number;
  @Input() size?: number;
  @Input() total?: number;
  @Input() service?: XRepositoryAbstract;
  @Input() query?: XQuery;
  @Input() tableHeaderHidden?: boolean;
  @Input() tableFooterHidden?: boolean;
  @Input() allowSelectRow?: boolean;
  @Input() rowPrimary?: string;
  @Input() activatedRow?: any;
  @Input() searchPlaceholder?: string;
  @Output() indexChange = new EventEmitter<number>();
  @Output() actionClick = new EventEmitter<XTableAction>();
  @Output() rowClick = new EventEmitter<any>();
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
  private _data$: Subscription | null = null;
  private _default: XTableOption = {
    index: 1,
    size: 10,
    query: {},
    rowPrimary: "id"
  };
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
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

  change(index) {
    this.index = index;
    this.indexChange.emit(index);
    this.setData();
  }

  groupRowClick(row: any) {
    let groupFilter = this.query.filter.find(x => x.field === this.groupQuery.group);
    groupFilter.value = row[this.groupQuery.group];
    this.index = 1;
    this.setData();
  }

  actionEmit(action: XTableAction, event: Event) {
    action.event = event;
    if (action.group) {
      this.activatedAction.activated = false;
      action.activated = true;
      this.activatedAction = action;
      this.groupIndex = 1;
      this.groupQuery.group = action.group;
      this.groupQuery.sort = [`count desc`];
      let groupColumn = _.cloneDeep(this.columns.find(x => x.key === action.group));
      groupColumn.flex = 4;
      this.groupSearchPlaceholder = `搜索${groupColumn.label}`;
      this.groupColumns = [groupColumn, { key: "count", flex: 1 }];
      this.setGroupData();
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
    if (this._data$) {
      this._data$.unsubscribe();
    }
  }

  private setActions() {
    if (typeof this.actions === "undefined") return;
    this.topLeftActions = _.filter(
      this.actions,
      x => typeof x.actionLayoutType === "undefined" || x.actionLayoutType === "top-left"
    );
    this.topRightActions = _.filter(this.actions, x => x.actionLayoutType === "top-right");
    this.topRightIconActions = _.filter(
      this.actions,
      x => x.actionLayoutType === "top-right-icon"
    );
    this.rowIconActions = _.filter(this.actions, x => x.actionLayoutType === "row-icon");
    this.activatedAction = _.find(this.actions, x => x.activated);
    this.cdr.markForCheck();
  }

  private setData() {
    if (this.service) {
      this.service.getList(this.index, this.size, this.query).subscribe(x => {
        this.total = x.total;
        this.setDataChange(x.list);
      });
    }
  }

  private setGroupData() {
    if (this.service) {
      this.service
        .getList(this.groupIndex, this.groupSize, this.groupQuery)
        .subscribe(x => {
          this.groupTotal = x.total;
          if (x.total > 0) {
            this.index = 1;
            this.groupActivatedRow = _.first(x.list);
            this.query.filter = _.unionBy(
              [
                {
                  field: this.groupQuery.group,
                  value: this.groupActivatedRow[this.groupQuery.group]
                }
              ],
              this.query.filter,
              y => y.field
            );
            this.setData();
          }
          this.setGroupDataChange(x.list);
        });
    }
  }

  private setGroupDataChange(value: any[]) {
    this.groupData = value;
    this.cdr.detectChanges();
  }

  private setDataChange(value: any[]) {
    this.tableData = value;
    this.cdr.detectChanges();
  }
}
