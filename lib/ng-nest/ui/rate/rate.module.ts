import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XRateComponent } from "./rate.component";
import { FormsModule } from "@angular/forms";
import { XButtonModule } from "@ng-nest/ui/button";

@NgModule({
  declarations: [XRateComponent],
  exports: [XRateComponent],
  imports: [CommonModule, FormsModule, XButtonModule]
})
export class XRateModule {}
