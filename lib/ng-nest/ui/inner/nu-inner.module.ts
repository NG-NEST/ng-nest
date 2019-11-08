import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuInnerComponent } from "./nu-inner.component";

@NgModule({
  declarations: [NuInnerComponent],
  exports: [NuInnerComponent],
  imports: [CommonModule]
})
export class NuInnerModule {}
