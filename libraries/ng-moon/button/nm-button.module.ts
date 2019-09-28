import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmButtonComponent } from "./nm-button.component";
import { NmIconModule } from "ng-moon/icon";

@NgModule({
  declarations: [NmButtonComponent],
  exports: [NmButtonComponent],
  imports: [CommonModule, NmIconModule]
})
export class NmButtonModule {}
