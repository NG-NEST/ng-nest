import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XCascadeComponent } from "./cascade.component";
import { XInputModule } from "@ng-nest/ui/input";
import { XPortalModule } from "@ng-nest/ui/portal";
import { XIconModule } from "@ng-nest/ui/icon";

@NgModule({
  declarations: [XCascadeComponent],
  exports: [XCascadeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XPortalModule, XInputModule, XIconModule]
})
export class XCascadeModule {}
