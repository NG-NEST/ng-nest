import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmTableComponent } from "./nm-table.component";
import { NmButtonModule } from "ng-moon/button";
import { NmPaginationModule } from "ng-moon/pagination";

@NgModule({
  declarations: [NmTableComponent],
  exports: [NmTableComponent],
  imports: [CommonModule, NmButtonModule, NmPaginationModule]
})
export class NmTableModule {}
