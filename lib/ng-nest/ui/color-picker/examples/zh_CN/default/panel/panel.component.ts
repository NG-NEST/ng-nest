import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XColorPickerComponent, XColorPickerOptionDirective } from '@ng-nest/ui/color-picker';

@Component({
  selector: 'ex-panel',
  imports: [FormsModule, XColorPickerComponent, XColorPickerOptionDirective],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class ExPanelComponent {
  color = signal('');
  colorChange($event: string) {
    console.log($event, this.color());
  }
}
