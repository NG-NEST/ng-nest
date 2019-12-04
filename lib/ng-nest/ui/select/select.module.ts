import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XSelectComponent } from "./select.component";
import { XInputModule } from "@ng-nest/ui/input";
import { XPortalModule } from "@ng-nest/ui/portal";

@NgModule({
  declarations: [XSelectComponent],
  exports: [XSelectComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XPortalModule, XInputModule]
})
export class XSelectModule {}
