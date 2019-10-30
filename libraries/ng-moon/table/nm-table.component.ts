import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  OnChanges,
  ChangeDetectorRef,
  SimpleChanges,
  Output,
  EventEmitter
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
export class NmTableComponent implements OnInit, OnChanges {
  @Input() nmData: NmData<any[]>;
  @Input() nmColumns: NmTableColumn[];
  @Input() nmActions: NmTableAction[];
  @Input() nmIndex?: number;
  @Input() nmSize?: number;
  @Input() nmTotal?: number;
  @Input() nmService?: NmRepositoryAbstract;
  @Input() nmQuery?: NmQuery;
  @Output() nmIndexChange = new EventEmitter<number>();
  @Output() nmActionClick = new EventEmitter<NmTableAction>();
  data: any[] = [];
  topLeftActions: NmTableAction[] = [];
  topRightActions: NmTableAction[] = [];
  topRightIconActions: NmTableAction[] = [];
  rowIconActions: NmTableAction[] = [];
  private _data$: Subscription | null = null;
  private _default: NmTableOption = {
    nmIndex: 1,
    nmSize: 10
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nmService) {
      this.setData();
    }
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

  private setDataChange(value: any[]) {
    this.data = value;
    this.cdr.detectChanges();
  }
}
