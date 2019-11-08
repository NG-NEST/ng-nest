import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuRowComponent } from "./nu-row.component";
import { NuColComponent } from "./nu-col.component";

@NgModule({
  declarations: [NuRowComponent, NuColComponent],
  exports: [NuRowComponent, NuColComponent],
  imports: [CommonModule]
})
export class NuGridModule {}
