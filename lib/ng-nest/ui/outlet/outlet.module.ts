import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XOutletDirective } from "./outlet.directive";

@NgModule({
  declarations: [XOutletDirective],
  exports: [XOutletDirective],
  imports: [CommonModule]
})
export class XOutletModule {}
