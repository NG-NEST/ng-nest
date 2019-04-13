import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "[nm-anchor-link]",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None
})
export class NmAnchorLinkComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
