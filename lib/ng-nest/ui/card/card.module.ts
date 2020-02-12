import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XCardComponent } from "./card.component";
import { FormsModule } from "@angular/forms";
import { XIconModule } from "@ng-nest/ui/icon";

@NgModule({
  declarations: [XCardComponent],
  exports: [XCardComponent],
  imports: [CommonModule, FormsModule, XIconModule]
})
export class XCardModule {}
