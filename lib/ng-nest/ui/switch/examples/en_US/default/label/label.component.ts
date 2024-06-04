import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSwitchComponent } from '@ng-nest/ui/switch';

@Component({
  selector: 'ex-label',
  standalone: true,
  imports: [FormsModule, XSwitchComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent {
  model = signal(false);
}
