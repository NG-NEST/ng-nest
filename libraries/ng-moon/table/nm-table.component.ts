import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import {
  TablePrefix,
  NmTableOption,
  NmTableColumn,
  NmTableAction
} from "./nm-table.type";
import { fillDefault } from "ng-moon/core";

@Component({
  selector: "nm-table",
  templateUrl: "./nm-table.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmTableComponent implements OnInit, OnChanges {
  @Input() nmColumns: NmTableColumn[];
  @Input() nmActions: NmTableAction[];
  private default: NmTableOption = {};
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, TablePrefix);
  }

  ngOnInit() {
    fillDefault(this, this.default);
  }

  ngOnChanges(changes: SimpleChanges): void {}
}
