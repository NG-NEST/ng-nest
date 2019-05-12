import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsUiComponent } from "./ui.component";
import { NsUiRoutesModule } from "./ui-routes.module";
{{ __imports }}
@NgModule({
  imports: [CommonModule, NsUiRoutesModule{{ __custom }}],
  declarations: [NsUiComponent],
  exports: [NsUiComponent]
})
export class NsUiModule {}
