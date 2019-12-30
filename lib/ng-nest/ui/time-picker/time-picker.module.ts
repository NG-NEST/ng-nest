import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XInputModule } from "@ng-nest/ui/input";
import { XPortalModule } from "@ng-nest/ui/portal";
import { XIconModule } from "@ng-nest/ui/icon";
import { XButtonModule } from "@ng-nest/ui/button";
import { XListModule } from "@ng-nest/ui/list";
import { XTimePickerComponent } from "./time-picker.component";
import { XTimePickerPortalComponent } from "./time-picker-portal.component";

@NgModule({
  declarations: [XTimePickerComponent, XTimePickerPortalComponent],
  exports: [XTimePickerComponent, XTimePickerPortalComponent],
  entryComponents: [XTimePickerPortalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XPortalModule,
    XInputModule,
    XListModule,
    XButtonModule,
    XIconModule
  ]
})
export class XTimePickerModule {}
