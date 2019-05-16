import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsUiComponent } from "./ui.component";
import { NsUiRoutesModule } from "./ui-routes.module";

@NgModule({
  imports: [CommonModule, NsUiRoutesModule],
  declarations: [NsUiComponent],
  exports: [NsUiComponent]
})
export class NsUiModule {}
