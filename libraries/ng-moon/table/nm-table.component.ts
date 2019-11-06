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
import {
  TablePrefix,
  NmTableOption,
  NmTableColumn,
  NmTableAction
} from "./nm-table.type";
import {
  fillDefault,
  NmData,
  NmQuery,
  NmRepositoryAbstract
} from "ng-moon/core";
import { Subscription } from "rxjs";
import * as _ from "lodash";

@Component({
  selector: "nm-table",
  templateUrl: "./nm-table.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmTableComponent implements OnInit {
  @Input() nmData: NmData<any[]>;
  @Input() nmColumns: NmTableColumn[];
  @Input() nmActions: NmTableAction[];
  @Input() nmIndex?: number;
  @Input() nmSize?: number;
  @Input() nmTotal?: number;
  @Input() nmService?: NmRepositoryAbstract;
  @Input() nmQuery?: NmQuery;
  @Input() nmTableHeaderHidden?: boolean;
  @Input() nmTableFooterHidden?: boolean;
  @Input() nmAllowSelectRow?: boolean;
  @Input() nmRowPrimary?: string;
  @Input() nmActivatedRow?: any;
  @Output() nmIndexChange = new EventEmitter<number>();
  @Output() nmActionClick = new EventEmitter<NmTableAction>();
  @Output() nmRowClick = new EventEmitter<any>();
  @HostBinding(`class.nm-table-has-group`) get getGroup() {
    return typeof this.nmGroupQuery.group !== "undefined";
  }
  data: any[] = [];
  groupData: any[] = [];
  topLeftActions: NmTableAction[] = [];
  topRightActions: NmTableAction[] = [];
  topRightIconActions: NmTableAction[] = [];
  rowIconActions: NmTableAction[] = [];
  activatedAction: NmTableAction;
  nmGroupIndex: number = 1;
  nmGroupSize: number = 10;
  nmGroupTotal: number = 0;
  nmGroupQuery: NmQuery = {};
  nmGroupColumns: NmTableColumn[] = [];
  nmGroupActivatedRow: any;
  private _data$: Subscription | null = null;
  private _default: NmTableOption = {
    nmIndex: 1,
    nmSize: 10,
    nmQuery: {},
    nmRowPrimary: "id"
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
    this.nmIndex = index;
    this.nmIndexChange.emit(index);
    this.setData();
  }

  actionClick(action: NmTableAction, event: Event) {
    action.nmEvent = event;
    this.nmActionClick.emit(action);
    if (action.nmGroup) {
      this.activatedAction.nmActivated = false;
      action.nmActivated = true;
      this.activatedAction = action;
      this.nmGroupIndex = 1;
      this.nmGroupQuery.group = action.nmGroup;
      this.nmGroupQuery.sort = [`count desc`];
      let groupColumn = _.cloneDeep(
        this.nmColumns.find(x => x.nmKey === action.nmGroup)
      );
      groupColumn.nmFlex = 4;
      this.nmGroupColumns = [groupColumn, { nmKey: "count", nmFlex: 1 }];
      this.setGroupData();
    }
  }

  rowClick(row: any, event: Event) {
    row.nmEvent = event;
    this.nmActivatedRow = row;
    this.nmRowClick.emit(row);
    this.cdr.detectChanges();
  }

  groupRowClick(row: any) {
    let groupFilter = this.nmQuery.filter.find(
      x => x.field === this.nmGroupQuery.group
    );
    groupFilter.value = row[this.nmGroupQuery.group];
    this.nmIndex = 1;
    this.setData();
  }

  private removeListen() {
    if (this._data$) {
      this._data$.unsubscribe();
    }
  }

  private setActions() {
    if (typeof this.nmActions === "undefined") return;
    this.topLeftActions = _.filter(
      this.nmActions,
      x =>
        typeof x.nmActionLayoutType === "undefined" ||
        x.nmActionLayoutType === "top-left"
    );
    this.topRightActions = _.filter(
      this.nmActions,
      x => x.nmActionLayoutType === "top-right"
    );
    this.topRightIconActions = _.filter(
      this.nmActions,
      x => x.nmActionLayoutType === "top-right-icon"
    );
    this.rowIconActions = _.filter(
      this.nmActions,
      x => x.nmActionLayoutType === "row-icon"
    );
    this.activatedAction = _.find(this.nmActions, x => x.nmActivated);
    this.cdr.markForCheck();
  }

  private setData() {
    if (this.nmService) {
      this.nmService
        .getList(this.nmIndex, this.nmSize, this.nmQuery)
        .subscribe(x => {
          this.nmTotal = x.total;
          this.setDataChange(x.list);
        });
    }
  }

  private setGroupData() {
    if (this.nmService) {
      this.nmService
        .getList(this.nmGroupIndex, this.nmGroupSize, this.nmGroupQuery)
        .subscribe(x => {
          this.nmGroupTotal = x.total;
          if (x.total > 0) {
            this.nmIndex = 1;
            this.nmGroupActivatedRow = _.first(x.list);
            this.nmQuery.filter = _.unionBy(
              [
                {
                  field: this.nmGroupQuery.group,
                  value: this.nmGroupActivatedRow[this.nmGroupQuery.group]
                }
              ],
              this.nmQuery.filter,
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
    this.data = value;
    this.cdr.detectChanges();
  }
}
