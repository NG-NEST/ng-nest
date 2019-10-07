import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmInnerComponent } from "./nm-inner.component";

@NgModule({
  declarations: [NmInnerComponent],
  exports: [NmInnerComponent],
  imports: [CommonModule]
})
export class NmInnerModule {}
