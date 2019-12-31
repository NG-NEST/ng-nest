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
import { XDatePickerPortal, XDatePickerType } from "./date-picker.type";
import { XIsEmpty } from "@ng-nest/ui/core";
import { Subscription } from "rxjs";

@Component({
  selector: "x-date-picker-portal",
  templateUrl: "./date-picker-portal.component.html",
  styleUrls: ["./date-picker-portal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDatePickerPortalComponent implements OnInit, OnDestroy {
  type: XDatePickerType = "date";
  display = new Date();
  model;
  startYear: number;

  private _type: XDatePickerType;

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
    setTimeout(
      () =>
        (this.docClickFunction = this.renderer.listen("document", "click", () => {
          this.option.closePortal();
        }))
    );
  }

  ngOnDestroy(): void {
    this.valueChange$ && this.valueChange$.unsubscribe();
    this.docClickFunction && this.docClickFunction();
  }

  init() {
    if (!XIsEmpty(this.option.value)) {
      this.setDefault();
    } else {
      this.model = "";
    }
    this.type = this.option.type;
    this._type = this.option.type;
    this.setDisplay(this.display);
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setDefault() {
    const date = new Date(this.option.value);
    this.setDisplay(date);
    this.model = date;
  }

  setDisplay(date: Date) {
    this.display = new Date(date.getFullYear(), date.getMonth(), 1);
  }

  dateChange(date: Date) {
    this.setDisplay(date);
    this.model = date;
    this.option.nodeEmit(date);
    this.cdr.markForCheck();
  }

  monthChange(date: Date) {
    this.setDisplay(date);
    if (this._type === "month") {
      this.model = date;
      this.option.nodeEmit(date);
    } else {
      this.type = "date";
    }
    this.cdr.markForCheck();
  }

  yearChange(date: Date) {
    this.setDisplay(date);
    if (this._type === "year") {
      this.model = date;
      this.option.nodeEmit(date);
    } else {
      this.type = "month";
    }
    this.cdr.markForCheck();
  }

  yearStartChange(number: number) {
    this.startYear = number;
    this.cdr.detectChanges();
  }

  nextMonth(num: number) {
    let date = new Date(this.display);
    date.setMonth(date.getMonth() + num);
    this.setDisplay(date);
    this.cdr.markForCheck();
  }

  nextYear(num: number) {
    let date = new Date(this.display);
    date.setFullYear(date.getFullYear() + num);
    this.setDisplay(date);
    this.cdr.markForCheck();
  }

  nextYears(num: number) {
    this.startYear += num;
    let date = new Date(this.display);
    date.setFullYear(this.startYear);
    this.setDisplay(date);
    this.cdr.markForCheck();
  }
}
