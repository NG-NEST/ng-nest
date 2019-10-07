import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmCrumbComponent } from "./nm-crumb.component";

@NgModule({
  declarations: [NmCrumbComponent],
  exports: [NmCrumbComponent],
  imports: [CommonModule]
})
export class NmCrumbModule {}
