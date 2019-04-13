import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UiComponent } from "./ui.component";
import { UiRoutesModule } from "./ui-routes.module";

@NgModule({
  imports: [CommonModule, UiRoutesModule],
  declarations: [UiComponent],
  exports: [UiComponent]
})
export class UiModule {}
