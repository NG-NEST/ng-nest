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
import { fillDefault, NmData } from "ng-moon/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
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
  @Output() nmIndexChange = new EventEmitter<number>();
  data: any[] = [];
  topLeftActions: NmTableAction[] = [];
  topRightActions: NmTableAction[] = [];
  topRightIconActions: NmTableAction[] = [];
  rowIconActions: NmTableAction[] = [];
  private _data$: Subscription | null = null;
  private _default: NmTableOption = {};
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
    if (changes.nmData) {
      this.setData();
    }
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

  change(index) {
    this.nmIndexChange.emit(index);
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
    if (this.nmData instanceof Array) {
      this.setDataChange(this.nmData);
    } else if (this.nmData instanceof BehaviorSubject) {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.nmData.subscribe(x => {
        this.setDataChange(x);
      });
    } else if (this.nmData instanceof Observable) {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.nmData.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: any[]) {
    this.data = value;
    this.cdr.detectChanges();
  }
}
