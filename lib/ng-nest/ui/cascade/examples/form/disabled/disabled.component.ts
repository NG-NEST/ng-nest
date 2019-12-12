import { Component, OnInit } from "@angular/core";
import { XCascadeNode } from "@ng-nest/ui/cascade";
import { XData } from "@ng-nest/ui/core";

@Component({
  selector: "ex-disabled",
  templateUrl: "./disabled.component.html",
  styleUrls: ["./disabled.component.scss"]
})
export class ExDisabledComponent implements OnInit {
  model = 22;
  data: XData<XCascadeNode[]> = [
    { value: 1, label: "AAAA" },
    { value: 2, label: "BBBB" },
    { value: 3, label: "CCCC" },
    { value: 4, label: "DDDD" },
    { value: 5, label: "AAAA-1", parentValue: 1 },
    { value: 6, label: "AAAA-2", parentValue: 1 },
    { value: 7, label: "AAAA-3", parentValue: 1 },
    { value: 8, label: "AAAA-4", parentValue: 1 },
    { value: 9, label: "BBBB-1", parentValue: 2 },
    { value: 10, label: "BBBB-2", parentValue: 2 },
    { value: 11, label: "BBBB-3", parentValue: 2 },
    { value: 12, label: "BBBB-4", parentValue: 2 },
    { value: 13, label: "CCCC-1", parentValue: 3 },
    { value: 14, label: "CCCC-2", parentValue: 3 },
    { value: 15, label: "CCCC-3", parentValue: 3 },
    { value: 16, label: "CCCC-4", parentValue: 3 },
    { value: 17, label: "DDDD-1", parentValue: 4 },
    { value: 18, label: "DDDD-2", parentValue: 4 },
    { value: 19, label: "DDDD-3", parentValue: 4 },
    { value: 20, label: "DDDD-4", parentValue: 4 },
    { value: 21, label: "AAAA-1-1", parentValue: 5 },
    { value: 22, label: "AAAA-1-2", parentValue: 5 },
    { value: 23, label: "AAAA-1-3", parentValue: 5 },
    { value: 24, label: "AAAA-1-4", parentValue: 5 },
    { value: 25, label: "AAAA-2-1", parentValue: 6 },
    { value: 26, label: "AAAA-2-2", parentValue: 6 },
    { value: 27, label: "AAAA-2-3", parentValue: 6 },
    { value: 28, label: "AAAA-2-4", parentValue: 6 },
    { value: 29, label: "AAAA-3-1", parentValue: 7 },
    { value: 30, label: "AAAA-3-2", parentValue: 7 },
    { value: 31, label: "AAAA-3-3", parentValue: 7 },
    { value: 32, label: "AAAA-3-4", parentValue: 7 },
    { value: 33, label: "AAAA-4-1", parentValue: 8 },
    { value: 34, label: "AAAA-4-2", parentValue: 8 },
    { value: 35, label: "AAAA-4-3", parentValue: 8 },
    { value: 36, label: "AAAA-4-4", parentValue: 8 }
  ];
  constructor() {}

  ngOnInit() {}
}
