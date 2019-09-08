import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-ant-design",
  templateUrl: "./ant-design.component.html",
  styleUrls: ["./ant-design.component.scss"]
})
export class ExAntDesignComponent implements OnInit {
  tabs = [
    {
      type: "ado",
      name: "Outlined",
      icons: [
        "up-circle",
        "down-circle",
        "left-circle",
        "right-circle",
        "play-circle",
        "up-square",
        "down-square",
        "left-square",
        "right-square"
      ]
    },
    {
      type: "adf",
      name: "Filled",
      icons: [
        "up-circle",
        "down-circle",
        "left-circle",
        "right-circle",
        "play-circle",
        "up-square",
        "down-square",
        "left-square",
        "right-square"
      ]
    },
    {
      type: "adt",
      name: "TwoTone",
      icons: [
        "up-circle",
        "down-circle",
        "left-circle",
        "right-circle",
        "play-circle",
        "up-square",
        "down-square",
        "left-square",
        "right-square"
      ]
    }
  ];
  constructor() {}

  ngOnInit() {}
}
