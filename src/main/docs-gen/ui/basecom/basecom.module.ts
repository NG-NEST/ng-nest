import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsBasecomComponent } from "./basecom.component";
import { NsBasecomRoutesModule } from "./basecom-routes.module";

@NgModule({
  imports: [CommonModule, NsBasecomRoutesModule],
  declarations: [NsBasecomComponent],
  exports: [NsBasecomComponent]
})
export class NsBasecomModule {}
