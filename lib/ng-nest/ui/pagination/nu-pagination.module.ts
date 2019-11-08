import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuPaginationComponent } from "./nu-pagination.component";
import { NuButtonModule } from "@ng-nest/ui/button";

@NgModule({
  declarations: [NuPaginationComponent],
  exports: [NuPaginationComponent],
  imports: [CommonModule, NuButtonModule]
})
export class NuPaginationModule {}
