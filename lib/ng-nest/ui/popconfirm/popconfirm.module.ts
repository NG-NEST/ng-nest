import { NgModule } from "@angular/core";
import { XPopconfirmComponent } from "./popconfirm.component";
import { XPopoverModule } from "@ng-nest/ui/popover";
import { XButtonModule } from "@ng-nest/ui/button";
import { XIconModule } from "@ng-nest/ui/icon";
import { XOutletModule } from "@ng-nest/ui/outlet";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [XPopconfirmComponent],
  exports: [XPopconfirmComponent],
  imports: [CommonModule, XPopoverModule, XButtonModule, XIconModule, XOutletModule]
})
export class XPopconfirmModule {}
