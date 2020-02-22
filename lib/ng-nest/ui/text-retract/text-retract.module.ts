import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XTextRetractComponent } from "./text-retract.component";
import { FormsModule } from "@angular/forms";
import { XLinkModule } from "@ng-nest/ui/link";

@NgModule({
  declarations: [XTextRetractComponent],
  exports: [XTextRetractComponent],
  imports: [CommonModule, FormsModule, XLinkModule]
})
export class XTextRetractModule {}
