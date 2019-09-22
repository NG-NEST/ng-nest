import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmRowComponent } from "./nm-row.component";
import { NmColComponent } from "./nm-col.component";

@NgModule({
  declarations: [NmRowComponent, NmColComponent],
  exports: [NmRowComponent, NmColComponent],
  imports: [CommonModule]
})
export class NmGridModule {}
