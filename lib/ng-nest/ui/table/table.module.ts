import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XTableComponent } from "./table.component";
import { XButtonModule } from "@ng-nest/ui/button";
import { XPaginationModule } from "@ng-nest/ui/pagination";
import { XInputModule } from "@ng-nest/ui/input";

@NgModule({
  declarations: [XTableComponent],
  exports: [XTableComponent],
  imports: [CommonModule, XInputModule, XButtonModule, XPaginationModule]
})
export class XTableModule {}
