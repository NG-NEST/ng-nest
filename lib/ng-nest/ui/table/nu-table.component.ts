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
import { TablePrefix, NuTableOption, NuTableColumn, NuTableAction } from "./nu-table.type";
import { fillDefault, NuData, NuQuery, NuRepositoryAbstract } from "@ng-nest/ui/core";
import { Subscription } from "rxjs";
import * as _ from "lodash";

@Component({
  selector: "nu-table",
  templateUrl: "./nu-table.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuTableComponent implements OnInit {
  @Input() nuData: NuData<any[]>;
  @Input() nuColumns: NuTableColumn[];
  @Input() nuActions: NuTableAction[];
  @Input() nuIndex?: number;
  @Input() nuSize?: number;
  @Input() nuTotal?: number;
  @Input() nuService?: NuRepositoryAbstract;
  @Input() nuQuery?: NuQuery;
  @Input() nuTableHeaderHidden?: boolean;
  @Input() nuTableFooterHidden?: boolean;
  @Input() nuAllowSelectRow?: boolean;
  @Input() nuRowPrimary?: string;
  @Input() nuActivatedRow?: any;
  @Input() nuSearchPlaceholder?: string;
  @Output() nuIndexChange = new EventEmitter<number>();
  @Output() nuActionClick = new EventEmitter<NuTableAction>();
  @Output() nuRowClick = new EventEmitter<any>();
  data: any[] = [];
  groupData: any[] = [];
  topLeftActions: NuTableAction[] = [];
  topRightActions: NuTableAction[] = [];
  topRightIconActions: NuTableAction[] = [];
  rowIconActions: NuTableAction[] = [];
  activatedAction: NuTableAction;
  nuGroupIndex: number = 1;
  nuGroupSize: number = 10;
  nuGroupTotal: number = 0;
  nuGroupQuery: NuQuery = {};
  nuGroupColumns: NuTableColumn[] = [];
  nuGroupActivatedRow: any;
  nuGroupSearchPlaceholder: string;
  private _data$: Subscription | null = null;
  private _default: NuTableOption = {
    nuIndex: 1,
    nuSize: 10,
    nuQuery: {},
    nuRowPrimary: "id"
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
    this.nuIndex = index;
    this.nuIndexChange.emit(index);
    this.setData();
  }

  actionClick(action: NuTableAction, event: Event) {
    action.nuEvent = event;
    if (action.nuGroup) {
      this.activatedAction.nuActivated = false;
      action.nuActivated = true;
      this.activatedAction = action;
      this.nuGroupIndex = 1;
      this.nuGroupQuery.group = action.nuGroup;
      this.nuGroupQuery.sort = [`count desc`];
      let groupColumn = _.cloneDeep(this.nuColumns.find(x => x.nuKey === action.nuGroup));
      groupColumn.nuFlex = 4;
      this.nuGroupSearchPlaceholder = `搜索${groupColumn.nuLabel}`;
      this.nuGroupColumns = [groupColumn, { nuKey: "count", nuFlex: 1 }];
      this.setGroupData();
    }
    this.nuActionClick.emit(action);
  }

  rowClick(row: any, event: Event) {
    row.nuEvent = event;
    this.nuActivatedRow = row;
    this.nuRowClick.emit(row);
    this.cdr.detectChanges();
  }

  groupRowClick(row: any) {
    let groupFilter = this.nuQuery.filter.find(x => x.field === this.nuGroupQuery.group);
    groupFilter.value = row[this.nuGroupQuery.group];
    this.nuIndex = 1;
    this.setData();
  }

  private removeListen() {
    if (this._data$) {
      this._data$.unsubscribe();
    }
  }

  private setActions() {
    if (typeof this.nuActions === "undefined") return;
    this.topLeftActions = _.filter(
      this.nuActions,
      x => typeof x.nuActionLayoutType === "undefined" || x.nuActionLayoutType === "top-left"
    );
    this.topRightActions = _.filter(this.nuActions, x => x.nuActionLayoutType === "top-right");
    this.topRightIconActions = _.filter(
      this.nuActions,
      x => x.nuActionLayoutType === "top-right-icon"
    );
    this.rowIconActions = _.filter(this.nuActions, x => x.nuActionLayoutType === "row-icon");
    this.activatedAction = _.find(this.nuActions, x => x.nuActivated);
    this.cdr.markForCheck();
  }

  private setData() {
    if (this.nuService) {
      this.nuService.getList(this.nuIndex, this.nuSize, this.nuQuery).subscribe(x => {
        this.nuTotal = x.total;
        this.setDataChange(x.list);
      });
    }
  }

  private setGroupData() {
    if (this.nuService) {
      this.nuService
        .getList(this.nuGroupIndex, this.nuGroupSize, this.nuGroupQuery)
        .subscribe(x => {
          this.nuGroupTotal = x.total;
          if (x.total > 0) {
            this.nuIndex = 1;
            this.nuGroupActivatedRow = _.first(x.list);
            this.nuQuery.filter = _.unionBy(
              [
                {
                  field: this.nuGroupQuery.group,
                  value: this.nuGroupActivatedRow[this.nuGroupQuery.group]
                }
              ],
              this.nuQuery.filter,
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
