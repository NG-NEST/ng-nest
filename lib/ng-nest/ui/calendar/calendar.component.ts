import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges,
  TemplateRef
} from "@angular/core";
import { XCalendarPrefix } from "./calendar.type";
import { XInputBoolean, XSize, XInputNumber, XIsNumber } from "@ng-nest/ui/core";

@Component({
  selector: `${XCalendarPrefix}`,
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCalendarComponent implements OnInit, OnChanges {
  @ViewChild("calendar", { static: true }) calendar: ElementRef;
  now: Date = new Date();
  datetime: Date = new Date();
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(simple: SimpleChanges) {}

  action(next: number) {
    let datetime = new Date(this.datetime.getTime());
    datetime.setMonth(datetime.getMonth() + next);
    this.datetime = datetime;
    this.cdr.markForCheck();
  }

  dateChange(date: Date) {
    console.log(date);
  }
}
