import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  ViewChild
} from "@angular/core";
import { NmPortalService } from "ng-moon/portal";
import { Overlay } from "@angular/cdk/overlay";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent {
  @ViewChild("temp", { static: false }) temp: TemplateRef<any>;
  constructor(
    private portal: NmPortalService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}
  showPortal() {
    this.portal.create({
      nmContent: this.temp,
      nmViewContainerRef: this.viewContainerRef,
      nmContext: { text: "名字" },
      nmOverlayConfig: {
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically()
      }
    });
  }
}
