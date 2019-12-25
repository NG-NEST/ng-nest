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
  selector: "x-picker-year",
  templateUrl: "./picker-year.component.html",
  styleUrls: ["./picker-year.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPickerYearComponent implements OnInit, OnChanges, OnDestroy {
  now = new Date();
  @Input() display = new Date();
  @Input() model;
  @Output() modelChange = new EventEmitter();
  @Output() startChange = new EventEmitter();
  dates = [];
  start: number;
  end: number;

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
    this.setYears();
  }

  setYears() {
    let year = this.display.getFullYear();
    this.start = Math.floor(year / 10) * 10;
    this.end = this.start + 9;
    let dates = [];
    for (let i = -3; i < 13; i++) {
      dates = [...dates, new Date(this.start + i, 1, 1)];
    }
    this.dates = chunk(dates, 4);
    this.startChange.emit(this.start);
    console.log(this.start);
  }

  yearClick(date: Date) {
    this.model = date;
    this.modelChange.emit(date);
    this.cdr.markForCheck();
  }
}
