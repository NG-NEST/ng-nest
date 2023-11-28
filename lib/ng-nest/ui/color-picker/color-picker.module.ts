import { NgModule } from '@angular/core';
import { XColorPickerComponent } from './color-picker.component';
import { XColorPickerPortalComponent } from './color-picker-portal.component';

@NgModule({
  imports: [XColorPickerComponent, XColorPickerPortalComponent],
  exports: [XColorPickerComponent, XColorPickerPortalComponent]
})
export class XColorPickerModule {}
