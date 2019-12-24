import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  OnInit,
  Renderer2,
  OnDestroy
} from "@angular/core";
import { XDatePickerPortal } from "./date-picker.type";
import { XIsEmpty, chunk } from "@ng-nest/ui/core";
import { Subscription } from "rxjs";

@Component({
  selector: "x-date-picker-portal",
  templateUrl: "./date-picker-portal.component.html",
  styleUrls: ["./date-picker-portal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDatePickerPortalComponent implements OnInit, OnDestroy {
  weeks = ["一", "二", "三", "四", "五", "六", "日"];
  now = new Date();
  display = new Date();
  selected;
  dates = [];

  valueChange$: Subscription | null = null;
  docClickFunction: Function;

  constructor(
    @Inject(XDatePickerPortal) public option: any,
    public renderer: Renderer2,
    public cdr: ChangeDetectorRef
  ) {
    this.init();
  }

  ngOnInit(): void {
    this.valueChange$ = this.option.valueChange.subscribe(x => {
      this.option.value = x;
      this.init();
      this.cdr.markForCheck();
    });
    this.docClickFunction = this.renderer.listen("document", "click", () => {
      this.option.closePortal();
    });
  }

  ngOnDestroy(): void {
    this.valueChange$ && this.valueChange$.unsubscribe();
    this.docClickFunction && this.docClickFunction();
  }

  init() {
    if (!XIsEmpty(this.option.value)) {
      this.setDefault();
    } else {
      this.selected = "";
    }
    this.setDisplay(this.display);
    this.setDays(this.display);
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setDefault() {
    const date = new Date(this.option.value);
    this.setDisplay(date);
    this.selected = date;
  }

  setDisplay(date: Date) {
    this.display = new Date(date.getFullYear(), date.getMonth(), 1);
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
    if (date.getMonth() !== this.display.getMonth()) {
      this.setDays(date);
    }
    this.setDisplay(date);
    this.selected = date;
    this.option.nodeEmit(date);
    this.cdr.markForCheck();
  }

  nextMonth(num: number) {
    let date = new Date(this.display);
    date.setMonth(date.getMonth() + num);
    this.setDisplay(date);
    this.setDays(this.display);
    this.cdr.markForCheck();
  }

  nextYear(num: number) {
    let date = new Date(this.display);
    date.setFullYear(date.getFullYear() + num);
    this.setDisplay(date);
    this.setDays(this.display);
    this.cdr.markForCheck();
  }
}
