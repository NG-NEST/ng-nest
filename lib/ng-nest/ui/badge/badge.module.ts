import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XBadgeComponent } from "./badge.component";
import { FormsModule } from "@angular/forms";
import { XIconModule } from "@ng-nest/ui/icon";

@NgModule({
  declarations: [XBadgeComponent],
  exports: [XBadgeComponent],
  imports: [CommonModule, FormsModule, XIconModule]
})
export class XBadgeModule {}
