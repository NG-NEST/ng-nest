import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmGridComponent } from "./nm-grid.component";
import { NmRowComponent } from "./nm-row.component";
import { NmColComponent } from "./nm-col.component";

@NgModule({
  declarations: [NmGridComponent, NmRowComponent, NmColComponent],
  exports: [NmGridComponent, NmRowComponent, NmColComponent],
  imports: [CommonModule]
})
export class NmGridModule {}
