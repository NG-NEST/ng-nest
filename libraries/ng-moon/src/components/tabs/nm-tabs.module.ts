import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmTabsComponent } from "./nm-tabs.component";
import { NmIconModule } from "../icon/nm-icon.module";
import { NmSliderModule } from "../slider/nm-slider.module";
import { NmTabComponent } from "./nm-tab.component";
import { NmTabContentComponent } from "./nm-tab-content.component";

@NgModule({
  declarations: [NmTabsComponent, NmTabContentComponent, NmTabComponent],
  exports: [NmTabsComponent, NmTabContentComponent, NmTabComponent],
  imports: [CommonModule, NmSliderModule, NmIconModule]
})
export class NmTabsModule {}
