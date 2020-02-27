import { Component, OnInit } from "@angular/core";
import { XAddDays } from "@ng-nest/ui/core";

@Component({
  selector: "ex-down",
  templateUrl: "./down.component.html",
  styleUrls: ["./down.component.scss"]
})
export class ExDownComponent implements OnInit {
  deadline = XAddDays(new Date(), 2).getTime();
  constructor() {}

  ngOnInit() {}
}
