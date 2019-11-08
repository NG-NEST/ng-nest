import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuTableComponent } from "./nu-table.component";
import { NuButtonModule } from "@ng-nest/ui/button";
import { NuPaginationModule } from "@ng-nest/ui/pagination";
import { NuInputModule } from "@ng-nest/ui/input";

@NgModule({
  declarations: [NuTableComponent],
  exports: [NuTableComponent],
  imports: [CommonModule, NuInputModule, NuButtonModule, NuPaginationModule]
})
export class NuTableModule {}
