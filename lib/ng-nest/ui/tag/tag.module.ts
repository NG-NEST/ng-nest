import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XTagComponent } from "./tag.component";
import { XIconModule } from "@ng-nest/ui/icon";
import { XOutletModule } from "@ng-nest/ui/outlet";

@NgModule({
  declarations: [XTagComponent],
  exports: [XTagComponent],
  imports: [CommonModule, XIconModule, XOutletModule]
})
export class XTagModule {}
