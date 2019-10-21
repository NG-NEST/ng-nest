import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmPaginationComponent } from "./nm-pagination.component";
import { NmButtonModule } from "ng-moon/button";

@NgModule({
  declarations: [NmPaginationComponent],
  exports: [NmPaginationComponent],
  imports: [CommonModule, NmButtonModule]
})
export class NmPaginationModule {}
