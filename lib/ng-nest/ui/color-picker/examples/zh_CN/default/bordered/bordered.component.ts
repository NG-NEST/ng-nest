import { Component } from '@angular/core';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';

@Component({
  selector: 'ex-bordered',
  imports: [XColorPickerComponent],
  templateUrl: './bordered.component.html',
  styleUrls: ['./bordered.component.scss']
})
export class ExBorderedComponent {}
