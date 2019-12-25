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
  selector: "x-picker-date",
  templateUrl: "./picker-date.component.html",
  styleUrls: ["./picker-date.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPickerDateComponent implements OnInit, OnChanges, OnDestroy {
  weeks = ["一", "二", "三", "四", "五", "六", "日"];
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
    this.setDays(this.display);
  }

  setDays(date: Date) {
    let dates = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const lastDate = last.getDate();
    const firstDay = first.getDay();
    const lastDay = last.getDay();

    let day = firstDay;
    let index = 1;
    while (day !== 1) {
      index--;
      let date = new Date(year, month, index);
      dates = [date, ...dates];
      day = date.getDay();
    }

    index = 1;
    do {
      dates = [...dates, new Date(year, month, index)];
      index++;
    } while (index <= lastDate);

    index = 0;
    day = lastDay;
    while (day !== 0 || dates.length !== 7 * 6) {
      index++;
      let date = new Date(year, month + 1, index);
      dates = [...dates, date];
      day = date.getDay();
    }

    this.dates = chunk(dates, 7);
  }

  dateClick(date: Date) {
    this.model = date;
    this.modelChange.emit(date);
    this.cdr.markForCheck();
  }
}
