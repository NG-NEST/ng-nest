import { Component, OnInit } from "@angular/core";
import { XListNode } from "@ng-nest/ui/list";
import { XData } from "@ng-nest/ui/core";

@Component({
  selector: "ex-label",
  templateUrl: "./label.component.html",
  styleUrls: ["./label.component.scss"]
})
export class ExLabelComponent implements OnInit {
  model1: number;
  model2: number;
  model3: number;
  model4: number;
  data: XData<XListNode[]> = [
    { key: 1, label: "AAAA" },
    { key: 2, label: "BBBB" },
    { key: 3, label: "CCCC" },
    { key: 4, label: "DDDD" },
    { key: 5, label: "AAAA-1", parentKey: 1 },
    { key: 6, label: "AAAA-2", parentKey: 1 },
    { key: 7, label: "AAAA-3", parentKey: 1 },
    { key: 8, label: "AAAA-4", parentKey: 1 },
    { key: 9, label: "BBBB-1", parentKey: 2 },
    { key: 10, label: "BBBB-2", parentKey: 2 },
    { key: 11, label: "BBBB-3", parentKey: 2 },
    { key: 12, label: "BBBB-4", parentKey: 2 },
    { key: 13, label: "CCCC-1", parentKey: 3 },
    { key: 14, label: "CCCC-2", parentKey: 3 },
    { key: 15, label: "CCCC-3", parentKey: 3 },
    { key: 16, label: "CCCC-4", parentKey: 3 },
    { key: 17, label: "DDDD-1", parentKey: 4 },
    { key: 18, label: "DDDD-2", parentKey: 4 },
    { key: 19, label: "DDDD-3", parentKey: 4 },
    { key: 20, label: "DDDD-4", parentKey: 4 },
    { key: 21, label: "AAAA-1-1", parentKey: 5 },
    { key: 22, label: "AAAA-1-2", parentKey: 5 },
    { key: 23, label: "AAAA-1-3", parentKey: 5 },
    { key: 24, label: "AAAA-1-4", parentKey: 5 },
    { key: 25, label: "AAAA-2-1", parentKey: 6 },
    { key: 26, label: "AAAA-2-2", parentKey: 6 },
    { key: 27, label: "AAAA-2-3", parentKey: 6 },
    { key: 28, label: "AAAA-2-4", parentKey: 6 },
    { key: 29, label: "AAAA-3-1", parentKey: 7 },
    { key: 30, label: "AAAA-3-2", parentKey: 7 },
    { key: 31, label: "AAAA-3-3", parentKey: 7 },
    { key: 32, label: "AAAA-3-4", parentKey: 7 },
    { key: 33, label: "AAAA-4-1", parentKey: 8 },
    { key: 34, label: "AAAA-4-2", parentKey: 8 },
    { key: 35, label: "AAAA-4-3", parentKey: 8 },
    { key: 36, label: "AAAA-4-4", parentKey: 8 }
  ];
  constructor() {}

  ngOnInit() {}
}
