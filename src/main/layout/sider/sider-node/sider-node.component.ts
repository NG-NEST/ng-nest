import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { LayoutService } from "../../layout.service";
import * as _ from "lodash";

@Component({
  selector: "[ns-sider-node]",
  templateUrl: "./sider-node.component.html",
  inputs: ["option", "level"],
  encapsulation: ViewEncapsulation.None
})
export class SiderNodeComponent implements OnInit {
  option: any = {};
  level: number;

  child = [];

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.level = this.level + 1;
    this.child = this.layoutService.menus.filter(
      x => x.parentId === this.option.id
    );
  }

  toggle(event: Event, option) {
    event.stopPropagation();
    if (this.child.length > 0) option.childrenShow = !option.childrenShow;
  }

  sider() {}
}
