import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XColorPickerComponent } from './color-picker.component';
import { XColorPickerPortalComponent } from './color-picker-portal.component';
import { XInputModule } from '@ng-nest/ui/input';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XSliderSelectModule } from '@ng-nest/ui/slider-select';
import { XTabsModule } from '@ng-nest/ui/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [XColorPickerComponent, XColorPickerPortalComponent],
  exports: [XColorPickerComponent, XColorPickerPortalComponent],
  entryComponents: [XColorPickerPortalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    XPortalModule,
    XSliderSelectModule,
    XTabsModule,
    XInputModule
  ]
})
export class XColorPickerModule {}
