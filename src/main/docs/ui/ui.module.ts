import { ShareModule } from 'src/share/share.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsUiComponent } from "./ui.component";
import { NsUiRoutesModule } from "./ui-routes.module";

@NgModule({
  imports: [CommonModule, ShareModule, NsUiRoutesModule],
  declarations: [NsUiComponent],
  exports: [NsUiComponent]
})
export class NsUiModule {}
