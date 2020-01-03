import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XUploadComponent } from "./upload.component";
import { FormsModule } from "@angular/forms";
import { XButtonModule } from "@ng-nest/ui/button";
import { XIconModule } from "@ng-nest/ui/icon";

@NgModule({
  declarations: [XUploadComponent],
  exports: [XUploadComponent],
  imports: [CommonModule, FormsModule, XButtonModule, XIconModule]
})
export class XUploadModule {}
