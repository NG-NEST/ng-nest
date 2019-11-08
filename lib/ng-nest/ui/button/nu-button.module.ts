import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuButtonComponent } from "./nu-button.component";
import { NuIconModule } from "@ng-nest/ui/icon";
import { NuButtonsComponent } from "./nu-buttons.component";

@NgModule({
  declarations: [NuButtonComponent, NuButtonsComponent],
  exports: [NuButtonComponent, NuButtonsComponent],
  imports: [CommonModule, NuIconModule]
})
export class NuButtonModule {}
