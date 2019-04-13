import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GuideRoutesModule } from "./guide-routes.module";
import { GuideComponent } from "./guide.component";

@NgModule({
  imports: [CommonModule, GuideRoutesModule],
  declarations: [GuideComponent],
  exports: [GuideComponent]
})
export class GuideModule {}
