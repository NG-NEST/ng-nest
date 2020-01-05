import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XColorPickerComponent } from "./color-picker.component";
import { XColorPickerPortalComponent } from "./color-picker-portal.component";
import { XInputModule } from "@ng-nest/ui/input";
import { XButtonModule } from "@ng-nest/ui/button";
import { XPortalModule } from "@ng-nest/ui/portal";
import { XIconModule } from "@ng-nest/ui/icon";
import { XListModule } from "@ng-nest/ui/list";
import { XSliderSelectModule } from "@ng-nest/ui/slider-select";

@NgModule({
  declarations: [XColorPickerComponent, XColorPickerPortalComponent],
  exports: [XColorPickerComponent, XColorPickerPortalComponent],
  entryComponents: [XColorPickerPortalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XPortalModule,
    XButtonModule,
    XSliderSelectModule,
    XInputModule,
    XIconModule,
    XListModule
  ]
})
export class XColorPickerModule {}
