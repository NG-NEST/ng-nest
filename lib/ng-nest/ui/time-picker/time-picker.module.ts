import { NgModule } from '@angular/core';
import { XTimePickerComponent } from './time-picker.component';
import { XTimePickerFrameComponent } from './time-picker-frame.component';

@NgModule({
  exports: [XTimePickerComponent, XTimePickerFrameComponent],
  imports: [XTimePickerComponent, XTimePickerFrameComponent]
})
export class XTimePickerModule {}
