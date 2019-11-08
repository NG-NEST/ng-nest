import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuCrumbComponent } from "./nu-crumb.component";

@NgModule({
  declarations: [NuCrumbComponent],
  exports: [NuCrumbComponent],
  imports: [CommonModule]
})
export class NuCrumbModule {}
