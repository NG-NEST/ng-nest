import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChildren
} from "@angular/core";
import { NmAnchorLinkComponent } from "./anchor-link.component";

@Component({
  selector: "[nm-anchor]",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None
})
export class NmAnchorComponent implements OnInit {
  @ViewChildren(NmAnchorLinkComponent) links: NmAnchorLinkComponent[];
  constructor() {}

  ngOnInit() {
    console.log(this.links);
  }
}
