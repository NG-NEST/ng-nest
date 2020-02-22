import { Component, OnInit } from "@angular/core";
import { XAddSeconds, XAddMinutes, XAddHours, XAddDays, XAddMonths, XAddYears } from "@ng-nest/ui/core";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent implements OnInit {
  format = "yyyy-MM-dd HH:mm:ss";
  date = new Date();
  dateSeconds = XAddSeconds(this.date, -5);
  dateMinutes  = XAddMinutes(this.date, -5);
  dateHours = XAddHours(this.date, -5);
  dateDays = XAddDays(this.date, -5);
  dateMonths = XAddMonths(this.date, -5);
  dateYears = XAddYears(this.date, -5);
  constructor() {}

  ngOnInit() {}
}
