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
  TemplateRef,
  Output,
  EventEmitter
} from "@angular/core";
import { XCalendarPrefix, XCalendarNode, XCalendarData } from "./calendar.type";
import { XInputBoolean, XSize, XInputNumber, XIsNumber, XDataConvert, XData } from "@ng-nest/ui/core";
import { DatePipe } from "@angular/common";

@Component({
  selector: `${XCalendarPrefix}`,
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class XCalendarComponent implements OnInit, OnChanges {
  @Input() data?: XCalendarData;
  @Output() dateChange = new EventEmitter();
  @ViewChild("calendar", { static: true }) calendar: ElementRef;
  now: Date = new Date();
  datetime: Date = new Date();
  activatedDate: Date = new Date();
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public datePipe: DatePipe
  ) {}

  ngOnInit() {}

  ngOnChanges(simple: SimpleChanges) {}

  action(next: number) {
    let datetime = new Date(this.datetime.getTime());
    datetime.setMonth(datetime.getMonth() + next);
    this.datetime = datetime;
    this.cdr.markForCheck();
  }

  dateOnChange(date: Date) {
    if (this.datePipe.transform(date, "yyyyMMdd") !== this.datePipe.transform(this.activatedDate, "yyyyMMdd")) {
      this.activatedDate = date;
      this.dateChange.emit(this.activatedDate);
      this.cdr.markForCheck();
    }
  }
}
