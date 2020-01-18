import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XLinkComponent } from "./link.component";
import { FormsModule } from "@angular/forms";
import { XIconModule } from "@ng-nest/ui/icon";

@NgModule({
  declarations: [XLinkComponent],
  exports: [XLinkComponent],
  imports: [CommonModule, FormsModule, XIconModule]
})
export class XLinkModule {}
