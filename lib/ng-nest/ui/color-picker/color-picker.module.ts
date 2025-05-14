import { NgModule } from '@angular/core';
import { XColorPickerComponent } from './color-picker.component';
import { XColorPickerOptionDirective } from './color-picker.directive';

@NgModule({
  imports: [XColorPickerComponent, XColorPickerOptionDirective],
  exports: [XColorPickerComponent, XColorPickerOptionDirective]
})
export class XColorPickerModule {}
