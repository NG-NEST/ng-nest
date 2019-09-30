import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmButtonComponent } from "./nm-button.component";
import { NmIconModule } from "ng-moon/icon";
import { NmButtonsComponent } from "./nm-buttons.component";

@NgModule({
  declarations: [NmButtonComponent, NmButtonsComponent],
  exports: [NmButtonComponent, NmButtonsComponent],
  imports: [CommonModule, NmIconModule]
})
export class NmButtonModule {}
