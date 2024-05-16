import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSwitchComponent } from '@ng-nest/ui/switch';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [FormsModule, XSwitchComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  model = signal(true);
}
