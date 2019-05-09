import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmTabsComponent } from "./nm-tabs.component";
import { NmIconModule } from "../icon";
import { NmSliderModule } from "../slider";

@NgModule({
  declarations: [NmTabsComponent],
  exports: [NmTabsComponent],
  imports: [CommonModule, NmSliderModule, NmIconModule]
})
export class NmTabsModule {}
