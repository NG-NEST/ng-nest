import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmTableComponent } from "./nm-table.component";
import { NmButtonModule } from "ng-moon/button";

@NgModule({
  declarations: [NmTableComponent],
  exports: [NmTableComponent],
  imports: [CommonModule, NmButtonModule]
})
export class NmTableModule {}
