import { Directive, HostListener, inject, input } from '@angular/core';
import { XColorPickerComponent } from './color-picker.component';
import { XColorPickerColorMap } from './color-map.data';

@Directive({
  selector: `[x-color-picker-option], x-color-picker-option`
})
export class XColorPickerOptionDirective {
  color = input.required<string>({ alias: 'x-color-picker-option' });

  @HostListener('click') onSelectClick() {
    if (!this.colorPicker) return;
    this.colorPicker.value.set(XColorPickerColorMap[this.color()] || this.color());
    if (this.colorPicker.onChange) this.colorPicker.onChange(this.colorPicker.value());
  }
  colorPicker = inject(XColorPickerComponent, { optional: true });
}
