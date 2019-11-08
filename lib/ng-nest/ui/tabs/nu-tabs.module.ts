import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuTabsComponent } from "./nu-tabs.component";
import { NuIconModule } from "@ng-nest/ui/icon";
import { NuSliderModule } from "@ng-nest/ui/slider";
import { NuTabComponent } from "./nu-tab.component";
import { NuTabContentComponent } from "./nu-tab-content.component";

@NgModule({
  declarations: [NuTabsComponent, NuTabContentComponent, NuTabComponent],
  exports: [NuTabsComponent, NuTabContentComponent, NuTabComponent],
  imports: [CommonModule, NuSliderModule, NuIconModule]
})
export class NuTabsModule {}
