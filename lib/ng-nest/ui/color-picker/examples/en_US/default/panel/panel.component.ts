import { Component } from '@angular/core';
import { XColorPickerComponent, XColorPickerOptionDirective } from '@ng-nest/ui/color-picker';

@Component({
  selector: 'ex-panel',
  standalone: true,
  imports: [XColorPickerComponent, XColorPickerOptionDirective],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class ExPanelComponent {}
