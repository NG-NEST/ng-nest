import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Renderer2,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { chunk } from "@ng-nest/ui/core";

@Component({
  selector: "x-picker-month",
  templateUrl: "./picker-month.component.html",
  styleUrls: ["./picker-month.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPickerMonthComponent implements OnInit, OnChanges, OnDestroy {
  now = new Date();
  @Input() display = new Date();
  @Input() model;
  @Output() modelChange = new EventEmitter();
  dates = [];

  constructor(public renderer: Renderer2, public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges(simples: SimpleChanges) {
    let displayChange = simples.display;
    if (displayChange && displayChange.currentValue !== displayChange.previousValue) {
      this.init();
    }
  }

  ngOnDestroy(): void {}

  init() {
    this.setMonths();
  }

  setMonths() {
    let year = this.display.getFullYear();
    let dates = [];
    for (let i = 0; i < 16; i++) {
      dates = [...dates, new Date(year, i, 1)];
    }
    this.dates = chunk(dates, 4);
  }

  monthClick(date: Date) {
    this.model = date;
    this.modelChange.emit(date);
    this.cdr.markForCheck();
  }
}
