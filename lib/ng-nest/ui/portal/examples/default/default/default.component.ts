import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  ViewChild
} from "@angular/core";
import { NuPortalService } from "@ng-nest/ui/portal";
import { Overlay } from "@angular/cdk/overlay";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent {
  @ViewChild("temp", { static: false }) temp: TemplateRef<any>;
  constructor(
    private portal: NuPortalService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}
  showPortal() {
    this.portal.create({
      nuContent: this.temp,
      nuViewContainerRef: this.viewContainerRef,
      nuContext: { text: "名字" },
      nuOverlayConfig: {
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically()
      }
    });
  }
}
