import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuDocComponent } from "./nu-doc.component";

@NgModule({
  declarations: [NuDocComponent],
  exports: [NuDocComponent],
  imports: [CommonModule]
})
export class NuDocModule {}
