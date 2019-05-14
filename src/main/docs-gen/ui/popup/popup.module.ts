import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsPopupComponent } from "./popup.component";
import { NsPopupRoutesModule } from "./popup-routes.module";

@NgModule({
  imports: [CommonModule, NsPopupRoutesModule],
  declarations: [NsPopupComponent],
  exports: [NsPopupComponent]
})
export class NsPopupModule {}
